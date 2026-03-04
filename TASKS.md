# Implementation Tasks

## Phase 1: Project Setup

- [x] 1. Initialize Vite + React + TypeScript project with Tailwind CSS
- [x] 2. Set up file structure (components/, pages/, data/, types/, context/, utils/)
- [x] 3. Define TypeScript types/interfaces in `src/types/index.ts`

## Phase 2: Mock Data

- [x] 4. Create mock users data (`src/data/users.ts`)
- [x] 5. Create mock marketplace data (`src/data/marketplace.ts`)
- [x] 6. Create mock events data (`src/data/events.ts`)
- [x] 7. Create mock lost & found data (`src/data/lostFound.ts`)
- [x] 8. Create mock general board data (`src/data/general.ts`)

## Phase 3: App Shell & Navigation

- [x] 9. Create AppContext with state management (current user, posts, login)
- [x] 10. Create Layout component with TopBar and BottomTabBar
- [x] 11. Set up React Router with all routes
- [x] 12. Create LoginModal component (demo user picker)

## Phase 4: Common Components

- [x] 13. Create Badge, Button, CountdownTimer, and PlaceholderImage components

## Phase 5: Marketplace (Torget)

- [x] 14. Create MarketplaceCard component
- [x] 15. Create MarketplacePage with list view, filters, search
- [x] 16. Create MarketplaceDetailPage with bids, Q&A, 5-min timer
- [x] 17. Create MarketplaceForm for new posts

## Phase 6: Events (Hendelser)

- [x] 18. Create EventCard component
- [x] 19. Create EventsPage with list view and filters
- [x] 20. Create EventDetailPage with comments
- [x] 21. Create EventForm for new events

## Phase 7: Lost & Found (Hittegods)

- [x] 22. Create LostFoundCard component
- [x] 23. Create LostFoundPage with list view and filters
- [x] 24. Create LostFoundDetailPage with comments
- [x] 25. Create LostFoundForm for new posts

## Phase 8: General Board (Oppslagstavla)

- [x] 26. Create GeneralCard component
- [x] 27. Create GeneralPage with list view and filters
- [x] 28. Create GeneralDetailPage with comments
- [x] 29. Create GeneralForm for new posts

## Phase 9: Chatbot (Svali)

- [x] 30. Create botEngine utility (keyword matching across all mock data)
- [x] 31. Create ChatMessage and ChatInput components
- [x] 32. Create BotPage with full chat flow (search, not found, create post)

## Phase 10: Deployment & Polish

- [x] 33. Create GitHub Actions workflow for GitHub Pages deployment
- [x] 34. Update README.md with project info and hosted app link
- [x] 35. Final cleanup: fix TypeScript errors, remove unused code, verify build
