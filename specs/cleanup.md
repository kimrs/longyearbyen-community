# Cleanup & Quality Spec

## Code Quality Rules

- No `any` types in TypeScript — use proper interfaces
- All mock data in a single `src/data/` directory
- Components in `src/components/`, pages in `src/pages/`
- Shared types in `src/types/`
- No unused imports or variables
- No console.log in committed code (except bot debug if needed)

## File Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── BottomTabBar.tsx
│   │   ├── TopBar.tsx
│   │   └── Layout.tsx
│   ├── cards/
│   │   ├── MarketplaceCard.tsx
│   │   ├── EventCard.tsx
│   │   ├── LostFoundCard.tsx
│   │   └── GeneralCard.tsx
│   ├── chat/
│   │   ├── ChatMessage.tsx
│   │   └── ChatInput.tsx
│   ├── common/
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── CountdownTimer.tsx
│   │   ├── LoginModal.tsx
│   │   └── PlaceholderImage.tsx
│   └── forms/
│       ├── MarketplaceForm.tsx
│       ├── EventForm.tsx
│       ├── LostFoundForm.tsx
│       └── GeneralForm.tsx
├── pages/
│   ├── MarketplacePage.tsx
│   ├── MarketplaceDetailPage.tsx
│   ├── EventsPage.tsx
│   ├── EventDetailPage.tsx
│   ├── LostFoundPage.tsx
│   ├── LostFoundDetailPage.tsx
│   ├── GeneralPage.tsx
│   ├── GeneralDetailPage.tsx
│   ├── BotPage.tsx
│   └── CreatePostPage.tsx
├── data/
│   ├── users.ts
│   ├── marketplace.ts
│   ├── events.ts
│   ├── lostFound.ts
│   └── general.ts
├── types/
│   └── index.ts
├── context/
│   └── AppContext.tsx
├── utils/
│   └── botEngine.ts
├── App.tsx
└── main.tsx
```

## Build Requirements

- `npm run build` must succeed with zero errors
- `npm run dev` must start without errors
- No TypeScript errors (`npx tsc --noEmit`)

## Testing (Not Required for Demo)

No tests needed for the wireframe demo. Focus on visual correctness and interactivity.
