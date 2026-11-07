from pathlib import Path
import subprocess
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent
FRAMES = ROOT / "frames"
FRAMES.mkdir(exist_ok=True)
FPS, COUNT = 30, 300

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1080, "height": 1920}, device_scale_factor=1)
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    page.set_content(html, wait_until="load")
    page.wait_for_function("typeof window.renderAt === 'function'")
    for i in range(COUNT):
        page.evaluate("(t) => window.renderAt(t)", i / FPS)
        page.screenshot(path=str(FRAMES / f"frame_{i:04d}.png"))
    browser.close()

out = ROOT / "dronacharya_final.mp4"
subprocess.run([
    "ffmpeg", "-y", "-framerate", str(FPS),
    "-i", str(FRAMES / "frame_%04d.png"),
    "-c:v", "libx264", "-preset", "medium", "-crf", "18",
    "-pix_fmt", "yuv420p", "-movflags", "+faststart",
    "-t", "10", str(out)
], check=True)
print(f"Created: {out}")
