# Events Board (Hendelser) Spec

## Overview

A board for upcoming events in Longyearbyen.

## Post Fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Tittel | text | yes | Event name |
| Beskrivelse | textarea | yes | Event details |
| Dato | date | yes | Event date |
| Tid | time | no | Start time |
| Sted | text | yes | Location in Longyearbyen |
| Arrangør | auto | yes | Auto-filled from logged-in user |
| Kategori | select | yes | See below |

## Categories

- Kultur og underholdning (Culture & entertainment)
- Sport og friluftsliv (Sports & outdoors)
- Barn og familie (Kids & family)
- Kurs og foredrag (Courses & lectures)
- Dugnad og frivillig (Volunteer work)
- Fest og sosialt (Party & social)
- Annet (Other)

## List View

- Cards showing: date (prominent), title, time, location, category badge
- Default sort: upcoming first (soonest date on top)
- Filter by category
- Past events shown greyed out at the bottom

## Detail View

- Full event info
- Comments section (general discussion about the event)
- No bidding

## Mock Data — Events

1. **Polarjazz 2026** — 2026-03-15, 19:00, Kulturhuset, Kultur og underholdning. "Årlig jazzfestival i verdens nordligste by!"
2. **Snøscootertur til Tempelfjorden** — 2026-03-08, 10:00, Møteplass: Lompensenteret, Sport og friluftsliv. "Fellestur, ta med egen scooter."
3. **Loppemarked på Huset** — 2026-03-22, 12:00, Huset, Annet. "Vårens store loppemarked!"
4. **Barnas filmkveld** — 2026-03-10, 17:00, Kulturhuset, Barn og familie. "Vi viser Frost 2. Gratis popcorn!"
5. **Foredrag: Isbjørnforskning** — 2026-03-12, 18:30, UNIS, Kurs og foredrag. "Forsker Jon Aars forteller."
6. **Pub quiz på Kroa** — 2026-03-07, 20:00, Kroa, Fest og sosialt. "Lag på maks 6 personer."
7. **Dugnad: Rydding rundt Nybyen** — 2026-03-20, 11:00, Nybyen, Dugnad og frivillig. "Vårslipp-dugnad. Kaffe og boller serveres."
