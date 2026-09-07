"""Rewrite Latin-script words into Gujarati script just before speech.

Sarah is a British voice. When eleven_v3 meets Latin letters inside a Gujarati
sentence it switches to English pronunciation, so "Instagram" and "campaign"
land in a crisp British accent in the middle of a Gujarati sentence — the exact
code-switch a real Gujarati speaker never makes.

Writing those words in Gujarati script removes the trigger: the model sees only
Gujarati, so every word keeps the same accent. Applied on the TTS path only, so
the on-screen transcript still shows normal English spelling.
"""

from __future__ import annotations

import re

# Hand-tuned spellings for the words this agent actually says. Written the way
# a Gujarati speaker pronounces them, not by strict letter-for-letter mapping —
# "campaign" is કેમ્પેઇન, never કેમ્પેઇગ્ન.
WORD_MAP: dict[str, str] = {
    # Core product vocabulary
    "campaignx": "કેમ્પેઇન એક્સ",
    "campaign": "કેમ્પેઇન",
    "campaigns": "કેમ્પેઇન્સ",
    "marketing": "માર્કેટિંગ",
    "content": "કન્ટેન્ટ",
    "brand": "બ્રાન્ડ",
    "brands": "બ્રાન્ડ્સ",
    "business": "બિઝનેસ",
    "customer": "કસ્ટમર",
    "customers": "કસ્ટમર્સ",
    "client": "ક્લાયન્ટ",
    "clients": "ક્લાયન્ટ્સ",
    "team": "ટીમ",
    "sales": "સેલ્સ",
    "growth": "ગ્રોથ",
    "budget": "બજેટ",
    "price": "પ્રાઇસ",
    "pricing": "પ્રાઇસિંગ",
    "product": "પ્રોડક્ટ",
    "service": "સર્વિસ",
    "demo": "ડેમો",
    "meeting": "મીટિંગ",
    "call": "કોલ",
    "website": "વેબસાઇટ",
    "email": "ઈમેલ",
    "message": "મેસેજ",
    "post": "પોસ્ટ",
    "posts": "પોસ્ટ્સ",
    "reel": "રીલ",
    "reels": "રીલ્સ",
    "story": "સ્ટોરી",
    "stories": "સ્ટોરીઝ",
    "design": "ડિઝાઇન",
    "idea": "આઇડિયા",
    "ideas": "આઇડિયાઝ",
    "tool": "ટૂલ",
    "data": "ડેટા",
    "report": "રિપોર્ટ",
    "offer": "ઓફર",
    "discount": "ડિસ્કાઉન્ટ",
    "order": "ઓર્ડર",
    "shop": "શોપ",
    "store": "સ્ટોર",
    "online": "ઓનલાઇન",
    "app": "એપ",
    "link": "લિંક",
    "profile": "પ્રોફાઇલ",
    "audience": "ઓડિયન્સ",
    "reach": "રીચ",
    "engagement": "એન્ગેજમેન્ટ",
    "followers": "ફોલોઅર્સ",
    "traffic": "ટ્રાફિક",
    "lead": "લીડ",
    "leads": "લીડ્સ",
    # Platforms
    "instagram": "ઇન્સ્ટાગ્રામ",
    "whatsapp": "વોટ્સએપ",
    "facebook": "ફેસબુક",
    "youtube": "યુટ્યુબ",
    "google": "ગૂગલ",
    "linkedin": "લિંક્ડઇન",
    "sms": "એસ એમ એસ",
    "ai": "એ આઈ",
    # Filler and connective English that shows up in Gujlish speech
    "basically": "બેઝિકલી",
    "actually": "એક્ચ્યુઅલી",
    "exactly": "એક્ઝેક્ટલી",
    "obviously": "ઓબ્વિયસલી",
    "definitely": "ડેફિનેટલી",
    "simple": "સિમ્પલ",
    "easy": "ઈઝી",
    "perfect": "પરફેક્ટ",
    "sure": "શ્યોર",
    "problem": "પ્રોબ્લેમ",
    "solution": "સોલ્યુશન",
    "time": "ટાઇમ",
    "free": "ફ્રી",
    "share": "શેર",
    "check": "ચેક",
    "interested": "ઇન્ટરેસ્ટેડ",
    "interesting": "ઇન્ટરેસ્ટિંગ",
    "right": "રાઇટ",
    "okay": "ઓકે",
    "ok": "ઓકે",
    "yes": "યસ",
    "no": "નો",
    "so": "સો",
    "but": "બટ",
    "and": "એન્ડ",
    "automate": "ઓટોમેટ",
    "automatic": "ઓટોમેટિક",
    "personalised": "પર્સનલાઇઝ્ડ",
    "personalized": "પર્સનલાઇઝ્ડ",
    "track": "ટ્રેક",
    "manage": "મેનેજ",
    "create": "ક્રિએટ",
    "start": "સ્ટાર્ટ",
    "help": "હેલ્પ",
    "work": "વર્ક",
    "smart": "સ્માર્ટ",
    "best": "બેસ્ટ",
    "good": "ગુડ",
    "great": "ગ્રેટ",
    "nice": "નાઇસ",
    "thanks": "થેંક્સ",
    "hello": "હેલો",
    "hi": "હાય",
    "bye": "બાય",
    "english": "ઇંગ્લિશ",
    "gujarati": "ગુજરાતી",
    "hindi": "હિન્દી",
    "india": "ઇન્ડિયા",
    "please": "પ્લીઝ",
    "sorry": "સોરી",
    "welcome": "વેલકમ",
    "minute": "મિનિટ",
    "month": "મંથ",
    "week": "વીક",
    "day": "ડે",
    "year": "યર",
    "owner": "ઓનર",
    "owners": "ઓનર્સ",
    "planning": "પ્લાનિંગ",
    "try": "ટ્રાય",
    "tools": "ટૂલ્સ",
    "creative": "ક્રિએટિવ",
    "technology": "ટેક્નોલોજી",
    "tension": "ટેન્શન",
    "amazing": "અમેઝિંગ",
    "excellent": "એક્સેલન્ટ",
    "think": "થિંક",
    "digital": "ડિજિટલ",
    "social": "સોશિયલ",
    "media": "મીડિયા",
    "video": "વિડિયો",
    "photo": "ફોટો",
    "caption": "કેપ્શન",
    "schedule": "શેડ્યુલ",
    "manual": "મેન્યુઅલ",
    "manually": "મેન્યુઅલી",
    "result": "રિઝલ્ટ",
    "results": "રિઝલ્ટ્સ",
    "target": "ટાર્ગેટ",
    "focus": "ફોકસ",
    "quality": "ક્વોલિટી",
    "support": "સપોર્ટ",
    "setup": "સેટઅપ",
    "account": "એકાઉન્ટ",
    "number": "નંબર",
    "name": "નેમ",
    "company": "કંપની",
    "market": "માર્કેટ",
    "strategy": "સ્ટ્રેટેજી",
}

# Letter-by-letter fallback for words not in WORD_MAP, so an unexpected English
# word still gets a Gujarati-accented reading instead of a British one.
_DIGRAPHS = [
    ("tch", "ચ"), ("sch", "સ્ક"), ("shr", "શ્ર"), ("chr", "ક્ર"),
    ("ph", "ફ"), ("th", "થ"), ("ch", "ચ"), ("sh", "શ"), ("wh", "વ"),
    ("ck", "ક"), ("gh", "ગ"), ("kn", "ન"), ("qu", "ક્વ"),
    ("ee", "ી"), ("oo", "ૂ"), ("ai", "ે"), ("ea", "ી"), ("ou", "ાઉ"),
    ("ay", "ે"), ("oy", "ોય"), ("ow", "ાઉ"), ("au", "ો"),
]
_SINGLES = {
    "a": "ા", "b": "બ", "c": "ક", "d": "ડ", "e": "ે", "f": "ફ", "g": "ગ",
    "h": "હ", "i": "િ", "j": "જ", "k": "ક", "l": "લ", "m": "મ", "n": "ન",
    "o": "ો", "p": "પ", "q": "ક", "r": "ર", "s": "સ", "t": "ટ", "u": "ુ",
    "v": "વ", "w": "વ", "x": "ક્સ", "y": "ય", "z": "ઝ",
}

_LATIN_WORD = re.compile(r"[A-Za-z][A-Za-z'’\-]*")
# Audio tags like [laughs] are performance directions - never transliterate them.
_TAG = re.compile(r"\[[^\]]*\]")


def _fallback(word: str) -> str:
    low = word.lower()
    out: list[str] = []
    i = 0
    while i < len(low):
        for src, dst in _DIGRAPHS:
            if low.startswith(src, i):
                out.append(dst)
                i += len(src)
                break
        else:
            out.append(_SINGLES.get(low[i], ""))
            i += 1
    result = "".join(out)
    # Gujarati words cannot start with a dependent vowel sign (matra) - swap the
    # leading sign for its independent vowel letter, else it renders broken.
    LEADING = {"ા": "આ", "િ": "ઇ", "ી": "ઈ", "ુ": "ઉ", "ૂ": "ઊ",
               "ે": "એ", "ૈ": "ઐ", "ો": "ઓ", "ૌ": "ઔ"}
    if result and result[0] in LEADING:
        result = LEADING[result[0]] + result[1:]
    return result or word


def to_gujarati_speech(text: str) -> str:
    """Rewrite Latin words as Gujarati script, preserving [audio tags]."""
    parts: list[str] = []
    last = 0

    for tag in _TAG.finditer(text):
        parts.append(_convert_span(text[last : tag.start()]))
        parts.append(tag.group(0))  # tags pass through untouched
        last = tag.end()
    parts.append(_convert_span(text[last:]))
    return "".join(parts)


def _convert_span(span: str) -> str:
    def repl(m: re.Match[str]) -> str:
        word = m.group(0)
        mapped = WORD_MAP.get(word.lower().strip("'’-"))
        if mapped:
            return mapped
        # Acronyms (CEO, USA) read better spelled out letter by letter.
        if word.isupper() and len(word) <= 4:
            return " ".join(_SINGLES.get(c.lower(), c) for c in word)
        return _fallback(word)

    return _LATIN_WORD.sub(repl, span)

# ── Language detection ────────────────────────────────────────────────────────
# Which script a reply is written in tells us the language, which decides both
# the TTS language_code and whether transliteration should run at all.

_GUJARATI = re.compile(r"[઀-૿]")
_DEVANAGARI = re.compile(r"[ऀ-ॿ]")


# Function words that are decisive even when the scripts are mixed: Gemini may
# stray into another script mid-sentence, but these give the intended language.
_HINDI_MARKERS = ("है", "हैं", "हूँ", "हूं", "क्या", "आप", "मैं", "नहीं",
                  "करते", "करता", "करती", "कैसे", "और", "को", "के", "में")
_GUJ_MARKERS = ("છે", "છો", "છું", "શું", "તમે", "હું", "નથી", "કરો",
                "કેમ", "અને", "ને", "માં", "કરે", "થાય")


def detect_language(text: str) -> str:
    """Return 'gu', 'hi' or 'en' for a reply.

    Character counts alone misfire when a Hindi sentence carries a few stray
    Gujarati letters (or vice versa), so decisive function words win first and
    the raw counts are only a fallback.
    """
    gu_words = sum(w in text for w in _GUJ_MARKERS)
    hi_words = sum(w in text for w in _HINDI_MARKERS)
    if gu_words != hi_words:
        return "gu" if gu_words > hi_words else "hi"

    gu = len(_GUJARATI.findall(text))
    hi = len(_DEVANAGARI.findall(text))
    if gu or hi:
        return "gu" if gu >= hi else "hi"
    return "en"


def prepare_for_speech(text: str) -> tuple[str, str]:
    """Return (spoken_text, language_code) for a reply.

    Only Gujarati gets transliterated: it is the case where an English word
    mid-sentence flips the voice into a British accent. Hindi handles Latin
    loanwords acceptably, and English must obviously stay as written.
    """
    lang = detect_language(text)
    if lang == "gu":
        return to_gujarati_speech(text), "gu"
    return text, lang

# Script offsets for pulling stray characters back into the target script.
# Gemini occasionally emits a Bengali/Punjabi/Gujarati letter inside a Hindi
# sentence (and vice versa); TTS then mispronounces or drops the word.
_BLOCKS = {
    "gu": 0x0A80,
    "hi": 0x0900,
}
_STRAY_RANGES = (
    (0x0900, 0x097F),  # Devanagari
    (0x0980, 0x09FF),  # Bengali
    (0x0A00, 0x0A7F),  # Gurmukhi
    (0x0A80, 0x0AFF),  # Gujarati
)


def unify_script(text: str, lang: str) -> str:
    """Map Indic letters from other scripts into `lang`'s script.

    The Indic blocks share a layout, so a letter can be moved between them by
    a fixed offset. Characters outside those blocks (Latin, digits, tags) are
    left untouched.
    """
    target = _BLOCKS.get(lang)
    if target is None:
        return text

    out = []
    for ch in text:
        cp = ord(ch)
        for lo, hi in _STRAY_RANGES:
            if lo <= cp <= hi:
                mapped = cp - lo + target
                if target <= mapped <= target + 0x7F:
                    ch = chr(mapped)
                break
        out.append(ch)
    return "".join(out)
