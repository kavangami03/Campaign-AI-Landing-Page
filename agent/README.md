# CampaignX Voice Agent — "મીરા"

A LiveKit voice agent that talks to website visitors in **Gujarati, Hindi or
English** (auto-detected), and emails you their contact details as a lead.

**Setup guide: [SETUP.md](SETUP.md)**

## Current stack

| Part | Service | Notes |
|---|---|---|
| Ears (STT) | Sarvam `saaras:v3` | auto-detects the spoken language |
| Brain (LLM) | Gemini `3.5-flash-lite` | free tier |
| Voice (TTS) | Cartesia `sonic-3`, voice **Isha** | switches language per reply |
| Transport | LiveKit Cloud (ap-south) | agent `CA_pD7ZyqZkfwt8` |
| Leads | SMTP → `LEAD_TO_EMAIL` | sent by `save_lead` tool |

## Files

| File | Purpose |
|---|---|
| `agent.py` | Persona, conversation rules, lead tool, engine selection |
| `cartesia_multi.py` | Cartesia TTS with per-utterance language switching |
| `sarvam_multi.py` | Same for Sarvam — fallback provider |
| `eleven_v3_tts.py` | ElevenLabs v3 over HTTP — fallback provider |
| `translit.py` | Language detection, script repair, Gujarati transliteration |
| `leads.py` | Emails captured leads over SMTP |
| `.env` | Your keys and tuning knobs (git-ignored) |

## Switching voice engine

Set `TTS_PROVIDER` in `.env` to `cartesia`, `sarvam`, `elevenlabs_v3`, or
`elevenlabs`, then redeploy. Each provider's keys are already in `.env`.

## Tuning the voice (no code changes)

```
CARTESIA_VOLUME=1.5            # 0.5 - 2.0
CARTESIA_SPEED=0.95            # 0.6 - 2.0
CARTESIA_EMOTION=Happy,Curious # Enthusiastic, Confident, Content, Amazed...
GREETING=...                   # first line she speaks
```

## Commands

```powershell
.\venv\Scripts\python.exe agent.py console   # talk via PC mic/speakers
.\venv\Scripts\python.exe agent.py dev       # run locally for the browser

lk agent deploy --secrets-file .secrets --ignore-empty-secrets .   # deploy
lk agent status                                                    # check
```
