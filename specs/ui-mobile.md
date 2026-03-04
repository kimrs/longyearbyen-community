# UI & Mobile-First Design Spec

## Design Philosophy

- **Phone-first**: Designed for 375px width, scales up gracefully
- **Wireframe aesthetic**: Clean, minimal — not a polished design but clearly functional
- **Norwegian UI**: All labels, buttons, placeholder text in Norwegian (Bokmål)

## Color Palette (Wireframe)

Keep it simple — wireframe feel with subtle color accents:

- **Background**: white (`#FFFFFF`)
- **Cards**: light gray background (`#F5F5F5`)
- **Primary accent**: Arctic blue (`#2563EB`)
- **Text**: dark gray (`#1F2937`)
- **Secondary text**: medium gray (`#6B7280`)
- **Badges**:
  - Til salgs: blue
  - Ønskes kjøpt: orange
  - Gis bort: green
  - Mistet: red
  - Funnet: green
- **5-min timer**: amber/yellow accent

## Typography

- System font stack (no custom fonts for wireframe)
- Body: 16px
- Headings: 20-24px, semi-bold
- Cards: 14-16px

## Layout Components

### Bottom Tab Bar
- Fixed at bottom of viewport
- 5 tabs with icons + labels
- Active tab highlighted with primary color
- Height: ~60px + safe area

### Top Bar
- Fixed at top
- Board name as title
- Login button (right side) — shows user avatar when logged in
- Height: ~48px + safe area

### Post Cards
- Full-width cards with 8-12px padding
- Thumbnail on left (if applicable), text on right
- Badge for post type
- Bottom row: time ago, comment/bid count

### Post Detail
- Scrollable full page
- Images at top (placeholder)
- Post info below
- Sticky bottom bar for action (bid/comment)

### Chat Interface
- Messages area: scrollable, flex-grow
- Input bar: fixed at bottom, text field + send button
- Bot messages: left-aligned, light background
- User messages: right-aligned, primary color background

## Responsive Behavior

- **< 640px**: Single column, bottom tab bar (primary target)
- **640-1024px**: Slightly wider cards, same layout
- **> 1024px**: Centered container (max 480px), simulating phone view — this is a phone-first demo

## Animations (Minimal)

- 5-minute countdown timer: subtle pulse
- Page transitions: none (keep it snappy)
- Bot typing indicator: "..." animation

## Accessibility

- Sufficient color contrast
- Tappable targets: minimum 44x44px
- Semantic HTML
