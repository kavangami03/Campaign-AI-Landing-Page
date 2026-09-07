"""ElevenLabs eleven_v3 as a LiveKit TTS engine.

eleven_v3 is the only ElevenLabs model that accepts Gujarati (`language_code=gu`),
but it rejects the realtime WebSocket with 403 — so the stock plugin cannot use
it for live voice. Every streaming-capable model in turn rejects `gu` and ends up
pronouncing Gujarati with an English mouth.

This class fills the gap: it drives v3 over the plain HTTP endpoint, which does
accept Gujarati, and returns a non-streaming TTS. Wrapping it in
`agents.tts.StreamAdapter` (see agent.py) makes it usable in a live session:
the adapter splits the reply into sentences and synthesizes them one at a time,
so audio starts after the first sentence instead of the whole reply.

Tradeoff: slightly higher latency to first audio than a true streaming model, in
exchange for correctly pronounced Gujarati.
"""

from __future__ import annotations

import asyncio
import os

import aiohttp
from livekit.agents import APIConnectionError, APIStatusError, tts, utils
from livekit.agents.types import DEFAULT_API_CONNECT_OPTIONS

API_BASE = "https://api.elevenlabs.io/v1/text-to-speech"

# v3 returns MP3; decoding is handled by AudioEmitter via the mime type.
_MIME = "audio/mp3"
_SAMPLE_RATE = 44100
_NUM_CHANNELS = 1


class ElevenV3TTS(tts.TTS):
    def __init__(
        self,
        *,
        voice_id: str,
        api_key: str | None = None,
        language: str = "gu",
        model: str = "eleven_v3",
        stability: float = 0.32,
        similarity_boost: float = 0.78,
        style: float = 0.55,
        speed: float = 1.0,
        use_speaker_boost: bool = True,
        auto_language: bool = True,
    ) -> None:
        super().__init__(
            # streaming=False makes AgentSession require a StreamAdapter wrapper,
            # which is exactly the behaviour we want.
            capabilities=tts.TTSCapabilities(streaming=False),
            sample_rate=_SAMPLE_RATE,
            num_channels=_NUM_CHANNELS,
        )
        key = api_key or os.getenv("ELEVEN_API_KEY", "")
        if not key:
            raise ValueError("ELEVEN_API_KEY is required for ElevenV3TTS")

        self._api_key = key
        self._voice_id = voice_id
        self._language = language
        # When true, each utterance's language is detected from its script so
        # the agent can answer in whichever language the visitor used.
        self._auto_language = auto_language
        self._model = model
        self._voice_settings = {
            "stability": stability,
            "similarity_boost": similarity_boost,
            "style": style,
            "speed": speed,
            "use_speaker_boost": use_speaker_boost,
        }
        self._session: aiohttp.ClientSession | None = None

    def _ensure_session(self) -> aiohttp.ClientSession:
        if self._session is None:
            self._session = utils.http_context.http_session()
        return self._session

    def synthesize(
        self, text: str, *, conn_options=DEFAULT_API_CONNECT_OPTIONS
    ) -> tts.ChunkedStream:
        return _V3Stream(tts=self, input_text=text, conn_options=conn_options)


class _V3Stream(tts.ChunkedStream):
    def __init__(self, *, tts: ElevenV3TTS, input_text: str, conn_options) -> None:
        super().__init__(tts=tts, input_text=input_text, conn_options=conn_options)
        self._tts: ElevenV3TTS = tts

    async def _run(self, output_emitter: tts.AudioEmitter) -> None:
        request_id = utils.shortuuid()
        # Per-utterance language: the visitor may switch mid-conversation, and
        # sending the wrong language_code makes v3 mispronounce the whole line.
        lang = self._tts._language
        if self._tts._auto_language:
            from translit import detect_language

            lang = detect_language(self._input_text)

        payload = {
            "text": self._input_text,
            "model_id": self._tts._model,
            "language_code": lang,
            "voice_settings": self._tts._voice_settings,
        }

        try:
            session = self._tts._ensure_session()
            async with session.post(
                f"{API_BASE}/{self._tts._voice_id}",
                headers={
                    "xi-api-key": self._tts._api_key,
                    "Content-Type": "application/json",
                },
                json=payload,
                timeout=aiohttp.ClientTimeout(total=self._conn_options.timeout + 25),
            ) as resp:
                if resp.status != 200:
                    body = (await resp.text())[:300]
                    # Surface the two account-level failures explicitly: the raw
                    # 401 body is easy to mistake for a code bug, and the stock
                    # message ("no audio frames were pushed") hides the cause.
                    if "detected_unusual_activity" in body:
                        raise APIStatusError(
                            message=(
                                "ElevenLabs has disabled free-tier access for this "
                                "account (detected_unusual_activity). A new free "
                                "account will hit the same block from this IP - a "
                                "paid plan is required. Switch TTS_PROVIDER to "
                                "cartesia or sarvam to keep the agent talking."
                            ),
                            status_code=resp.status,
                            request_id=request_id,
                            body=body,
                        )
                    if "quota_exceeded" in body:
                        raise APIStatusError(
                            message="ElevenLabs credits exhausted for this account.",
                            status_code=resp.status,
                            request_id=request_id,
                            body=body,
                        )
                    raise APIStatusError(
                        message=f"ElevenLabs v3 error: {body}",
                        status_code=resp.status,
                        request_id=request_id,
                        body=body,
                    )

                output_emitter.initialize(
                    request_id=request_id,
                    sample_rate=self._tts.sample_rate,
                    num_channels=self._tts.num_channels,
                    mime_type=_MIME,
                )
                async for chunk, _ in resp.content.iter_chunks():
                    output_emitter.push(chunk)
                output_emitter.flush()

        except asyncio.TimeoutError as e:
            raise APIConnectionError("ElevenLabs v3 request timed out") from e
        except aiohttp.ClientError as e:
            raise APIConnectionError(f"ElevenLabs v3 connection error: {e}") from e
