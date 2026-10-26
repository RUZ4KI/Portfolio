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
  pointer coordinates, pause, playback speed, theme changes, and teardown.
- `renderer.js` samples scene geometry into a cached atlas of colored characters.
- `scenes/` contains the independent object simulations and geometry.
- `artworks.js` is the gallery registry. `constants.js` defines the shared coordinate
  system and frame budget; `math.js` contains only shared numerical helpers.

## Scene contract

Each scene exposes `time`, `pointer`, `update(deltaSeconds)`, `interact()`, and
`sample(horizontal, vertical)`. Coordinates use a 960 × 420 logical surface,
independent of CSS size. A sample is either `null` or a cached material containing
`tone`, one ASCII `glyph`, `density`, and optional `opacity` in the range 0–1.
Keep browser APIs, event listeners, and frame scheduling out of scene modules.

Geometry is updated at 60 steps per second and sampled at most 30 times per
second. The renderer caps device pixel ratio at 2 and reuses glyph tiles.
Only the selected scene exists. React effect cleanup cancels its frame and
removes its visibility listener before replacement or route unmount.

Reduced motion renders a composed still and suppresses pointer/click movement.
Hidden tabs stop scheduling frames. Pause and theme changes preserve scene state;
reset and scene changes create a fresh simulation. Changing speed does not reset it.

## Editing the artwork

- Lattoo: edit the turned-wood profile and lacquer materials in `scenes/lattoo.js`.
- Kathputli: the named dance constants control timing and forearm length. Both
  puppets use one beat; forearms rotate around steady elbows without stretching.
- Pinwheels: folded faces and gusts live in `scenes/pinwheels.js`. Sticks align to
  one fixed character column so they cannot split as the paper rotates.

No animation library, images, or new dependency is needed for the character art.
To add an artwork, implement the scene contract and register it in `artworks.js`.

## Validation

Run `bun run lint` and `bun run build`. In `bun run dev`, check direct URLs,
selection, keyboard controls, reset, pause, half speed, both themes, narrow screens,
OS reduced motion, and navigating away and back. Confirm the kathputli forearms
alternate together and the pinwheel sticks remain single-column during gusts.
