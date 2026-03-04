# Longyearbyen Community App

A phone-first web application for the Longyearbyen community on Svalbard — replacing Facebook groups with a dedicated platform for buying/selling, events, lost & found, and general announcements.

**[Live Demo](https://kimrs.github.io/longyearbyen-community/)**

## Features

- **Torget** (Marketplace) — Buy, sell, and give away items with a 5-minute bidding timer
- **Hendelser** (Events) — Community events with RSVP and comments
- **Hittegods** (Lost & Found) — Report and find lost items
- **Oppslagstavla** (General Board) — Community announcements and discussions
- **Svali** (Chatbot) — AI-style bot that searches across all boards and helps create posts

All UI text is in Norwegian (Bokmål). The app runs entirely client-side with mock data — no backend required.

## Tech Stack

- React 19 + TypeScript
- Tailwind CSS 4
- React Router 7
- Vite 7
- Deployed to GitHub Pages via GitHub Actions

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173/longyearbyen-community/](http://localhost:5173/longyearbyen-community/) in your browser.

## Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/   # Reusable UI components (layout, cards, chat, forms, common)
├── pages/        # Route-level page components
├── data/         # Mock data (users, marketplace, events, lost & found, general)
├── types/        # Shared TypeScript interfaces
├── context/      # React Context for app state
├── utils/        # Bot engine and utilities
├── App.tsx       # Router setup
└── main.tsx      # Entry point
```

## Design

- Mobile-first (375px target), centered max-width container on desktop
- Wireframe aesthetic — clean and functional
- Bottom tab navigation with 5 sections
- Demo mode: no persistence, resets on page load
