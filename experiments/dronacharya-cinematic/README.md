# Dronacharya — The Last Silence

A self-contained 10-second vertical (1080×1920) Canvas animation with layered battlefield silhouettes, embers, smoke, a slow camera push, a weapon drop, and timed story captions.

## Preview
Open `index.html` in a browser. No external assets are required.

## Export MP4 locally
Requirements: Python 3.10+, Playwright, its Chromium browser, and FFmpeg on PATH.

```bash
pip install playwright
playwright install chromium
python render_mp4.py
```

The script renders 300 frames at 30 fps and encodes `dronacharya_final.mp4` (H.264, 1080×1920, 10 seconds).

## GitHub Pages preview
This project is stored under `experiments/dronacharya-cinematic/`. Once GitHub Pages is enabled for the repository, open:
`https://vishnuyadav663.github.io/telugu-video-studio/experiments/dronacharya-cinematic/`

## Note
This is stylized 2D motion graphics, not photorealistic 3D footage. The scene avoids graphic violence. Captions are cinematic interpretation, not a verbatim quotation from the Mahabharata.
