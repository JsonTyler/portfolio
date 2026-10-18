# Real application recordings

Playwright is installed in the agent environment. The host denies local server sockets and Chromium IPC, preventing both application startup and browser recording. Installing another browser package does not resolve that restriction. Use a local development session/container where localhost servers and Chromium can run. This session cannot alter its host policy.

On that machine, start the relevant original application with its own documented command and synthetic fixtures. For a static prototype, serve its directory locally. Then, from the portfolio directory, run:

```sh
python3 docs/qa/record_preview.py --url http://127.0.0.1:3000 --seconds 12
```

This opens a browser for manual interaction and saves a WebM recording and PNG poster in `/tmp/project-recording`. The Python Playwright package and its Chromium installation must be available on that machine. If missing, install them there following Playwright's installation documentation. The helper is syntax-checked here; browser execution remains unverified.

To convert a real recording on a machine with FFmpeg:

```sh
ffmpeg -i recording.webm -filter_complex '[0:v]fps=10,scale=900:-1:flags=lanczos,split[a][b];[a]palettegen[p];[b][p]paletteuse' -loop -1 preview.gif
```

Use the actual WebM filename. Review for private information before adding a capture. No live account or employer dataset is needed. The rejected synthetic GIFs have been withdrawn. For the Cirrus compact-mode GIF, use `python3 docs/qa/capture_cirrus.py` on a browser-capable host; it captures real toggles directly into a GIF without FFmpeg. Its execution remains unverified.

## Giving the agent a browser

In the desktop app, invoke `@Browser` and allow the local project origin in Settings → Browser → Agent permissions. This provides a browser capability separate from launching Chromium in the current managed shell. Tool availability and workspace policy still apply. Official setup: https://learn.chatgpt.com/docs/browser

For a local Codex CLI session, open this project locally and use `/permissions` to select an appropriate local-execution profile. The host must permit browser subprocesses/IPC; a managed policy may require an administrator. Merely enabling outbound internet does not resolve that host restriction. Official controls: https://learn.chatgpt.com/docs/sandboxing

The user subsequently authorized a concept-level compact-mode animation. The portfolio now includes that labeled concept GIF, generated without browser capture; it does not remove the limitation on recording actual applications.
