# Hyperframes Composition Brief: FixTrack

## Objective
Create a short launch-style brag video for FixTrack — a white-label repair tracking platform for gadget shops.

## Output
- Composition directory: `brag-output/composition/`
- Rendered video: `brag-output/brag.mp4`
- Format: landscape — 1920x1080
- Duration: 20 seconds

## Source Material
- Project root: /home/rei/Downloads/fixtrack-web
- Primary files read: index.html, styles.css, config.js, status.html, dashboard.html, README.md
- Product name: FixTrack
- Tagline / strongest claim: "Fast, reliable device repairs you can count on"
- Key UI or visual moment to recreate: The 6-step horizontal milestone tracker (Device Received → Diagnostic → Awaiting Parts → Active Repair → Quality Check → Ready for Pickup), the cost breakdown panel with ₱ prices, and the dashboard ticket table.
- Copy that must appear verbatim:
  - "Track Your Device Repair In Real Time"
  - "FixTrack"
  - "Fast, reliable device repairs you can count on"
  - Status labels: "Device Received", "Diagnostic", "Awaiting Parts", "Active Repair", "Quality Check", "Ready for Pickup"
  - Cost items: "Replacement OLED Screen" ₱11,700, "Waterproof Adhesive Seal" ₱1,000, "Installation & Display Calibration Labor" ₱2,800

## Creative Direction
- Tone preset: app-store
- Creative direction: clean SaaS product demo for a repair shop platform
- Interpretation: Feature-forward, professional, clean reveals, card-style layouts. No jokes. Let the UI design speak through the dark-mode aesthetic.
- Angle: FixTrack is the "Shopify for repair shops." The video shows what it feels like to be a customer tracking your repair — entering a ticket ID, seeing the pipeline, seeing the cost breakdown — then flips to the shop owner's dashboard. It's an earnest product demo that treats the repair industry with respect.
- Hook: Hero headline "Track Your Device Repair In Real Time" with a cursor typing "1042" into the search bar.
- Outro / punchline: Wrench icon + "FixTrack" + "Fast, reliable device repairs you can count on."
- Avoid:
  - Generic SaaS language ("streamline your workflow", "all-in-one solution")
  - Abstract filler visuals
  - Light mode — use dark mode palette throughout

## Visual Identity
- Background: oklch(0.17 0.015 260) — deep navy/charcoal
- Surface: oklch(0.21 0.018 260)
- Card: oklch(0.22 0.018 260)
- Text: oklch(0.96 0.004 250) — near-white
- Muted text: oklch(0.7 0.02 255)
- Accent: oklch(0.7 0.13 210) — teal/cyan
- Primary: oklch(0.95 0.004 250)
- Primary foreground: oklch(0.2 0.02 260)
- Border: oklch(1 0 0 / 12%)
- Success: oklch(0.7 0.13 155) — green
- Warning: oklch(0.79 0.14 75) — amber
- Destructive: oklch(0.66 0.19 25) — red
- Display font: Space Grotesk (500, 600, 700) — for headings
- Body font: DM Sans (400, 500, 600, 700) — for body text
- Mono font: JetBrains Mono (400, 700) — for ticket IDs, serial numbers, prices
- Visual references from the project: 6-step milestone tracker, cost breakdown panel, dashboard ticket table, wrench icon logo, dark mode card panels with subtle border and shadow

## Storyboard
Use the storyboard in `brag-output/brag-plan.md` as the creative contract.

Scene summary:
1. Hook & Search — 4s — Hero headline visible, cursor types "1042" into search bar, clicks Track Repair button
2. Status Tracker — 6s — 6-step milestone tracker animates in step by step, "Active Repair" highlighted with accent color, device info card (iPhone 13) slides in below
3. Cost Breakdown & Dashboard — 6s — Cost line items appear one by one (₱ prices), subtotal/VAT/total. Then dashboard ticket table with stat cards (Active Repairs: 4, Ready for Pickup: 1)
4. Logo & Tagline — 4s — Wrench icon scales in, "FixTrack" appears, tagline fades in. Music fades out.

## Audio
- Audio role: warm bed with light professional accents
- Audio arc: warm bed enters immediately, builds confidence through milestone reveals, carries through dashboard moment, fades out gently under the logo
- Music: happy-beats-business-moves-vol-11-by-ende-dot-app.mp3
- Music treatment: start at 0s, volume 0.35, gentle fade-out over the final 2s (from ~18s to 20s)
- Music cue guidance: bundled preset at `/home/rei/.agent/skills/brag/assets/music/cues/happy-beats-business-moves-vol-11-by-ende-dot-app.music-cues.json`. Tempo ~114.84 BPM. Target strong cues: 1.60s for hook text, 5.80s for milestone tracker reveal, 12.65s for dashboard/cost breakdown, 17.91s for logo slam. Beat grid for sequential milestone steps around 5.80–8.96s.
- Audio-reactive treatment: subtle; use music RMS/bass to make accent-colored elements (teal highlights, card borders) breathe slightly. No waveform/equalizer visuals.
- Audio-coupled moments:
  - Scene 1 (0–4s) — typing ticket ID with keypress sounds from keyboard/ set
  - Scene 1 (~3.5s) — click sound on Track Repair button
  - Scene 2 (4–10s) — milestone steps appear one by one with soft interface/drop sounds, every other beat
  - Scene 3 (10–16s) — cost items drop in with subtle card sounds
  - Scene 4 (~16.5s) — wrench icon / logo with bell announcement cue
- SFX selection guidance: use interface/drop_* or interface/click_* for card reveals. keyboard/keypress-*.wav for typing animation. impactBell_heavy_000 or impactSoft_medium_* for the logo slam. Keep it professional — no heavy impacts.
- SFX analysis guidance: /home/rei/.agent/skills/brag/assets/sfx/sfx-analysis.md — prefer low HF risk files for repeated moments.
- Exact SFX choice: Hyperframes should choose filenames, timestamps, density, and volume based on the implemented animation.
- Audio files: copy the chosen music and any Hyperframes-selected SFX into `brag-output/composition/assets/`

## Hyperframes Instructions
Load the composition-building Hyperframes domain skills — `hyperframes-core` (composition contract + `data-*` timing), `hyperframes-animation` (motion), `hyperframes-creative` (design spec, beats, audio-reactive), `hyperframes-keyframes` (seek-safe keyframes), and `hyperframes-cli` (lint/check/render). /brag is its own workflow: do not enter the `hyperframes` entry-point intent interview and do not route into its generic promo / launch-video workflow. Prefer native Hyperframes conventions over anything in `/brag`.

Requirements:
- Show at least one real UI, copy, or visual element from the source project.
- Keep all text readable in the final render.
- Keep the video within 15-25 seconds.
- Include the planned music/SFX layer unless audio was explicitly disabled or documented as intentionally silent.
- Treat `/brag` audio notes as guidance, not a fixed cue sheet. Choose SFX after the visual animation exists.
- Treat music cue metadata as optional timing hints. Hyperframes decides exact animation timing and should ignore cues that hurt readability, scene pacing, or the product story.
- Major reveals may move toward nearby strong cues within about 0.15s. Smaller entrances may align to nearby beat points within about 0.10s. Use only 1-3 strong cue locks in a 15-25s video unless the edit clearly benefits from more.
- Use SFX to support motion and interaction: card sounds for card-like reveals, short announcement cues for major payoffs, key/click sounds for text or user actions, and restraint when the edit is already busy.
- Honor planned music treatment such as fade-outs, ducking, beat-aligned reveals, or letting a final SFX ring over the music, using the best Hyperframes-supported implementation.
- When music is present and the treatment is not `none`, consider Hyperframes audio-reactive workflow: extract audio data and use RMS/frequency bands for subtle, brand-specific motion. Good targets are glow, depth, background warmth, card presence, title emphasis, or other existing visual elements. Avoid waveform/equalizer visuals, musical-note graphics, generic particle systems, strobing, or heavy pulsing.
- Use local assets for audio and any required runtime/media dependencies when possible.
- Run `hyperframes check` before render — it is brag's single gate.
- Keep creation and rendering local. Remote or publishing workflows require a separate explicit user request.
