---
title: Video Scraping
description: Extract code, transcripts, and structured knowledge from YouTube and local video tutorials
section: manual
subsection: scraping
order: 3
---

# Video Scraping

Skill Seekers v3.2.0 introduced a complete video tutorial extraction pipeline that converts YouTube videos and local video files into AI-consumable skills.

## Quick Start

```bash
# YouTube video
skill-seekers video --url https://www.youtube.com/watch?v=... --name mytutorial

# Local video file
skill-seekers video --video-file tutorial.mp4 --name mytutorial

# YouTube playlist
skill-seekers video --playlist https://www.youtube.com/playlist?list=... --name series

# First time setup (installs GPU-aware deps)
skill-seekers video --setup
```

## What Gets Extracted

The video pipeline extracts multiple data streams:

1. **Metadata** — Title, channel, views, chapters, duration (via yt-dlp)
2. **Transcripts** — Multi-source with 3-tier fallback: YouTube Transcript API → yt-dlp subtitles → faster-whisper local transcription
3. **Segments** — Chapter-based or time-window segmentation with configurable overlap
4. **Visual code** — OCR on code editor panels, code timeline tracking across frames
5. **SKILL.md** — Structured output combining all extracted knowledge

## Optional Dependencies

```bash
pip install "skill-seekers[video]"
```

This installs: yt-dlp, faster-whisper, pytesseract, opencv-python, and other visual extraction dependencies.

## Pipeline Architecture

The video pipeline follows this flow:

```
Video → Metadata → Transcript → Segmentation → Visual Extraction → SKILL.md
```

Key modules:
- `video_scraper.py` — Main orchestrator (~960 lines)
- `video_metadata.py` — YouTube/local metadata extraction
- `video_transcript.py` — Multi-source transcript with fallback
- `video_segmenter.py` — Chapter-based and time-window segmentation
- `video_visual.py` — Visual extraction with OCR (~2,410 lines)

## Also Available via Create

```bash
# Auto-detection routes YouTube URLs to video scraper
skill-seekers create https://www.youtube.com/watch?v=...
```
