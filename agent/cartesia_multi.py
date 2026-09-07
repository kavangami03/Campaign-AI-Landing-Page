"""Cartesia TTS that follows whichever language the visitor is speaking.

The stock plugin is constructed with one `language`, so a Gujarati agent reads
Hindi and English replies with Gujarati phonetics. This wrapper inspects each
utterance and retargets the underlying TTS before synthesis, so one session can
answer in Gujarati, Hindi or English natively.

sonic-3 speaks all three with the same voice, so Meera keeps one identity
throughout instead of switching speaker when the language changes.
"""

from __future__ import annotations

import logging
import os

from livekit.agents import tts
from livekit.agents.types import DEFAULT_API_CONNECT_OPTIONS
from livekit.plugins import cartesia

from translit import detect_language

logger = logging.getLogger("campaignx-gujarati.cartesia")



# Cartesia applies one emotion to a whole utterance, so a fixed "Happy,Curious"
# makes a question land with the same flat cadence as a statement. Detecting
# questions lets us swap in a rising, inquisitive emotion just for those lines.
_QUESTION_WORDS = (
    # Gujarati
    "શું", "કેમ", "કયું", "કયા", "કેવી", "કેવું", "કેટલા", "કેટલું", "ક્યારે",
    "ક્યાં", "કોણ", "કોનું", "ખરું ને", "બરાબર ને", "ને?",
    # Hindi
    "क्या", "क्यों", "कैसे", "कैसा", "कितना", "कितने", "कब", "कहाँ", "कहां",
    "कौन", "किसका", "ना?", "है ना",
    # English
    "what", "why", "how", "when", "where", "who", "which", "do you", "are you",
    "can you", "could you", "would you", "right?", "isn't it",
)


def _is_question(text: str) -> bool:
    stripped = text.strip()
    if stripped.endswith(("?", "？")):
        return True
    low = stripped.lower()
    return any(w in low for w in _QUESTION_WORDS)


class MultilingualCartesiaTTS(tts.TTS):
    """Delegates to a Cartesia TTS, retargeting its language per utterance."""

    def __init__(
        self,
        *,
        voice: str,
        model: str = "sonic-3",
        default_language: str = "gu",
        speed: float | None = None,
        emotion: list[str] | None = None,
        volume: float | None = None,
    ) -> None:
        # word_timestamps is unsupported for Indic languages on sonic-3 and only
        # emits a warning per session; disable it since nothing here uses them.
        kwargs = {
            "voice": voice,
            "model": model,
            "language": default_language,
            "word_timestamps": False,
        }
        # Only pass tuning options that are set: Cartesia validates ranges and
        # rejects nulls, so an unset knob must be absent rather than None.
        if speed is not None:
            kwargs["speed"] = speed
        if emotion:
            kwargs["emotion"] = emotion
        if volume is not None:
            kwargs["volume"] = volume

        self._inner = cartesia.TTS(**kwargs)
        # Statement vs question emotion, swapped per utterance so questions
        # actually rise at the end instead of trailing off like a statement.
        self._statement_emotion = list(emotion or [])
        self._question_emotion = [
            e.strip()
            for e in os.getenv("CARTESIA_QUESTION_EMOTION", "Curious,Anticipation").split(",")
            if e.strip()
        ]
        self._emotion_mode = "statement"
        super().__init__(
            capabilities=self._inner.capabilities,
            sample_rate=self._inner.sample_rate,
            num_channels=self._inner.num_channels,
        )
        self._current = default_language

    def _retarget(self, text: str) -> None:
        lang = detect_language(text)
        if lang != self._current:
            logger.info("TTS language switch: %s -> %s", self._current, lang)
            self._inner.update_options(language=lang)
            self._current = lang

        mode = "question" if _is_question(text) else "statement"
        if mode != self._emotion_mode:
            emotion = (
                self._question_emotion
                if mode == "question"
                else self._statement_emotion
            )
            if emotion:
                self._inner.update_options(emotion=emotion)
                self._emotion_mode = mode

    def synthesize(
        self, text: str, *, conn_options=DEFAULT_API_CONNECT_OPTIONS
    ) -> tts.ChunkedStream:
        self._retarget(text)
        return self._inner.synthesize(text, conn_options=conn_options)

    def stream(self, *, conn_options=DEFAULT_API_CONNECT_OPTIONS) -> tts.SynthesizeStream:
        return _MultiStream(self, conn_options=conn_options)

    async def aclose(self) -> None:
        await self._inner.aclose()


class _MultiStream(tts.SynthesizeStream):
    def __init__(self, parent: MultilingualCartesiaTTS, *, conn_options) -> None:
        super().__init__(tts=parent, conn_options=conn_options)
        self._parent = parent
        self._inner_stream = parent._inner.stream(conn_options=conn_options)
        self._decided = False

    async def _run(self, output_emitter) -> None:  # pragma: no cover - passthrough
        raise NotImplementedError

    def push_text(self, token: str) -> None:
        if not self._decided and detect_language(token) != "en":
            # Wait for real Indic script before retargeting: a leading English
            # brand name would otherwise pin the whole reply to English.
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
