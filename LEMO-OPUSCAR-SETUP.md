# Lemo-Opuscar on Android + GitHub Actions

This repository has a manual GitHub Actions workflow for rendering Lemo-Opuscar films in GitHub's cloud runner. You can control it from the GitHub website on Android; no local PC installation is required.

## What this integration does

1. Checks out this repository.
2. Downloads the official Lemo-Opuscar library from https://github.com/lemomo-ai/lemo-opuscar.
3. Installs Node, Python, headless Chromium and the library's core dependencies.
4. Copies the selected film folder into the library's `films/` directory.
5. Renders an MP4 and uploads it as a downloadable Actions artifact.

The workflow does not generate a film or write the storyboard/animation code. A film project must already exist in this repository and contain an `index.html` implementing the Lemo-Opuscar page contract (`window.DUR`, `window.render(t)`, and `window.READY`). See the official technique guide: https://github.com/lemomo-ai/lemo-opuscar/blob/main/TECHNIQUE.md.

## Android steps

1. Open this repository in Chrome: https://github.com/vishnuyadav663/telugu-video-studio
2. Add your Lemo-Opuscar film project under `films/<film-name>/`. The folder must include `index.html`; use the official style's `STYLE.md` and project instructions when creating it.
3. Commit the files to the `main` branch.
4. Open the **Actions** tab.
5. Select **Lemo-Opuscar Render** and tap **Run workflow**.
6. Enter the film folder, for example `films/dronacharya`; choose FPS and output dimensions.
7. After the run completes, open its summary and download the `lemo-opuscar-video` artifact.

## Current default

- Folder: `films/dronacharya`
- FPS: 24
- Dimensions: 1080x1920 (vertical)
- Workers: 2
- Artifact retention: 7 days

## Important limitations

- The first run installs several hundred MB of dependencies and may take several minutes.
- GitHub Actions usage is subject to your account's included minutes and billing limits.
- GPU-heavy 3D styles may not render correctly or efficiently on the standard GitHub-hosted runner.
- The current workflow renders picture only. It does not automatically create Telugu narration, music, subtitles, or a final audio mix. Those need a film-specific `build.sh`/mix pipeline.
- Lemo-Opuscar's authors say its styles are tuned for Claude Opus 5.5. Other coding models can use the framework, but results may need more manual iteration.

Official project: https://github.com/lemomo-ai/lemo-opuscar
