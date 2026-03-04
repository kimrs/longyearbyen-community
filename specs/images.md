# Image Placeholders Spec

## Approach

All images in the demo are **inline SVG placeholders** — no external services, no image files. Each placeholder is a colored rectangle with a category icon and/or text label.

## SVG Placeholder Component

Create a reusable `PlaceholderImage` component:

```tsx
interface PlaceholderImageProps {
  width?: number;
  height?: number;
  label: string;
  category: string;
  className?: string;
}
```

The component renders an inline `<svg>` element with:
- A colored background (based on category)
- A centered icon (simple SVG paths, not emoji)
- A text label below the icon

## Category Colors & Icons

| Category | Background | Icon |
|----------|-----------|------|
| Kjøretøy og snøscooter | `#DBEAFE` (light blue) | Snowmobile silhouette (simple path) |
| Klær og utstyr | `#FCE7F3` (light pink) | Hanger/shirt |
| Møbler og hjem | `#FEF3C7` (light amber) | Chair/sofa |
| Elektronikk | `#E0E7FF` (light indigo) | Monitor/device |
| Våpen og sikkerhet | `#FEE2E2` (light red) | Shield |
| Sport og friluftsliv | `#D1FAE5` (light green) | Mountain/ski |
| Annet | `#F3F4F6` (light gray) | Box/package |
| Hendelser (events) | `#EDE9FE` (light purple) | Calendar |
| Hittegods (lost & found) | `#FFEDD5` (light orange) | Magnifying glass |
| Oppslagstavla (general) | `#F3F4F6` (light gray) | Pin/pushpin |
| Bruker (user avatar) | `#DBEAFE` (light blue) | Person silhouette |

## Icon Style

- Simple geometric SVG paths — no complex illustrations
- Single color (darker shade of the background)
- Centered in the SVG, roughly 40% of the total area
- Think: what you'd sketch on a whiteboard

## Sizes

- **Card thumbnail**: 80x80
- **Detail page hero**: full width, 200px height
- **User avatar**: 40x40 (circular)
- **Bot avatar**: 32x32 (circular)
- **Chat post preview**: full width, 120px height

## Example Output

A marketplace card for a snowmobile would render something like:

```
┌──────────────────────┐
│   ╱‾‾╲    ╱‾‾╲      │  light blue bg
│  ╱    ╲__╱    ╲     │
│ ╱________________╲   │  darker blue icon
│                      │
│    Snøscooter        │  dark text label
└──────────────────────┘
```

## No External Dependencies

- No image files in the repo
- No external URLs
- No emoji (they render differently across devices)
- Pure inline SVG, generated in React
