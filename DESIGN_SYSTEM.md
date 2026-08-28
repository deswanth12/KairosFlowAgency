# Kairos Flow Agency — Website Design System (2026 Edition)

> **Design Ethos**: High-authority commercial craft combining serious engineering, tactile editorial warmth, and deliberate momentum.
> **Positioning**: **Design + Engineering + AI + Growth** — Built by one focused founding team with zero junior handoffs.

---

## 1. Locked Color Palette

| Token | Hex | Role | Application |
| :--- | :--- | :--- | :--- |
| **Deep Navy** | `#0B1F33` | Primary Brand Anchor | Main headlines, primary button surfaces, footer background, hero framing |
| **Slate Blue** | `#3E5C76` | Secondary Brand Structural | Supporting headers, technical labels, structured dividers |
| **Copper** | `#B8613A` | Warm Tactile Accent | Strategic action highlights, key phrase underlines, status indicators, hover states |
| **Warm White** | `#F7F7F4` | Primary Canvas Background | Base body background, alternating section backgrounds, tactile editorial feel |
| **White** | `#FFFFFF` | Card & Interactive Surface | Elevated cards, forms, modal drawers, active pill backgrounds |
| **Main Text** | `#111827` | High-Contrast Charcoal | Headings, primary body copy, high legibility text |
| **Secondary Text** | `#5B6875` | Refined Slate | Subtitles, descriptive paragraphs, secondary metadata |
| **Border** | `#D9E0E5` | Structural Hairline Border | 1px card borders, section separators, input strokes |
| **Copper Light** | `#FBF4F0` | Subtle Accent Tint | Highlight chips, quote borders, focus rings |

---

## 2. Typography Scale & Hierarchy

```
Display / Headlines : Plus Jakarta Sans / Geist Display (-0.03em tracking, font-bold)
Body Text           : Inter / Geist Sans (line-height: 1.6, font-normal)
Technical Labels    : JetBrains Mono / Geist Mono (uppercase, tracking-wider, text-xs)
```

- **H1 (Hero)**: `text-4xl sm:text-6xl lg:text-[68px] font-extrabold tracking-tight text-[#0B1F33] leading-[1.08]`
- **H2 (Section Header)**: `text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0B1F33]`
- **H3 (Card Title)**: `text-xl sm:text-2xl font-bold text-[#0B1F33] font-display`
- **Body Large**: `text-base sm:text-xl text-[#5B6875] font-normal leading-relaxed`
- **Body Standard**: `text-sm sm:text-base text-[#5B6875] leading-relaxed`
- **Mono Micro-Label**: `text-xs font-mono uppercase tracking-widest text-[#B8613A] font-semibold`

---

## 3. Component Design Language

### Buttons
- **Primary CTA**: Deep Navy `#0B1F33` background, White text, Copper `#B8613A` arrow glyph, subtle shadow, rounded-lg (`rounded-lg px-7 py-3.5`).
- **Secondary CTA**: White `#FFFFFF` background, Deep Navy 2px border `#0B1F33`, Deep Navy text `#0B1F33`, font-mono.
- **Copper Action**: Copper `#B8613A` background, White text, hover `#A0522E`.

### Cards & Surfaces
- **Card Surface**: Pure White `#FFFFFF` with 1px `#D9E0E5` border, `rounded-2xl`, and `shadow-subtle-card`.
- **Hover State**: Elevates with `shadow-hover-card` and subtle border transition to `#3E5C76` or `#B8613A`.

### Hourglass & Flow Identity
- **Frame**: Deep Navy `#0B1F33`
- **Fluid Core**: Slate Blue `#3E5C76`
- **Kinetic Stream & Accent Particles**: Warm Copper `#B8613A`

---

## 4. Layout & Spacing Rules
- **Container Max-Width**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Section Padding**: `py-20 sm:py-28`
- **Grid Gutters**: `gap-6 sm:gap-8 lg:gap-10`
- **Editorial Whitespace**: Generous vertical rhythm without clutter or noisy animations.
