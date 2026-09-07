# CampaignX Gujarati Voice Agent — Setup Guide

A voice bot that talks to your website visitors in **natural Gujarati**, answers
their questions, and **emails you their contact details** as a lead.

You do not need to know Python. Just follow the steps in order.

---

## Why the current voice sounds bad (and how this fixes it)

Your current widget uses LiveKit's default demo agent. Its voice engine is
built for English, so when it speaks Gujarati it reads the letters phonetically —
robotic and wrong.

This new agent uses **Sarvam AI**, an Indian company whose voice models are
trained on Indian languages. Gujarati comes out sounding like an actual
Gujarati speaker: right rhythm, right stress, right pronunciation.

| Part | What it does | Service | Cost |
|---|---|---|---|
| Ears (STT) | Understands spoken Gujarati | Sarvam `saaras:v3` | ₹1,000 free credit |
| Brain (LLM) | Decides what to say | Google Gemini Flash | Free tier |
| Voice (TTS) | Speaks natural Gujarati | Sarvam `bulbul:v3` | Same free credit |
| Calling | Connects browser to bot | LiveKit Cloud | 1,000 free min/month |
| Leads | Emails you the contact | Your Gmail | Free |

**Everything above starts free.** No credit card needed for any of it.

---

## STEP 1 — Get your 4 keys (about 15 minutes)

Open each link, sign up, and copy the key into a notepad. You'll paste them all
in Step 2.

### 1a. LiveKit (the phone line)
1. Go to **https://cloud.livekit.io** and sign up with Google.
2. Create a project — name it `campaignx`.
3. Left sidebar → **Settings** → **Keys** → click your key → **Reveal Secret**.
4. Copy these three:
   - `LIVEKIT_URL` — looks like `wss://campaignx-xxxx.livekit.cloud`
   - `LIVEKIT_API_KEY` — starts with `API`
   - `LIVEKIT_API_SECRET` — long random text

### 1b. Sarvam AI (the Gujarati voice — the important one)
1. Go to **https://dashboard.sarvam.ai** and sign up.
2. You automatically get **₹1,000 free credit**, no card required.
3. Go to **API Keys** → **Create API Key** → copy it.
   - This is your `SARVAM_API_KEY`.

> ₹1,000 gives you roughly 300,000 characters of speech — about
> **30–60 hours** of conversation. Plenty to launch with.

### 1c. Google Gemini (the brain)
1. Go to **https://aistudio.google.com/apikey**
2. Click **Create API key** → copy it.
   - This is your `GOOGLE_API_KEY`. Free tier, no card.
   - New keys start with **`AQ.`** (older ones started `AIza`). Both are fine.

### 1d. Gmail App Password (to receive leads)
Gmail blocks normal passwords for apps, so you need a special one.

1. Go to **https://myaccount.google.com/security**
2. Turn on **2-Step Verification** if it's off. (Required — the next step is
   hidden without it.)
3. Go to **https://myaccount.google.com/apppasswords**
4. Type a name like `campaignx-bot` → **Create**.
5. Copy the **16-character password** shown (e.g. `abcd efgh ijkl mnop`).
   - Remove the spaces → this is your `SMTP_PASSWORD`.

---

## STEP 2 — Put the keys into the project

1. In the `agent` folder, find the file **`.env.example`**.
2. Make a copy of it and rename the copy to exactly **`.env`** (no `.example`).
3. Open `.env` in a text editor and replace each placeholder with your real key.

It should end up looking like this:

```
LIVEKIT_URL=wss://campaignx-ab12cd.livekit.cloud
LIVEKIT_API_KEY=APIabc123xyz
LIVEKIT_API_SECRET=verylongsecretstring

SARVAM_API_KEY=sk_abc123xyz
SARVAM_SPEAKER=shruti

GOOGLE_API_KEY=AQ.Ab8RN6xxxxxxxxxxxx
GEMINI_MODEL=gemini-3.6-flash

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=youremail@gmail.com
SMTP_PASSWORD=abcdefghijklmnop
LEAD_TO_EMAIL=subscription@softqubes.com
```

> **Never commit `.env` to git.** It's already in `.gitignore` for you.

---

## STEP 3 — Run the bot on your computer

Open **PowerShell** in the `agent` folder and run these one at a time.

**First time only** — download the voice detection model:
```powershell
.\venv\Scripts\python.exe agent.py download-files
```

**Start the bot:**
```powershell
.\venv\Scripts\python.exe agent.py dev
```

You should see `registered worker`. **Leave this window open** — the bot only
works while this is running.

### Test it right now — easiest way (no browser needed)
Stop the bot (`Ctrl + C`) and run this instead:

```powershell
.\venv\Scripts\python.exe agent.py console
```

This talks to you directly through your PC mic and speakers. Say
"કેમ છો" and listen. This is the fastest way to judge the voice quality.

Press `Ctrl + C` to exit, then go back to `agent.py dev` for the real thing.

### Test it in the browser
1. Go to **https://agents-playground.livekit.io**
2. Connect to your project (it reads your LiveKit account automatically).
3. Allow microphone access.
4. The bot should greet you in Gujarati. Talk to it.
5. Give it a fake name and email → check your inbox for the lead email.

To stop the bot, press `Ctrl + C` in that window.

---

## STEP 4 — Connect it to your website

Your site currently points at LiveKit's demo agent. You need to swap in yours.

1. In LiveKit Cloud, go to **Agents** and find your agent's ID
   (it looks like `CA_xxxxxxxx`).
2. Open `src/routes/__root.tsx` in your website project.
3. Find `data-lk-agent="CA_j8uznGS4JH4g"` near the bottom.
4. Replace that ID with **your** agent ID.
5. Update the greeting text to Gujarati:

```tsx
data-lk-listening-text="CampaignX સાથે વાત કરો…"
```

---

## STEP 5 — Deploy so it runs 24/7

Right now the bot only works while your PC is on. To keep it always live:

```powershell
.\venv\Scripts\python.exe -m pip install livekit-cli
lk cloud auth
lk agent create
```

This uploads the agent to LiveKit Cloud. It stays running whether your computer
is on or not, using your 1,000 free monthly minutes.

---

## Changing how the bot sounds

Open `.env` and change `SARVAM_SPEAKER` to any of these, then restart:

**Female:** `shruti` · `kavya` · `priya` · `neha` · `ishita` · `pooja` · `tanya`
**Male:** `shubh` · `aditya` · `rohan` · `dev` · `varun` · `kabir` · `amit`

**Speaking speed:** in `agent.py`, find `pace=0.95`.
Lower is slower and calmer (`0.9`), higher is faster (`1.1`).

## Changing what the bot says

Open `agent.py` and edit the `INSTRUCTIONS` text block at the top. It's written
in Gujarati on purpose — that keeps the bot replying in Gujarati instead of
drifting into English. Add your pricing, services, or FAQs there.

---

## Troubleshooting

**"registered worker" never appears**
Your LiveKit keys are wrong. Re-copy them from Settings → Keys.

**Bot hears me but doesn't reply**
Your `GOOGLE_API_KEY` is wrong, or you hit the free-tier rate limit.
If the log says `404 ... no longer available`, the model name is retired —
change `GEMINI_MODEL` in `.env` to `gemini-3.5-flash` or `gemini-flash-latest`.

**Bot replies but there's no sound**
Your `SARVAM_API_KEY` is wrong or out of credit. Check the Sarvam dashboard.

**No lead email arrives**
You used your normal Gmail password instead of the 16-character App Password.
Redo Step 1d. Also check your Spam folder.

**Bot replies in English instead of Gujarati**
Make the Gujarati rule stronger in `INSTRUCTIONS`, and confirm
`target_language_code="gu-IN"` in `agent.py`.

**Bot interrupts me while I'm talking**
In `agent.py`, inside `sarvam.STT(...)`, add `high_vad_sensitivity=False`.
