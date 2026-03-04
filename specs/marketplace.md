# Marketplace Board (Torget) Spec

## Overview

The primary board — a buy/sell/wanted marketplace for Longyearbyen residents.

## Post Types

- **Til salgs** (For sale): Selling an item
- **Ønskes kjøpt** (Wanted): Looking for an item
- **Gis bort** (Free): Giving away an item

## Post Fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Tittel | text | yes | Max 100 chars |
| Beskrivelse | textarea | yes | Max 2000 chars |
| Pris | number | no | In NOK. Optional for "Gis bort" and "Ønskes kjøpt" |
| Kategori | select | yes | See categories below |
| Bilder | mock | no | Show placeholder image thumbnails |
| Type | select | yes | Til salgs / Ønskes kjøpt / Gis bort |

## Categories

- Kjøretøy og snøscooter (Vehicles & snowmobiles)
- Klær og utstyr (Clothes & gear)
- Møbler og hjem (Furniture & home)
- Elektronikk (Electronics)
- Våpen og sikkerhet (Weapons & safety — signal pistols etc.)
- Sport og friluftsliv (Sports & outdoors)
- Annet (Other)

## List View

- Cards showing: thumbnail, title, price, post type badge, time posted
- Filter by: post type, category
- Sort by: newest (default), price low-high, price high-low
- Search bar at top

## Detail View

- Full post info
- Seller info (name, avatar)
- **Bidding section** (for "Til salgs" posts)
- **Questions & answers section**

## Bidding

- Any logged-in user can place a bid
- Bids are visible to everyone (transparent auction)
- Show: bidder name, amount, timestamp
- Seller can mark an item as "Solgt" (Sold) to a specific bidder

## Questions & Answers

- Any logged-in user can ask a question on a post
- Only the post author can answer
- Q&A displayed as threaded pairs

## 5-Minute Rule

This is a community norm from the Facebook groups:

> When a new item is posted for sale, **no one may claim or bid on it for the first 5 minutes**. This gives everyone a fair chance to see the post before someone snaps it up.

### Implementation

- When a post is created, a 5-minute countdown is displayed
- During the countdown: bid button is disabled, shows "Venter... 4:32" (Waiting...)
- After 5 minutes: bidding opens
- Visual indicator: countdown timer on the post card and detail view

### Mock Data

For demo purposes, some posts should be within the 5-minute window (show countdown) and most should be past it (bidding open).

## Mock Data — Marketplace Posts

1. **Snøscooter Lynx Xtrim 2019** — Til salgs, 85 000 kr, Kjøretøy og snøscooter. 3 bids. 2 questions.
2. **Signalpistol Orion** — Til salgs, 1 200 kr, Våpen og sikkerhet. 1 bid. 0 questions.
3. **Hundeslede (brukt)** — Til salgs, 4 500 kr, Sport og friluftsliv. 0 bids.
4. **Ønsker å kjøpe: Varmepumpe** — Ønskes kjøpt, Møbler og hjem.
5. **Sofa, god stand** — Gis bort, Møbler og hjem. 5 questions ("Er den fortsatt ledig?")
6. **Canada Goose jakke str M** — Til salgs, 3 500 kr, Klær og utstyr. Within 5-min window.
7. **Xbox Series X + 4 spill** — Til salgs, 3 000 kr, Elektronikk. 2 bids.
8. **Skiutstyr barn 120cm** — Gis bort, Sport og friluftsliv.
9. **Ønsker: Isbjørnvarsel-radio** — Ønskes kjøpt, Våpen og sikkerhet.
10. **Flyttesalg: Div. kjøkkenutstyr** — Til salgs, 500 kr, Møbler og hjem.
