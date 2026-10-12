# MARGINS 邊緣 — opening titles

A quiet 32-second opening for *Margins*, a documentary on the qipao and neo-Chinese dress.
The picture is drawn to a 1920×1080 canvas as a function of time, and the score is synthesized
with Web Audio on the same clock. There's no stock footage, samples or licensed music.

- **Play with sound:** open `index.html` in a browser and click Play.
- **Preview render:** `dist/margins-opening-preview.mp4` (1080p · 24 fps · AAC stereo).
- **Re-render:** `node opening/render.mjs` (needs Playwright + ffmpeg). `--stills 5,15,25` exports PNG frames;
  `--audio-only` re-scores and remuxes onto an existing render.

## Sequence

Warm paper throughout, one ink colour and one red.

| Time | Picture | Sound |
|---|---|---|
| 0:00–0:10 | A red thread stitches the outline of a qipao, then its curved placket and three frog buttons. | Room tone, a low drone, a few guzheng notes, soft stitching. |
| 0:10–0:19 | A red sun rises. The Bund rises from the river, sinks back, and Pudong rises in its place. | 茉莉花 (Jasmine Flower) on a plucked string. |
| 0:20–0:32 | **MARGINS** in EB Garamond fades in letter by letter. A red 邊緣 seal is pressed beside it. Then 一部關於旗袍的紀錄片 and bymargins.com, before everything fades back to paper. | A soft press for the seal, one bent guzheng note, a fade. |

## Editing

Every cue is in the `T` object at the top of the script. Picture and sound read from it, so moving a cue keeps
them in sync. The seal text is set in `buildAssets()`.
