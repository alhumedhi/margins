# MARGINS 邊緣 — opening title sequence

A 50-second analog-feeling opening for *Margins*, a documentary on the qipao and neo-Chinese dress.
Everything is procedural: the picture is drawn to a 1920×1080 canvas as a function of time, and the
score is synthesized live with Web Audio on the same clock. There's no stock footage, samples or music licences.

- **Watch / play with sound:** open `index.html` in a browser and click the seal. Hover to jump between scenes.
- **Preview render:** `dist/margins-opening-preview.mp4` (1080p · 24 fps · AAC stereo).
- **Re-render:** `node opening/render.mjs` (needs Playwright + ffmpeg). `--stills 5,15,34` exports PNG frames;
  `--audio-only` re-scores and remuxes onto an existing render.

## The idea

*Margins* is a tailoring word before it's a metaphor. The seam allowance is the strip of cloth outside the
stitch line, the part nobody sees. The sequence follows one red thread from the cutting table, through a
century of Shanghai, to the title, and it ends where Chinese art always ends: with a seal.

Visual language: rice paper, letterpress, halftone print, film grain and gate weave. One colour does all the
storytelling: cinnabar seal-paste red (朱砂).

## Sequence

| Time | Scene | Picture | Sound |
|---|---|---|---|
| 0:00–0:04.5 | **Leader 第一卷** | Academy-style countdown leader, but counting **三 · 二 · 一** in brush calligraphy. Sprockets, edge print, then "第一卷 / REEL ONE" on black. | Projector spins up and clatters at 24 fps, ticks on each number, the 1 kHz "2-pop". |
| 0:04.5–0:13.8 | **The Tailor's Draft 裁縫** | A pattern draft on paper: ruler, fold line, measurement guides (肩寬 38 · 胸圍 86 · 腰圍 64 · 臀圍 92). A sewing needle stitches the qipao silhouette in red thread, then the 襟 placket curve. Five 盤扣 frog buttons pop on. Callouts 領 · 襟 · 衩. A small 旗袍 seal stamps the corner. | Low D drone, sparse guzheng plucks with a press-bend, a sewing machine synced stitch-for-stitch to the needle. |
| 0:13.8–0:20.8 | **Shanghai 1925** | The red thread wipes across into a 1920s calendar-poster print: misregistered red halftone sky settling into register, a cinnabar sun, the Bund rising from the river (Customs House clock tower, Peace Hotel pyramid, HSBC dome, Bank of China roof), a junk crossing the Huangpu. 上海 in brush, "THE PARIS OF THE EAST", an odometer reading 1925. | A radio tunes in to **茉莉花 (Jasmine Flower)**, the 18th-century folk tune, played band-limited and saturated, plus crackle. |
| 0:20.2–0:21.5 | **Time slip** | A film burn blooms through the print while the odometer spins 1925 → 2026. | Whoosh, sub drop, odometer ratchet. |
| 0:21.5–0:25.6 | **Shanghai 2026 新中式** | Night. Pudong in red neon (Oriental Pearl, Jin Mao, SWFC, Shanghai Tower) igniting tower by tower, reflected in the river. The qipao from the draft returns as a neon sign beside **新中式 / NEO-CHINESE**. Power cuts out. | Neon buzz and flicker, an 808-style kick under the same guzheng with tape delay, then a power-off thunk. |
| 0:25.6–0:31 | **Letterpress** | Metal type sorts slam **M A R G I N S** into paper one letter at a time, accelerating. Debossed and speckled ink. The red thread stitches an underline. | Metal clack and wood knock per letter, drone returns. |
| 0:31–0:36 | **The Seal 邊緣** | The camera pushes in. A shadow grows, the soapstone comes down, and **THOOM**: a white-carved 邊緣 seal (margins) in cinnabar, with paper dust. Pull back to the full card. | A rising riser, then a held breath of silence, then the impact: sub boom, stone knock and a low gong. |
| 0:36–0:46.5 | **Card** | 一部關於旗袍的紀錄片 typed out, then "A DOCUMENTARY ON THE QIPAO & NEO-CHINESE DRESS", then **BYMARGINS.COM** in red. A ghost of the Bund sits in halftone at the bottom. | Typewriter and bell, a pentatonic guzheng glissando on the URL, full D chord. |
| 0:46.5–0:50 | **Run-out** | Flicker and dust build, burn to white, a red flash frame, black. | Projector slows; the film tail slaps the reel. |

## Notes and options

- **Seal text:** 邊緣 ("edge / margin") in traditional characters for the 1920s–40s period. The small seal reads
  旗袍 right-to-left, the traditional order. To change either, edit the `makeSeal` calls in `buildAssets()`.
- **Timing:** every beat lives in the `T` object at the top of the script. Picture and sound both read from it,
  so moving a cue keeps them in sync.
- **For the edit:** the preview is bitrate-capped. For a mastering-grade file, render locally and swap the
  encoder line in `render.mjs` for ProRes (`-c:v prores_ks -profile:v 3`). The grain is real per-pixel noise
  and needs bitrate.
- **Cutdowns:** the Shanghai 1925→2026 section (0:13.8–0:25.6) works as a 12-second teaser, and the
  title card from 0:25.6 works as a 6-second bumper or end card.

### Other directions considered

1. **Silk-screen.** Every scene printed as a 2-colour silkscreen pulled by a squeegee, with a hand-drag reveal.
2. **Calendar girl (月份牌).** Animate a 1930s Shanghai calendar-poster woman whose qipao changes cut decade by
   decade (1920s loose A-line → 1940s high slit → 2020s neo-Chinese) while the background stays still.
3. **Darkroom.** Archival photos developing in a tray of red safelight, with the title appearing last on the print.
