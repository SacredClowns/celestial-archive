# ENOCHIAN: THE CELESTIAL ARCHIVE
## Opening Experience & UI Concept
### v1.0 — April 15, 2026

> *This document defines the first 3–5 minutes of the Celestial Archive. It is not code. It is the blueprint for the moment the door opens. Everything the seeker will feel about this app begins here.*

---

# ═══════════════════════════════════════════════
# 1. EMOTIONAL INTENT
# ═══════════════════════════════════════════════

## The First 10 Seconds

**Feeling**: *I've found something.*

The screen is dark. Not black — deep. The color of old ink on aged paper (`#080604`). A single point of gold light appears, very small, at the center. It does not flash. It does not pulse. It grows — slowly, like a candle being lit in a room you have just entered. The gold resolves into a geometric form: the heptagonal outline of the Sigillum Dei Aemeth, rendered in a single thin stroke.

The user feels: stillness. Attention. The app is not shouting. It is waiting.

**What must NOT happen in the first 10 seconds**: No loading spinner. No splash logo. No "Welcome to..." text. No progress bar. No signup prompt. No sound. Just the slow emergence of light from dark. The app earns the user's attention by not demanding it.

## The First 30 Seconds

**Feeling**: *This is not an ordinary app.*

The geometric form completes. Faint gold lines extend outward from it — concentric circles, faint radials, the suggestion of an armillary sphere or celestial map. They are not fully rendered. They are ghosts of structure, visible the way you might see the faint pencil guidelines beneath an illuminated manuscript.

The title appears: **ENOCHIAN** in Cinzel Decorative, then beneath it, smaller, in Cinzel: **THE CELESTIAL ARCHIVE**. No tagline. No subtitle. The words appear as if being inscribed, left to right, character by character, at the pace of careful handwriting. Duration: approximately 2.5 seconds for the full title.

Below the title, after a beat of 1.5 seconds, a single line of body text in Cormorant Garamond, Gold Pale (`#f5e8c0`):

*"A structured exploration of the language, cosmology, and intelligence recorded by John Dee and Edward Kelley — and interpreted by every tradition since."*

The user feels: respect. This app has weight. It has patience. It knows what it is.

## The First 3 Minutes

**Feeling**: *I'm inside something. I can see the shape of it, even though I can't see everything yet.*

The user has moved through the Arrival Sequence (detailed in Section 2), encountered the Opening Text, and arrived at the Home Screen. They can see the structure of the Archive — the 10 pillars, the progression path, the search, the journal. Some areas are open. Some are dimmed but visible. The Celestial Map shows distant shapes in the background.

The emotional arc across these 3 minutes:

| Time | Feeling | What the user is doing |
|------|---------|----------------------|
| 0:00–0:10 | Stillness. Attention. | Watching the light emerge |
| 0:10–0:30 | Recognition. This is different. | Reading the title. Absorbing the tone. |
| 0:30–1:00 | Arrival. Orientation. | Reading the Opening Text. Understanding what this is. |
| 1:00–1:30 | Curiosity. Where do I begin? | Encountering the Home Screen. Seeing the pillars. |
| 1:30–2:30 | Exploration. Discovery. | Touching the first interactive elements. Feeling the response. |
| 2:30–3:00 | Trust. This is worth my time. | Finding the first lesson, or entering the Archive, or touching the Map. |

The critical beat is the transition from curiosity to trust. The user must feel, by minute 3, that this app was made with extraordinary care — and that their intelligence is being respected.

## After Completing Lesson 1

**Feeling**: *I understand what this place is. I don't understand what the Enochian system is — not yet. But I understand the Archive. I trust it. And I want to go deeper.*

The seeker has learned that the Archive marks the difference between evidence and interpretation. They have encountered the epistemic badges. They have held multiple lenses. They have written in their journal (or been invited to). They feel oriented, curious, and — crucially — not told what to believe.

The emotional destination is not excitement. It is grounded fascination.

---

# ═══════════════════════════════════════════════
# 2. ARRIVAL SEQUENCE
# ═══════════════════════════════════════════════

The following is the exact sequence from app launch to the Home Screen. Each step is described cinematically and then specified in design terms.

## Step 1: The Threshold (0:00–0:04)

**What happens**: The screen is `#080604` (Ink). Total stillness. No elements visible. After 0.5 seconds, a single gold point appears at screen center. It expands outward as a thin geometric line — tracing the heptagonal perimeter of the Sigillum Dei Aemeth. The line draws itself as if inscribed by an invisible compass.

**Design spec**:
- Background: solid `#080604`
- Animation: SVG path animation, 1px gold (`#c9a84c`) stroke, no fill
- Duration: 3.5 seconds for the full heptagonal outline
- Easing: ease-in-out, slightly slower at vertices (the compass pauses as it changes direction)
- No other elements on screen

**Purpose**: The Sigillum is the system's visual signature. By drawing it first, the app establishes its geometric DNA before any text appears. The user does not need to know what it is. They need to feel that it is precise, intentional, and old.

## Step 2: The Architecture Emerges (0:04–0:08)

**What happens**: From the completed heptagon, fainter gold lines extend outward — concentric circles (three rings), radial lines at cardinal and intercardinal points, and a suggestion of latitude/longitude curves as if the geometry is wrapping around a sphere. These lines are drawn at 30% opacity (`#c9a84c` at 0.3 alpha), giving the impression of underlying structure visible through the surface.

Simultaneously, a very faint starfield begins to resolve in the background — static gold dots at 5–10% opacity, scattered irregularly across the `#080604` field. They do not twinkle yet.

**Design spec**:
- Concentric circles: 3 rings, SVG, 0.5px stroke, `#c9a84c` at 0.3 alpha
- Radial lines: 8 lines, same weight and opacity
- Starfield: 80–120 dots, sizes 0.5–1.5px, opacity 5–10%, placed pseudo-randomly
- Duration: 3.5 seconds, overlapping with the end of Step 1
- Easing: ease-in, gentle fade

**Purpose**: The user is seeing the skeleton of something larger. The geometry is a celestial map in embryo. It says: *there is a structure here, and you will learn to read it.*

## Step 3: The Title (0:08–0:12)

**What happens**: The geometric construction fades to approximately 15% opacity and recedes slightly (very subtle scale reduction, 0.98). In the space it opens, the title appears:

**ENOCHIAN**
*THE CELESTIAL ARCHIVE*

The title inscribes itself character by character, left to right, in Cinzel Decorative (hero weight). The subtitle appears 0.8 seconds after the title completes, in Cinzel (heading weight), smaller.

**Design spec**:
- "ENOCHIAN": Cinzel Decorative, 48px (mobile) / 64px (desktop), weight 900, `#c9a84c`, letter-spacing 0.12em
- "THE CELESTIAL ARCHIVE": Cinzel, 18px (mobile) / 24px (desktop), weight 600, `#e8cc7d`, letter-spacing 0.2em
- Inscription animation: Each character fades in from 0 to full opacity over 80ms, staggered 60ms apart
- Vertical position: centered, with the geometric construction visible behind at low opacity
- Total title duration: ~2.5 seconds

**Purpose**: The name arrives with weight. The inscription effect connects the text to the hand-drawn quality of the visual language. The letter-spacing and font choice immediately signal: this is not a tech product. This is a scholarly, beautiful, historical object.

## Step 4: The Descriptor (0:12–0:15)

**What happens**: Below the title, after a 1.5-second pause, a single line appears:

*"A structured exploration of the language, cosmology, and intelligence recorded by John Dee and Edward Kelley — and interpreted by every tradition since."*

This line fades in as a whole (no per-character animation), in Cormorant Garamond, italicized.

**Design spec**:
- Font: Cormorant Garamond, 16px (mobile) / 18px (desktop), italic, weight 400, `#f5e8c0`
- Fade in duration: 800ms, ease-in
- Max width: 600px, centered
- Line-height: 1.8

**Purpose**: This is the first content the user reads. It is precise, grounded, and sets expectations: this is about a specific historical subject, viewed through multiple traditions. No hype. No mystery-for-mystery's-sake. Just an honest description of what is inside.

## Step 5: The Entry (0:15–0:20)

**What happens**: Below the descriptor, after a 2-second pause, a single interactive element appears: a gold-bordered rectangle with the text **"Enter the Archive"** in Cinzel. The button does not bounce, glow, or pulse. It is there, quietly, waiting.

For users who prefer to wait, the background starfield has now begun its slow twinkle — each dot on its own 4–8 second cycle, oscillating between 5% and 15% opacity. The geometric construction behind the title breathes very slightly (0.5% scale oscillation on a 6-second cycle). The screen is alive but still.

**Design spec**:
- Button: `border: 1px solid #c9a84c`, background transparent, text `#c9a84c` Cinzel 16px weight 600, padding 14px 40px, border-radius 2px
- Hover state: border transitions to `#e8cc7d`, text to `#e8cc7d`, very faint gold glow (`box-shadow: 0 0 20px rgba(201,168,76,0.1)`), 200ms transition
- Active state: background fills to `rgba(201,168,76,0.08)`
- Position: centered, 40px below descriptor
- Starfield twinkle: per-dot sinusoidal opacity animation, staggered random start times
- Geometric breathing: transform: scale() oscillating between 1.0 and 1.005

**Purpose**: The button is the threshold. Its restraint is the point. It does not beg to be clicked. It offers. The faint ambient animation around it creates the feeling of a space that is alive — an archive that exists whether or not you enter it.

## Step 6: The Transition (on click — 2 seconds)

**What happens**: When the user taps "Enter the Archive," the geometric construction at center expands smoothly to fill the viewport — the concentric circles grow outward, the radial lines extend to the edges. The title and descriptor fade out. The starfield brightens slightly. For a single moment (approximately 400ms), the user is inside the geometry — surrounded by the expanding lines of the celestial map.

Then the lines fade, and the Home Screen resolves — its elements appearing from behind the fading geometry, as if they were always there beneath it.

**Design spec**:
- Geometric expansion: scale from 1.0 to approximately 8.0, with elements fading out as they pass beyond viewport edges, 1200ms, ease-in-out
- Title/descriptor fade: 400ms, beginning at the same moment
- Starfield: transitions from 5–15% opacity to 8–20% opacity (slightly brighter on the Home Screen)
- Home Screen elements: fade in from 0 to 1 opacity, staggered from center outward, 600ms, beginning at 1200ms
- Total transition: approximately 2 seconds

**Purpose**: The transition is a spatial metaphor. The user does not "navigate to" the Home Screen. They pass *through* the geometry into the space beyond it. The Sigillum — the first thing they saw — was the door.

---

# ═══════════════════════════════════════════════
# 3. HOME SCREEN CONCEPT
# ═══════════════════════════════════════════════

## Design Philosophy

The Home Screen is not a dashboard. It is the central chamber of the Archive — a room with many doors. The user should feel they are standing in a space, not looking at a menu.

## Layout — Desktop (1200px+)

```
┌─────────────────────────────────────────────────────────────────┐
│  [≡ Nav]          CELESTIAL ARCHIVE          [🔍] [📓] [⚙]    │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                                                           │  │
│  │              THE OBSERVATORY (Three.js canvas)            │  │
│  │           Slowly rotating celestial structure             │  │
│  │          Starfield background, golden geometry            │  │
│  │               Faint pillar indicators                     │  │
│  │                                                           │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│   YOUR PATH                                    THE ARCHIVE      │
│  ┌──────────────────────────┐  ┌──────────────────────────────┐ │
│  │  Stage 1: Seeker         │  │  ┌────┐ ┌────┐ ┌────┐       │ │
│  │  ▰▰▱▱▱▱▱ Lesson 1.1     │  │  │ 📚 │ │ 🕐 │ │ 🗺  │       │ │
│  │  Next: The Lost Language │  │  │Arch-│ │Time│ │Map │       │ │
│  │  [Continue →]            │  │  │ive  │ │line│ │    │       │ │
│  └──────────────────────────┘  │  └────┘ └────┘ └────┘       │ │
│                                │  ┌────┐ ┌────┐ ┌────┐       │ │
│   RECENT                       │  │ 🔤 │ │ 🎓 │ │ 🌀 │       │ │
│  ┌──────────────────────────┐  │  │Lang│ │Init│ │Aeth│       │ │
│  │  (empty on first visit)  │  │  │uage│ │iat.│ │yr  │       │ │
│  │  "Your explorations will │  │  └────┘ └────┘ └────┘       │ │
│  │   appear here."          │  │  ┌────┐ ┌────┐ ┌────┐ ┌───┐│ │
│  └──────────────────────────┘  │  │ 🔭 │ │ 🎬 │ │ 🔬 │ │ ◌ ││ │
│                                │  │Obs.│ │Doc.│ │Res.│ │Lab││ │
│   JOURNAL                      │  │    │ │    │ │    │ │   ││ │
│  ┌──────────────────────────┐  │  └────┘ └────┘ └────┘ └───┘│ │
│  │  ✒ "Nothing written yet. │  └──────────────────────────────┘ │
│  │  The page is ready when  │                                   │
│  │  you are."               │                                   │
│  └──────────────────────────┘                                   │
│                                                                 │
│  ─── ◆ ─────────────────────────────────────────────────────── │
│  SEARCH THE ARCHIVE...                                          │
└─────────────────────────────────────────────────────────────────┘
```

## Layout — Mobile (< 768px)

```
┌─────────────────────────┐
│  ≡  CELESTIAL ARCHIVE 🔍│
├─────────────────────────┤
│                         │
│   OBSERVATORY (canvas)  │
│   (compressed height)   │
│                         │
├─────────────────────────┤
│  YOUR PATH              │
│  Stage 1: Seeker        │
│  Next: The Lost Language │
│  [Continue →]           │
├─────────────────────────┤
│  PILLARS (horizontal    │
│  scroll)                │
│  [📚][🕐][🗺][🔤]...    │
├─────────────────────────┤
│  JOURNAL                │
│  ✒ "The page is ready   │
│  when you are."         │
├─────────────────────────┤
│                         │
│  ◆ Search the Archive.. │
│                         │
├─────────────────────────┤
│  [📚] [🗺] [🎓] [📓] [⚙]│
│  Archive Map Path Jrnl  │
└─────────────────────────┘
```

## Major Sections

### The Observatory (top)
A Three.js canvas (detailed in Section 4). On first visit, it shows the geometric seed — concentric rings, faint Watchtower outlines, distant stars. It is not interactive on first visit beyond gentle parallax response to scroll or device tilt. As the user progresses, the Observatory evolves — structures appear, stars align, sealed chambers open.

### Your Path (left, or second on mobile)
The linear curriculum tracker. Shows current stage, current lesson, and a minimal progress indicator. On first visit: "Stage 1: Seeker — Lesson 1.1: The Lost Language." The progress indicator is not a percentage or a level number. It is a series of small gold marks, one per completed lesson, like notches on a cartographer's ruler.

### The Archive Grid (right, or scrollable on mobile)
The 10 pillars displayed as cards in a grid. Each card has an icon, a name, and a one-line description. Cards are in two visual states:

**Open (accessible)**:
- Gold border, full opacity icon and text
- Subtle hover glow
- On first visit, these are open: Archive, Timeline, Celestial Map (basic view)

**Gated (visible but not yet accessible)**:
- `#7a6230` (Gold Dim) border, 40% opacity icon and text
- No hover effect
- On hover/tap: a quiet tooltip: "Available after [condition]"
- On first visit, gated: Language Chamber, Initiation Path (unlocks after Lesson 1.1 completion), Aethyr Journey, Intelligence Observatory, Documentary Mode, Research Lens, The Labyrinth

**The Labyrinth** has a third state — **Hidden**. Its card slot exists in the grid but is visually empty. No name, no icon. Just a faintly darker rectangle. It becomes visible only when the user has discovered their first hidden fragment (earliest: during Stage 2).

### Recent Activity
Empty on first visit. Shows the message: "Your explorations will appear here." As the user browses, it populates with the last 3–5 visited pages, creating a personal trail through the Archive.

### Journal
A compact entry point to the Journal system. Shows the quill icon and the empty-state message: "Nothing written yet. The page is ready when you are." After first entry, shows a preview of the most recent journal entry.

### Search
A persistent gold search bar at the bottom of the Home Screen: "Search the Archive..." Opens to a full search interface powered by Meilisearch. Available from day one — the seeker can always find what they are looking for.

## Hierarchy and Visual Weight

The visual hierarchy on the Home Screen, from heaviest to lightest:

1. **The Observatory** — largest element, most visual gravity, draws the eye first
2. **Your Path** — the primary call to action, the most accessible next step
3. **The Archive Grid** — the full scope of the app, visible but patient
4. **Journal** — present, inviting, not demanding
5. **Search** — always available, never intrusive

## How Mystery Is Preserved

The Home Screen shows the *shape* of the Archive without revealing its contents. The gated pillars are visible — you can see that Language Chamber, Aethyr Journey, and the Intelligence Observatory exist — but you cannot enter them yet. The Labyrinth is invisible. The Observatory contains shapes that are not yet legible.

The effect is that of standing in a library and seeing doors you cannot yet open, shelves you cannot yet reach, and a celestial instrument you do not yet know how to read. Everything is present. Nothing is hidden (except the Labyrinth). But access is earned through engagement, not through payment or time gates.

---

# ═══════════════════════════════════════════════
# 4. THREE.JS OBSERVATORY CONCEPT
# ═══════════════════════════════════════════════

## The Vision

The Observatory is the living center of the Celestial Archive — a 3D celestial instrument that reflects the user's journey through the system. On first visit, it is minimal: a geometric seed in a field of stars. As the user progresses, it grows — structures materialize, constellations align, sealed chambers reveal their contents.

It is not a game environment. It is not a navigable world. It is a *contemplative instrument* — something to be observed, gently interacted with, and watched as it evolves.

## Scene Composition — First Visit

### Layer 1: The Starfield (background)
A sphere of 400–600 gold-white points surrounding the camera at a large radius. Points vary in size (0.3–1.5 units) and brightness (5–20% opacity). They twinkle on individual cycles (4–10 seconds per star, sinusoidal opacity oscillation). The starfield rotates very slowly — approximately 1 full rotation per 10 minutes. The user should not consciously perceive the rotation, but returning to the Home Screen after 5 minutes should show a subtly different sky.

**Technical**: Three.js Points geometry with custom shader for per-point opacity animation. Low polygon count. Minimal GPU impact.

### Layer 2: The Geometric Core (midground)
At the center of the scene: the heptagonal form of the Sigillum Dei Aemeth, rendered as a flat 2D geometric construction floating in 3D space. Gold wireframe (`#c9a84c`), 1px line weight. The Sigillum rotates very slowly on its vertical axis — approximately 1 rotation per 3 minutes.

Around it, three concentric transparent rings at slight angles to each other — suggesting an armillary sphere or orrery. The rings rotate at different speeds (one per 2 minutes, one per 5 minutes, one per 8 minutes). They are rendered as thin gold lines at 20–30% opacity.

**Technical**: Line geometry for the Sigillum and rings. No mesh, no fill, no lighting required. Extremely lightweight.

### Layer 3: The Watchtower Ghosts (far midground)
At the four cardinal points, barely visible at 8–12% opacity: the outlines of four rectangular structures — the Watchtower tablets. On first visit, they are just faint rectangles. As the user progresses through the curriculum, they fill in — grid lines appear, letters become visible, elemental colors emerge.

**Technical**: PlaneGeometry with semi-transparent textures. On first visit, a single texture per Watchtower showing only the outer border. Textures are swapped as the user progresses.

### Layer 4: The Aethyr Rings (far background)
Barely visible: a series of 30 concentric circles at varying distances, suggesting the Aethyr layers. On first visit, they are nearly invisible — ghostly lines at 3–5% opacity. As the user enters the Aethyr Journey, individual rings brighten and become labeled.

**Technical**: Ring geometry (THREE.RingGeometry), wireframe, extremely low opacity. 30 rings total, but rendered as a single instanced mesh for performance.

### Layer 5: The Sealed Doors
At specific positions in the scene, small geometric markers indicate areas that are not yet accessible: the Intelligence Observatory (a lens-shaped form), the Documentary (a frame shape), the Labyrinth (invisible until discovered). These markers are dim gold at 5% opacity on first visit.

**Technical**: Simple geometric primitives. No interaction on first visit.

## Interaction — First Visit

On first visit, interaction is minimal and contemplative:

- **Scroll/drag**: The camera orbits very slightly around the central geometry (maximum ±15 degrees from center). This gives a sense of parallax and dimensionality without letting the user "fly around."
- **Device tilt (mobile)**: Gentle parallax response to accelerometer, mimicking the camera orbit.
- **Touch/click on the Sigillum**: The Sigillum pulses once with a brief gold glow and returns to normal. No other response. (This is a seed: later, the Sigillum becomes a navigation element.)
- **No other clickable elements** on first visit. The Observatory is for observation, not navigation — yet.

## Evolution Across Progression

| Stage | What Changes |
|-------|-------------|
| **Seeker (Lessons 1–3)** | Watchtower ghosts become slightly more visible. The first Aethyr ring (TEX, 30th) brightens. |
| **Student (Lessons 4–8)** | Watchtower grid lines appear. Alphabet letters begin to populate the grid. The Sigillum's inner rings become visible. |
| **Observer** | The Sigillum becomes interactive — tapping it opens a radial menu linking to the 10 pillars. Source tradition colors appear as tinted lights. |
| **Interpreter** | Multiple Aethyr rings are visible. The Multi-Lens Viewer concept is reflected in the Observatory: tapping different rings shows different layers of the scene. |
| **Cartographer** | The full structure is visible: Watchtowers populated, Aethyr rings named, connections between pillars drawn as faint gold threads. The user can rotate freely. |
| **Adept** | The scene gains depth: the Abyss (ZAX) ring glows faintly with blood-red (`#5c1a10`). The Sealed Doors have opened. The Intelligence Observatory lens is now present and interactive. |
| **Archivist** | The scene is complete. The Labyrinth is visible. The user can explore freely. A single new element appears: a small, unlabeled point of light beyond the outermost Aethyr ring — the question mark at the edge of the map. |

## Performance Considerations

| Concern | Strategy |
|---------|----------|
| **Mobile GPU** | First-visit scene uses <1,000 vertices total. No mesh rendering, only lines and points. Target: 60fps on 3-year-old phones. |
| **Loading time** | Three.js core (~150KB gzip). Scene data is procedural (generated from parameters, not loaded as models). No textures on first visit. Total additional load: <50KB. |
| **Battery** | RequestAnimationFrame pauses when tab is not visible. Animation cycles are long (minutes, not milliseconds), minimizing GPU wake frequency. |
| **Progressive enhancement** | If WebGL is not available, the Observatory falls back to a static SVG of the Sigillum geometry with CSS animation for the rotation. The experience degrades gracefully. |
| **Later stages** | As the scene grows in complexity (Cartographer and beyond), implement Level of Detail (LOD): distant elements rendered as points, near elements rendered as geometry. Texture loading is deferred and progressive. |

## MVP vs Future

| Element | Phase |
|---------|-------|
| Starfield + Sigillum wireframe + slow rotation | **MVP** |
| Three concentric rings (armillary suggestion) | **MVP** |
| Watchtower ghost outlines (static, non-interactive) | **MVP** |
| Gentle parallax/orbit interaction | **MVP** |
| Aethyr rings (30 rings, very faint) | **Phase 2** |
| Watchtower grid population (progressive) | **Phase 2** |
| Sigillum as navigation hub | **Phase 2** |
| Sealed Door markers | **Phase 2** |
| Full evolution system tied to progression | **Phase 3** |
| Free camera orbit (Cartographer+) | **Phase 3** |
| Labyrinth discovery | **Phase 3** |
| Interactive Aethyr ring exploration | **Phase 4** |

---

# ═══════════════════════════════════════════════
# 5. UI LANGUAGE
# ═══════════════════════════════════════════════

## Typography

Follows VISUAL_DIRECTION.md exactly. Repeated here for implementation reference:

| Role | Font | Size (Desktop) | Size (Mobile) | Weight | Color |
|------|------|----------------|---------------|--------|-------|
| App title | Cinzel Decorative | 64px | 48px | 900 | `#c9a84c` |
| Section headers | Cinzel | 28px | 24px | 600 | `#c9a84c` |
| Card titles | Cinzel | 20px | 18px | 500 | `#e8cc7d` |
| Body text | Cormorant Garamond | 18px | 16px | 400 | `#f5e8c0` |
| Metadata / labels | Cormorant Garamond | 14px | 13px | 400 | `#7a6230` |
| Enochian display | Custom Enochian font | varies | varies | 400 | `#c9a84c` |
| Data / coordinates | JetBrains Mono | 14px | 12px | 400 | `#8a7a60` |

**Line-height**: 1.8–1.9 for body, 1.4 for headings, 1.2 for labels.
**Max content width**: 720px (body text), 960px (content area with sidebar), full-width for maps and canvases.
**Letter-spacing**: 0.02em for body, 0.12em for display titles, 0.2em for subtitle/labels.

## Spacing

The spacing system is based on an 8px grid with a golden-ratio bias for larger gaps:

| Token | Value | Usage |
|-------|-------|-------|
| `space-xs` | 4px | Inline spacing, badge padding |
| `space-sm` | 8px | Between related elements |
| `space-md` | 16px | Standard component padding |
| `space-lg` | 24px | Section spacing |
| `space-xl` | 40px | Major section breaks |
| `space-2xl` | 64px | Page-level breathing room |
| `space-3xl` | 104px | Hero spacing (golden ratio × 64) |

**Principle**: Space is generous. The app breathes. Content is never cramped. The dark background is not wasted space — it is atmosphere.

## Color Application

### Backgrounds (layered depth)

| Layer | Color | Usage |
|-------|-------|-------|
| Deepest | `#080604` (Ink) | App background, Observatory canvas, void |
| Primary | `#0d0a05` (Deep) | Content area background, cards at rest |
| Elevated | `#140f07` (Parchment Dark) | Active cards, expanded panels, modals |
| Floating | `#1a1408` | Tooltips, dropdown menus, high-elevation surfaces |

### Text

| Role | Color |
|------|-------|
| Headings | `#c9a84c` (Gold) |
| Body text | `#f5e8c0` (Gold Pale) |
| Secondary text | `#e8cc7d` (Gold Light) |
| Disabled / metadata | `#7a6230` (Gold Dim) |
| Danger / caution | `#a06820` (Amber) |

### Interactive elements

| State | Border | Text | Background |
|-------|--------|------|------------|
| Default | `#7a6230` | `#c9a84c` | transparent |
| Hover | `#c9a84c` | `#e8cc7d` | `rgba(201,168,76,0.05)` |
| Active / pressed | `#e8cc7d` | `#f5e8c0` | `rgba(201,168,76,0.10)` |
| Focused | `#c9a84c` + 1px offset glow | `#c9a84c` | transparent |
| Disabled | `#3a3020` | `#3a3020` | transparent |

## Texture

Texture is used sparingly and at very low opacity:

- **Parchment noise**: A subtle paper-grain overlay at 2–4% opacity on content cards. Applied as a CSS background-image (a tileable 512×512 noise texture). Not visible on glass/retina displays at distance — only perceptible up close, like the grain of real paper.
- **Film grain**: A very subtle animated noise overlay on full-screen views (Observatory, Documentary, Aethyr Journey) at 3–5% opacity. CSS or SVG filter.
- **Vignette**: A CSS radial-gradient darkening on full-screen views, drawing focus to center. Approximately 20% darker at edges.

**Rule**: If the user consciously notices the texture, it is too heavy. Texture is felt, not seen.

## Icon Style

Hand-drawn quality, single-stroke gold linework. Not pixel-perfect — slightly organic, as if drawn with a quill. Consistent across the app.

| Property | Value |
|----------|-------|
| Stroke weight | 1.5px (desktop), 1.5px (mobile) |
| Color | `#c9a84c` (default), `#e8cc7d` (hover), `#7a6230` (disabled) |
| Style | Rounded line caps, no fill |
| Size | 24×24px (navigation), 48×48px (pillar cards), 16×16px (inline) |
| Format | SVG, hand-adjusted paths (not icon library defaults) |

## Motion

All motion follows the principles in VISUAL_DIRECTION.md:

| Property | Value | Usage |
|----------|-------|-------|
| Standard transition | 200ms ease-in-out | Hover states, opacity changes |
| Content transition | 400–600ms ease-in-out | Page transitions, section reveals |
| Inscription animation | 60ms per character stagger | Text reveal, important titles |
| Unlock moment | 1200ms | Sigil appears, glows, settles |
| Long ambient cycle | 4–10s sinusoidal | Starfield twinkle, breathing effects |
| Parallax response | 16ms (RAF locked) | Camera orbit, scroll parallax |

**Easing**: Always `ease-in-out` or custom cubic-bezier approximating gravitational motion. Never `bounce`, `spring`, or `elastic`. Motion is weighty, not playful.

## Transition Between Pages

Page transitions use a consistent pattern:

1. Current content fades down (opacity 1→0, translateY 0→−20px, 300ms)
2. Brief pause (100ms) — the dark background is visible alone
3. New content rises from below (opacity 0→1, translateY 20px→0, 400ms)

The effect evokes turning a page or descending a stair: the old view recedes upward, the new view emerges from below. Always downward/inward.

## Epistemic Badges — Visual Design

Badges appear as small colored circles with their symbol, inline with text or in the top-right corner of content cards.

| Badge | Symbol | Color | Size | Rendering |
|-------|--------|-------|------|-----------|
| Historical Evidence | ◆ | `#c9a84c` | 16px circle | Filled diamond, gold background |
| Strong Scholarly Consensus | ◇ | `#a8b0b8` | 16px circle | Open diamond, silver background |
| Tradition | ○ | `#b87340` | 16px circle | Open circle, copper background |
| Analysis | △ | `#8a7a60` | 16px circle | Open triangle, bronze background |
| Parallel | ◎ | `#4a5a8a` | 16px circle | Bullseye, indigo background |
| Speculative | ~ | `#605848` | 16px circle | Tilde, muted gray background |
| Disputed | ? | `#a06820` | 16px circle | Question mark, amber background |
| Caution | ⚠ | `#7a3510` | 16px circle | Warning, ember background |

**Inline behavior**: Badge appears to the right of the tagged claim. Hover/tap reveals a tooltip: the badge label + source attribution.

**Page-level behavior**: Badge appears in the top-right corner of the content card, next to the page title. Multiple badges can stack horizontally.

**First-visit tutorial**: The Discernment Box in Lesson 1.1 introduces the badges with a brief visual guide. This is the only time badges are explained — afterward, they are a natural part of the environment.

## Locked Content Appearance

Content that exists but is not yet accessible appears in a specific visual state:

- **Text**: `#7a6230` (Gold Dim), 40% opacity
- **Border**: `#3a3020` (Ash), dashed
- **Icon**: Same as default but at 30% opacity
- **Overlay**: None. No padlock icon, no "🔒" emoji, no "LOCKED" label.
- **Hover tooltip**: "This section becomes available after [specific condition]." Example: "Available after completing Lesson 1.3."
- **No price tag, no upgrade prompt, no paywall language.** Locked content is future content. It is coming. Not gated.

## Special Content Blocks

### "Notice" Block
Appears inline within lesson text when the app invites self-observation.

```
┌─ ◈ NOTICE ──────────────────────────────────────┐
│                                                   │
│  [Contemplative prompt text in Cormorant          │
│   Garamond italic, Gold Light (#e8cc7d)]          │
│                                                   │
└───────────────────────────────────────────────────┘
```
- Border: 1px solid `#7a6230`, left border 3px solid `#c9a84c`
- Background: `rgba(201,168,76,0.03)`
- Icon: ◈ in Gold, 14px

### "Discernment" Block
Appears when the app explicitly teaches critical reading skills.

```
┌─ ◆◇○ DISCERNMENT PRACTICE ──────────────────────┐
│                                                   │
│  [Content in Cormorant Garamond,                  │
│   Gold Pale (#f5e8c0)]                            │
│                                                   │
│  ┌─────────────────────────────────────────────┐  │
│  │  [Badge legend or comparison exercise]      │  │
│  └─────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────┘
```
- Border: 1px solid `#c9a84c`
- Background: `rgba(201,168,76,0.04)`
- Header: Cinzel 16px, Gold, with three example badges inline

### "Multiple Interpretations" Block
Appears when the app presents competing readings of the same material.

```
┌─ MULTIPLE READINGS ──────────────────────────────┐
│                                                   │
│  ◆ Historical    ○ Golden Dawn    △ Psychological │
│  ─────────────   ─────────────   ──────────────  │
│  [paragraph]     [paragraph]     [paragraph]     │
│                                                   │
│  "These readings cannot all be true.              │
│   The evidence does not clearly favor one."       │
└───────────────────────────────────────────────────┘
```
- Border: 1px solid `#8a7a60` (Bronze)
- Background: `rgba(138,122,96,0.03)`
- Tab-style lens selectors at top (mobile: tabs; desktop: columns)
- Closing note in Cormorant Garamond italic

---

# ═══════════════════════════════════════════════
# 6. FIRST INTERACTION DESIGN
# ═══════════════════════════════════════════════

The first three interactions the user performs inside the Celestial Archive teach the app's core principles without ever feeling like a tutorial.

## Interaction 1: Enter the Archive

**What it is**: Tapping the "Enter the Archive" button on the Arrival screen.

**What it teaches**: *Agency. This is your choice.*

The button sits quietly. It does not pulse, bounce, or auto-advance. The user chooses when to enter. This is the first exercise in restraint — the app will not drag you forward. It waits.

**What happens**: The geometric expansion transition (Section 2, Step 6). The user passes through the Sigillum into the Home Screen.

**Emotional outcome**: Arrival. Ownership. "I chose to enter. This space acknowledged my choice."

## Interaction 2: Touch the Observatory

**What it is**: On the Home Screen, the user's first scroll or drag touches the Three.js canvas, causing a gentle parallax shift.

**What it teaches**: *Observation. Look before you act.*

The Observatory responds to touch — but not dramatically. The camera shifts a few degrees. The starfield moves. The Sigillum rotates slightly. The user learns: this space responds to attention, not to force. There is nothing to "do" in the Observatory yet. There is something to see.

On the Sigillum: if the user taps it directly, it pulses once — a brief gold glow, 400ms — and returns to rest. No tooltip, no label, no explanation. Just a response. A signal: *this object is significant. You will understand it later.*

**Emotional outcome**: Curiosity tempered by patience. "There's something here. I don't understand it yet. That's fine."

## Interaction 3: Open the First Lesson

**What it is**: The user taps "Continue →" in the Your Path section, or taps the Initiation Path card in the Archive Grid. Either action opens Lesson 1.1: The Lost Language.

**What it teaches**: *Exploration. Begin where your attention is drawn.*

Two paths to the same destination are offered simultaneously. The user can follow the suggested path (Your Path → Continue) or explore the grid and find the lesson themselves. Neither is marked as the "right" way. This is the first experience of the Archive's navigation philosophy: The Path, The Map, and The Archive coexist. You choose how you move.

**The transition**: Content fades down, brief dark pause, lesson content rises from below. The page header inscribes itself. The first epistemic badge appears in the top-right corner of the lesson card.

**What the user encounters next**: The Opening Sequence of Lesson 1.1 — the cinematic introduction to the lost language tradition. From here, the lesson itself teaches discernment, multiple lenses, and the habit of questioning.

**Emotional outcome**: Trust and engagement. "This app knows what it's doing. And it trusts me to find my own way."

## What the First Three Interactions Teach (Summary)

| Interaction | Principle Taught | Without Ever Saying |
|-------------|-----------------|---------------------|
| Enter the Archive | Agency and restraint | "You are in control" |
| Touch the Observatory | Observation before action | "Look before you interpret" |
| Open the First Lesson | Multiple paths to understanding | "There is no single correct route" |

These three interactions encode the app's philosophy: *choose, observe, explore*. By the time the user begins reading Lesson 1.1, they have already practiced the Archive's core values — without a single tutorial screen, tooltip walkthrough, or "swipe to continue" prompt.

---

# ═══════════════════════════════════════════════
# 7. SOUND AND ATMOSPHERE
# ═══════════════════════════════════════════════

## Guiding Principle

Sound in the Celestial Archive is architectural, not decorative. It creates the sense of being in a space — not of using an app. The default is silence. Sound is added to deepen presence, never to demand attention.

**Audio is always optional.** A mute toggle is accessible from every screen. The experience is fully functional without sound. Sound enhances but never carries information that the visual layer does not also communicate.

## Ambient Layers

Each major section of the app has its own ambient identity — a subtle sonic environment that makes each area feel like a distinct room in the same building.

### The Home Screen / Observatory
- **Layer 1**: Very low room tone — the sound of a large, quiet, enclosed space. Not reverberant. Not echoey. The sound of air in a library after hours. Barely audible.
- **Layer 2**: Occasional distant sound — a clock mechanism ticking once every 8–12 seconds (irregularly spaced, not metronome). This is the Archive breathing.
- **Volume**: -30dB below comfortable listening level. If the user has to strain to hear it, it is correct.

### Lesson Pages (The Chamber)
- **Layer 1**: Near-silence. The faintest possible room tone — warmer and closer than the Home Screen, as if the room is smaller.
- **No ambient sounds** during reading. The content carries itself. The silence is intentional — it creates the conditions for contemplation.

### The Celestial Map
- **Layer 1**: A low harmonic drone — a single sustained tone that shifts very slowly in pitch (one semitone per 30 seconds). This is the sound of cosmic structure.
- **Layer 2**: Crystalline high tones on interaction — when the user touches a Watchtower or Aethyr ring, a clear bell-like tone sounds briefly. Each Watchtower has a different pitch (corresponding to its element).
- **Volume**: Slightly louder than the Home Screen ambient. Still quiet.

### The Aethyr Journey
- **Evolving ambient**: The outer Aethyrs (30–20) have warmer, earthier tones. The middle Aethyrs (19–11) introduce tension — dissonance, slight unease. The inner Aethyrs (10–1) become increasingly sparse and ethereal, approaching silence at LIL.
- **ZAX (Aethyr 10)**: Near-silence broken by low, irregular sounds that do not resolve into patterns. This is not horror. It is the sound of structure failing — of coherence on the edge of dissolution. Psychologically honest, not frightening.

## Interaction Sounds

All interaction sounds are brief, warm, and non-intrusive. They should feel like physical objects responding to touch — brass, glass, paper, stone.

| Interaction | Sound | Character | Duration |
|-------------|-------|-----------|----------|
| Button tap | Soft brass tap | A muted metallic touch, like a finger on a telescope ring | 80ms |
| Page transition | Soft paper turn | A single quiet page sound, offset slightly from the visual transition | 200ms |
| Badge hover/reveal | Quiet glass chime | A clear, high, almost subliminal tone | 120ms |
| Lesson completion | Resonant tone | A warm, sustained brass tone, like a distant bell | 800ms, gentle decay |
| Unlock event | Harmonic chord | Two or three tones sounding together, building briefly | 1200ms |
| Journal open | Quiet scratch | The sound of a pen touching paper | 100ms |
| Search | Silent | No sound. The search is a tool, not a ritual. | — |
| Error / locked content | Quiet dull tone | A muted, low tone — not harsh, not alarming. The sound of a door that does not open yet. | 200ms |
| Discovery (hidden content) | Low bell | A single, deep, reverberant bell. Not loud. The kind of sound you feel as much as hear. | 1500ms, long decay |

## Music

**There is no music.** The Celestial Archive does not use background music, score, or soundtrack.

**Exception**: The Documentary Mode (when built) may include composed ambient passages specific to each episode. These will be designed separately and treated as part of the narrative, not as background music.

**Rationale**: Music tells the user what to feel. The Archive refuses to do this. The ambient sounds create presence. The content creates meaning. The silence creates space for the user's own response.

## Emotional Sound Summary

| The app should sound like... | The app should NOT sound like... |
|-----|-----|
| A library after hours | A meditation app |
| A clock mechanism in a stone room | A new age soundscape |
| Brass and glass touched carefully | Synthesizers and pads |
| The quiet before something significant | A film trailer |
| A place that exists whether you are there or not | A space designed to make you feel something |

---

# ═══════════════════════════════════════════════
# 8. OPENING TEXT
# ═══════════════════════════════════════════════

The following is the exact text that appears when the user first enters the Celestial Archive, after passing through the Arrival Sequence and arriving at the Home Screen. It appears as a centered overlay on the Home Screen, with the Observatory visible behind it, and dismisses on scroll or tap.

---

**The text:**

> You have entered the Celestial Archive.
>
> This is a structured exploration of one of the most complex and least understood systems in the Western esoteric tradition — the Enochian system, recorded by John Dee and Edward Kelley in the 1580s.
>
> What you find here is organized, sourced, and presented through multiple lenses. Not everything is settled. Some of this material is documented history. Some is one tradition's interpretation. Some is genuinely unknown. The Archive marks the difference.
>
> There is no required path. The Archive, the Timeline, and the Celestial Map are open. Begin wherever draws your attention.

---

**Design spec**:
- Font: Cormorant Garamond, 18px (mobile) / 20px (desktop), weight 400, `#f5e8c0`
- First line ("You have entered the Celestial Archive."): Cinzel, 22px (mobile) / 26px (desktop), weight 600, `#c9a84c`
- Container: centered, max-width 560px, padding 40px, semi-transparent background `rgba(13,10,5,0.85)` (Deep at 85%), subtle gold border 1px `rgba(201,168,76,0.2)`, border-radius 4px
- Appears 1 second after the Home Screen resolves
- Fade-in: 600ms
- Dismiss: scroll past it, or tap anywhere outside the text box
- Does not appear on subsequent visits (shown once, stored in local state)

**Why this text works**: It follows the Voice Guide precisely. It is welcoming without being enthusiastic. It describes what the Archive is without selling it. It introduces the idea of multiple lenses and epistemic marking in two sentences. And it ends with an invitation, not an instruction.

---

# ═══════════════════════════════════════════════
# 9. MVP VS FUTURE
# ═══════════════════════════════════════════════

## Must Be Built Now (MVP)

These elements are required for the opening experience to work as described:

| Element | Rationale |
|---------|-----------|
| Arrival Sequence (Steps 1–6) | The first impression defines everything. Ship the full sequence. |
| SVG geometric animations | The Sigillum drawing, concentric rings, and expansion transition. These are lightweight and essential. |
| Home Screen layout (desktop + mobile) | The central chamber. Non-negotiable. |
| Three.js Observatory (MVP layer only) | Starfield + Sigillum wireframe + armillary rings + parallax interaction. No Watchtower ghosts, no Aethyr rings. |
| Pillar card grid (10 cards, open/gated states) | The user needs to see the shape of the Archive. |
| Your Path tracker | The linear curriculum must be visible and functional. |
| Journal entry point | Even if the full journal system is minimal, the quill icon and empty-state message must be present. |
| Search bar | Functional search from day one. |
| Opening Text overlay | First-visit welcome text, shown once. |
| Epistemic badge system (visual rendering) | Badges must render inline and at page level from Lesson 1.1 onward. |
| Locked content state (visual treatment) | Gated pillars must look correct — dim, visible, explained on hover. |
| Page transition animation | The fade-down/rise-up pattern. Establishes the spatial metaphor. |
| Ambient room tone (Home Screen) | Minimal audio. One looping ambient file (<100KB). |
| Interaction sounds (button, page turn, badge) | 4–5 sound files, each <20KB. |

## Should Wait (Phase 2, Weeks 5–8)

| Element | Why It Waits |
|---------|-------------|
| Watchtower ghost outlines in Observatory | Requires progression system to be functional for the reveal timing to matter |
| Aethyr ring layer in Observatory | Same — the Aethyr Journey is not in MVP |
| Observatory evolution system | Requires full progression tracking backend |
| Discovery sounds (low bell) | No hidden content exists yet in MVP |
| Sealed Door markers | Requires the features they represent to exist |
| Ambient audio for Celestial Map | The Map itself ships in MVP, but its audio layer can be added when the Map has enough content to warrant sustained exploration |
| Ambient audio for Aethyr Journey | Journey not in MVP |

## Too Ambitious for First Release (Phase 3+)

| Element | Why It's Future |
|---------|----------------|
| Full Observatory evolution (7 stages) | Requires the entire curriculum and progression system to be built |
| Free camera orbit in Observatory | Adds interaction complexity before the user has context for it |
| Interactive Sigillum as navigation hub | Elegant concept, but the Home Screen grid serves the same function in MVP |
| Composed ambient passages for Documentary Mode | Documentary Mode is not in MVP |
| ZAX ambient soundscape | Requires the Aethyr Journey to reach that point |
| Labyrinth discovery and reveal | Requires hidden content system |
| Parallax response to device accelerometer | Nice-to-have enhancement; scroll-based parallax is sufficient for MVP |

## Build Order for the Opening Experience

1. Static Home Screen layout (HTML/CSS) — the bones
2. Pillar cards, Your Path, Journal, Search — functional elements
3. Three.js Observatory canvas — starfield and Sigillum
4. Arrival Sequence animations — SVG inscription, title, transition
5. Opening Text overlay — first-visit only
6. Page transition animation — the universal movement pattern
7. Audio — ambient room tone + interaction sounds
8. Badge rendering system — inline and page-level
9. Locked content visual state — gated pillars, hover tooltips
10. Mobile responsive pass — compress Observatory, stack layout, bottom nav

---

# ═══════════════════════════════════════════════
# 10. FINAL FRAME
# ═══════════════════════════════════════════════

## The Image in the Seeker's Mind

Before Lesson 1.1 begins — after the Arrival Sequence, after the Home Screen has resolved, after the Opening Text has been read and dismissed — there is a single moment when the seeker is standing at the threshold.

The screen is dark. Deep, not black. The Observatory turns slowly above: golden lines tracing a geometry they do not yet understand, stars scattered like dust on the floor of a library that has been closed for centuries. Below the canvas, the shape of the Archive is visible — ten doors, most of them dimmed, a few glowing with quiet gold light. A journal quill waits in the corner. A search bar hums below, empty, patient.

The seeker has read the words: *"There is no required path. Begin wherever draws your attention."*

And they feel — not excitement, not anxiety, not urgency — but the particular quality of attention that comes from standing in a room that was clearly built by someone who cared deeply about what it contains.

The room is quiet. The room is beautiful. The room does not need them. But it is ready for them.

This is the final frame. The last thing they see before they choose their first step.

It should feel like this: you have descended a spiral stone staircase into a circular chamber. The shelves are full. The instruments are aligned. A celestial globe turns at the center, catching light from a source you cannot see. On the far wall, a map of something that is not Earth. And on the reading desk, a manuscript is open to the first page.

No one told you to come here. But the Archive seems to have been expecting you.

---

*This document defines the first experience of the Celestial Archive. It is a design blueprint, not an implementation spec. Every element described here should be validated against VISUAL_DIRECTION.md, CONTENT_VOICE_GUIDE.md, and EXPERIENCE_PRINCIPLES.md before entering development.*

---

**Reference Documents**:
- VISUAL_DIRECTION.md — Color, typography, spatial design, motion, moodboard
- CONTENT_VOICE_GUIDE.md — Voice, tone, vocabulary, forbidden patterns
- EXPERIENCE_PRINCIPLES.md — Equilibrium principles, discernment system, psychological safety
- PHASE_1_MASTER_BLUEPRINT.md — Architecture, pillars, progression, MVP scope
- STAGE_1_SEEKER_LESSON_1.md — The first lesson (the destination of this opening experience)
