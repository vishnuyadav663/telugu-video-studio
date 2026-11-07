# Dronacharya — Lemo-Opuscar film

This film uses Lemo-Opuscar's page contract and rendering/mux pipeline (not the Remotion composition).

- 30 seconds, 1080x1920, 30 fps.
- Telugu narration via Microsoft Edge TTS voice `te-IN-MohanNeural` (online; verify voice availability in the runner).
- Original procedural score and synthesized battlefield foley via Python/NumPy.
- Final audio mux/master via Lemo-Opuscar's FFmpeg mux script.

Run from repository root:
```bash
git clone --depth 1 https://github.com/lemomo-ai/lemo-opuscar.git .lemo-opuscar
LIB="$PWD/.lemo-opuscar" bash films/dronacharya/build.sh
```

The narration voice is an online service; review Microsoft's terms for commercial use. No copyrighted soundtrack or third-party SFX recordings are used.
