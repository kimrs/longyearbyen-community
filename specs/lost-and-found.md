# Lost & Found Board (Hittegods) Spec

## Overview

A board for reporting lost and found items in Longyearbyen.

## Post Types

- **Mistet** (Lost): Something you lost
- **Funnet** (Found): Something you found

## Post Fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Tittel | text | yes | Brief description of item |
| Beskrivelse | textarea | yes | Details, identifying features |
| Type | select | yes | Mistet / Funnet |
| Sted | text | yes | Where it was lost/found |
| Dato | date | yes | When it was lost/found |
| Status | auto | - | Åpen (Open) / Løst (Resolved) |

## List View

- Cards showing: type badge (Mistet/Funnet), title, location, date
- Color coding: red-ish for Mistet, green-ish for Funnet
- Filter by type
- Sort by newest
- Resolved posts shown greyed out

## Detail View

- Full post info
- Comments (to coordinate return)
- Post author can mark as "Løst" (Resolved)

## Mock Data — Lost & Found

1. **Mistet: Nøkkelknippe med blå karabinkrok** — Mistet ved Svalbardbutikken, 2026-03-02. "3 nøkler og en liten lommelykt."
2. **Funnet: Svart hanske (høyre)** — Funnet på veien til Huset, 2026-03-01. "Ligger på gjerdet ved trappa."
3. **Mistet: Hund — Husky, hvit/grå** — Mistet i Longyearbyen sentrum, 2026-03-03. "Svarer på Nansen. Har halsbånd med nummer." Status: Åpen.
4. **Funnet: GoPro på isgrotta-tur** — Funnet i Longyearbreen, 2026-02-28. "Ta kontakt med beskrivelse for å bevise eierskap."
5. **Mistet: Lommebok (brun skinn)** — Mistet på Fruene, 2026-03-01. Status: Løst.
