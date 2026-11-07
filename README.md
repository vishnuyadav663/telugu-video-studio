# Telugu Video Studio

A Remotion-based video generator for Telugu documentary YouTube Shorts.

## First format

- Canvas: 1080 × 1920 (9:16 vertical)
- Frame rate: 30 FPS
- Duration: 45 seconds
- Output: MP4 (H.264)

## Edit the Short

Change the scene text, colors, and order in `src/content.ts`.

The first version is a motion-graphics template. It does not yet generate narration, source images, or AI video clips automatically; those will be added as separate production steps.

## Render locally

Requires Node.js 22.

```bash
npm install
npm run studio
npm run render:short
```

## Render using Android + GitHub Actions

1. Open the repository on GitHub.
2. Select **Actions**.
3. Select **Render Telugu Short**.
4. Tap **Run workflow** on the main branch.
5. Wait for the workflow to finish.
6. Open the successful run and download the `telugu-short-video` artifact.

The MP4 is provided as a workflow artifact for 7 days.

## Project structure

- `src/content.ts`: editable Telugu scene content
- `src/Short.tsx`: animated Shorts composition
- `src/Root.tsx`: Remotion composition settings
- `.github/workflows/render-short.yml`: cloud rendering workflow
