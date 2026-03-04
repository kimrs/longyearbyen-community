# Longyearbyen Community App — Overview

## Purpose

Replace Facebook groups used by people who live in and frequent Longyearbyen with a dedicated phone-first web application.

## Tech Stack

- **Framework**: React + TypeScript (Vite)
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **State**: React Context (no backend — all mock data in-memory)
- **Deployment**: GitHub Pages via GitHub Actions

## Key Constraints

- **Phone-first**: All layouts designed for 375px–430px viewport first, responsive up
- **Demo mode**: No cookies, no localStorage. Every page load resets to mock data. Entering the app always shows the full demo state.
- **Static site**: No backend. Everything runs client-side with mock data.
- **Wireframe level**: Functional wireframe aesthetic — clean, minimal, but fully interactive with mock data

## Navigation Structure

Bottom tab bar (mobile-native feel):

| Tab | Icon | Route |
|-----|------|-------|
| Torget (Marketplace) | 🏪 | `/torget` |
| Hendelser (Events) | 📅 | `/hendelser` |
| Hittegods (Lost & Found) | 🔍 | `/hittegods` |
| Oppslagstavla (General) | 📌 | `/oppslagstavla` |
| Bot | 💬 | `/bot` |

## Language

The UI should be in **Norwegian** (Bokmål) since this is for the Longyearbyen community. English fallback for technical terms is fine.

## Pages

- **Home / Landing**: Brief intro + links to boards. Default route redirects to `/torget`.
- **Board pages**: List view with cards for each post
- **Post detail**: Full post view with comments/bids
- **Create post**: Form for creating new posts (requires "login")
- **Bot**: Chat interface
- **Login**: Mock login screen (see auth spec)
