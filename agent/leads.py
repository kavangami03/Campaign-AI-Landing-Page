"""Emails captured leads to the CampaignX team over SMTP.

Sending is done in a worker thread so a slow SMTP handshake never blocks the
agent's audio loop — a blocked event loop makes the voice stutter.
"""

import asyncio
import logging
import os
import smtplib
import ssl
from datetime import datetime
from email.message import EmailMessage

logger = logging.getLogger("campaignx-gujarati.leads")


def _env(name: str, default: str = "") -> str:
    return os.getenv(name, default).strip()


def _build_message(lead: dict[str, str]) -> EmailMessage:
    sender = _env("SMTP_USER")
    recipient = _env("LEAD_TO_EMAIL") or sender
    stamp = datetime.now().strftime("%d %b %Y, %I:%M %p")

    msg = EmailMessage()
    msg["Subject"] = f"New voice lead: {lead.get('name') or 'Unknown'}"
    msg["From"] = f"CampaignX Voice Bot <{sender}>"
    msg["To"] = recipient
    # Replying goes straight to the visitor instead of back to the bot's inbox.
    if lead.get("email"):
        msg["Reply-To"] = lead["email"]

    rows = [
        ("Name", lead.get("name", "-")),
        ("Email", lead.get("email", "-")),
        ("Phone", lead.get("phone") or "-"),
        ("Requirement", lead.get("requirement") or "-"),
        ("Captured at", stamp),
        ("Session", lead.get("room", "-")),
    ]

    msg.set_content(
        "New lead from the CampaignX Gujarati voice assistant\n\n"
        + "\n".join(f"{label}: {value}" for label, value in rows)
    )

    cells = "".join(
        f'<tr><td style="padding:8px 14px;color:#a1a1aa;font:14px sans-serif;'
        f'border-bottom:1px solid #27272a;white-space:nowrap">{label}</td>'
        f'<td style="padding:8px 14px;color:#fff;font:14px sans-serif;'
        f'border-bottom:1px solid #27272a">{value}</td></tr>'
        for label, value in rows
    )
    msg.add_alternative(
        f"""<div style="background:#09090b;padding:28px">
  <div style="max-width:560px;margin:auto;background:#18181b;border:1px solid #27272a;
              border-radius:14px;overflow:hidden">
    <div style="padding:18px 20px;background:linear-gradient(90deg,#a855f7,#f97316)">
      <h2 style="margin:0;color:#fff;font:600 17px sans-serif">New voice lead</h2>
      <p style="margin:4px 0 0;color:rgba(255,255,255,.85);font:13px sans-serif">
        Captured by the CampaignX Gujarati assistant</p>
    </div>
    <table style="width:100%;border-collapse:collapse">{cells}</table>
  </div>
</div>""",
        subtype="html",
    )
    return msg


def _send_sync(lead: dict[str, str]) -> None:
    host = _env("SMTP_HOST", "smtp.gmail.com")
    port = int(_env("SMTP_PORT", "587"))
    user = _env("SMTP_USER")
    password = _env("SMTP_PASSWORD")

    if not user or not password:
        raise RuntimeError("SMTP_USER / SMTP_PASSWORD are not set in .env")

    msg = _build_message(lead)
    context = ssl.create_default_context()

    # Port 465 is implicit TLS; 587 upgrades via STARTTLS.
    if port == 465:
        with smtplib.SMTP_SSL(host, port, context=context, timeout=20) as server:
            server.login(user, password)
            server.send_message(msg)
    else:
        with smtplib.SMTP(host, port, timeout=20) as server:
            server.starttls(context=context)
            server.login(user, password)
            server.send_message(msg)

    logger.info("lead email delivered to %s", msg["To"])


async def send_lead_email(lead: dict[str, str]) -> None:
    """Send the lead email without blocking the agent's event loop."""
    await asyncio.to_thread(_send_sync, lead)
