# LiveKit Cloud builds this image and runs the agent 24/7.
FROM python:3.12-slim

# Audio processing needs these at runtime.
RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg gcc python3-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install deps first so code edits don't invalidate the dependency layer.
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY agent.py leads.py eleven_v3_tts.py translit.py sarvam_multi.py cartesia_multi.py ./

# Bake the VAD/turn-detector models into the image; downloading them at
# startup would delay the first session and can hit rate limits.
RUN python agent.py download-files

CMD ["python", "agent.py", "start"]
