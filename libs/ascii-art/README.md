# ASCII art

The portfolio gallery lives at `/ascii-art`. Link directly to an artwork with
`?scene=lattoo`, `?scene=kathputli`, or `?scene=pinwheels`. An unknown scene falls
back to Lattoo. The shared portfolio navigation and theme remain in control.

## Responsibilities

- `pages/ascii-art.js` supplies the existing article layout and page title.
- `components/ascii-art/gallery.js` owns selection, URL state, accessible controls,
  and announcements. It uses the existing Chakra and next-themes patterns.
- `components/ascii-art/canvas.js` connects React events and effect cleanup to one
  player. Animation state never causes a React render on each frame.
- `components/ascii-art/use-reduced-motion.js` subscribes to the OS preference
  with a hydration-safe still-image default, then follows live preference changes.
- `player.js` owns the browser lifecycle: fixed-step simulation, frame scheduling,
  pointer coordinates, pause, playback speed, theme changes, canvas size and
  pixel-ratio changes, off-screen pausing, and teardown.
- `renderer.js` samples scene geometry into a cached atlas of colored characters.
- `scenes/` contains the independent object simulations and geometry.
- `artworks.js` is the gallery registry. `constants.js` defines the shared coordinate
  system and frame budget; `math.js` contains only shared numerical helpers.

## Scene contract

Each scene exposes `time`, `pointer`, `update(deltaSeconds)`, `interact()`, and
`sample(horizontal, vertical, cellWidth)`. Coordinates use a 960 × 420 logical
surface, independent of CSS size. Only the 640 × 364 window starting at
(160, 18) is drawn (`VIEW_*` in `constants.js`), so keep artwork inside it. `interact()` returns `false` when nothing
responded (for example a click far from every lattoo); the artwork's `missed`
text is then announced instead of `announcement`. A sample is either `null` or a
cached material containing `tone`, one ASCII `glyph`, `density`, and optional
`opacity` in the range 0–1. Thin features (strings, sticks, paper edges) scale
their reach with `cellWidth` so they survive the coarser narrow-screen grid.
Keep browser APIs, event listeners, and frame scheduling out of scene modules.

Geometry is updated at 60 steps per second and sampled at most 30 times per
second. The renderer sizes its backing store to the displayed width (device pixel
ratio capped at 2, whole-number scale up to 3×) and reuses glyph tiles. When
the canvas is narrower than 560 CSS pixels, cells double to 10 × 14 logical
pixels (64 × 26 characters instead of 128 × 52) so glyphs stay legible on phones.
Only the selected scene exists. React effect cleanup cancels its frame and
removes its visibility listener before replacement or route unmount.

Reduced motion renders a composed still and suppresses pointer/click movement.
Hidden tabs and an off-screen canvas stop scheduling frames. Pause and theme changes preserve scene state;
reset and scene changes create a fresh simulation. Changing speed does not reset it.

## Editing the artwork

- Lattoo: edit the turned-wood profile and lacquer materials in `scenes/lattoo.js`.
- Kathputli: the named dance constants control timing and forearm length. Both
  puppets use one beat; forearms rotate around steady elbows without stretching.
- Pinwheels: folded faces and gusts live in `scenes/pinwheels.js`. Sticks align to
  one character column at any cell size so they cannot split as the paper rotates.

No animation library, images, or new dependency is needed for the character art.
To add an artwork, implement the scene contract and register it in `artworks.js`.

## Validation

Run `bun run lint` and `bun run build`. In `bun run dev`, check direct URLs,
selection, keyboard controls, reset, pause, half speed, both themes, narrow screens
(below 560px the grid coarsens), moving the window between displays,
OS reduced motion, and navigating away and back. Confirm the kathputli forearms
alternate together and the pinwheel sticks remain single-column during gusts.
