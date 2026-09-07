"""Sarvam TTS that follows whichever language the visitor is speaking.

The stock plugin is constructed with one `target_language_code`, so a Gujarati
agent reads Hindi and English replies with Gujarati phonetics. This wrapper
inspects each utterance and retargets the underlying TTS before synthesis, so
the same session can answer in Gujarati, Hindi or English natively.

Sarvam has no English voice as such — en-IN is Indian-accented English, which is
what we want here anyway: Meera should sound like the same person throughout,
not switch to a British newsreader mid-conversation.
"""

from __future__ import annotations

import logging

from livekit.agents import tts
from livekit.agents.types import DEFAULT_API_CONNECT_OPTIONS
from livekit.plugins import sarvam

from translit import detect_language

logger = logging.getLogger("campaignx-gujarati.sarvam")

# Our internal language codes -> Sarvam's target_language_code values.
_LANG_MAP = {
    "gu": "gu-IN",
    "hi": "hi-IN",
    "en": "en-IN",
}


class MultilingualSarvamTTS(tts.TTS):
    """Delegates to a Sarvam TTS, retargeting its language per utterance."""

    def __init__(
        self,
        *,
        speaker: str = "priya",
        model: str = "bulbul:v3",
        pace: float = 0.97,
        temperature: float = 0.85,
        default_language: str = "gu-IN",
    ) -> None:
        self._inner = sarvam.TTS(
            target_language_code=default_language,
            model=model,
            speaker=speaker,
            pace=pace,
            temperature=temperature,
        )
        super().__init__(
            capabilities=self._inner.capabilities,
            sample_rate=self._inner.sample_rate,
            num_channels=self._inner.num_channels,
        )
        self._current = default_language

    def _retarget(self, text: str) -> None:
        lang = _LANG_MAP.get(detect_language(text), "gu-IN")
        if lang != self._current:
            logger.info("TTS language switch: %s -> %s", self._current, lang)
            self._inner.update_options(target_language_code=lang)
            self._current = lang

    def synthesize(
        self, text: str, *, conn_options=DEFAULT_API_CONNECT_OPTIONS
    ) -> tts.ChunkedStream:
        self._retarget(text)
        return self._inner.synthesize(text, conn_options=conn_options)

    def stream(self, *, conn_options=DEFAULT_API_CONNECT_OPTIONS) -> tts.SynthesizeStream:
        # Streaming sends text incrementally, so the language is picked from the
        # first chunk that carries enough script to identify it.
        return _MultiStream(self, conn_options=conn_options)

    async def aclose(self) -> None:
        await self._inner.aclose()


class _MultiStream(tts.SynthesizeStream):
    def __init__(self, parent: MultilingualSarvamTTS, *, conn_options) -> None:
        super().__init__(tts=parent, conn_options=conn_options)
        self._parent = parent
        self._inner_stream = parent._inner.stream(conn_options=conn_options)
        self._decided = False

    async def _run(self, output_emitter) -> None:  # pragma: no cover - passthrough
        raise NotImplementedError

    def push_text(self, token: str) -> None:
        if not self._decided and detect_language(token) != "en":
            # Only retarget once we see real Indic script; a leading "[laughs]"
            # or an English brand name would otherwise pin the whole reply to en.
            self._parent._retarget(token)
            self._decided = True
        self._inner_stream.push_text(token)

    def flush(self) -> None:
        self._inner_stream.flush()

    def end_input(self) -> None:
        self._inner_stream.end_input()

    async def aclose(self) -> None:
        await self._inner_stream.aclose()

    def __aiter__(self):
        return self._inner_stream.__aiter__()
