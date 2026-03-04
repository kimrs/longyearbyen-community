# General Board (Oppslagstavla) Spec

## Overview

A general-purpose community board for anything that doesn't fit the other categories — announcements, questions, recommendations, discussions.

## Post Fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Tittel | text | yes | Max 100 chars |
| Innhold | textarea | yes | Max 5000 chars |
| Kategori | select | yes | See below |

## Categories

- Spørsmål (Questions)
- Informasjon (Announcements)
- Anbefaling (Recommendations)
- Diskusjon (Discussion)
- Annet (Other)

## List View

- Cards showing: title, category badge, author, time posted, comment count
- Sort by newest (default) or most commented
- Filter by category

## Detail View

- Full post
- Comments section (flat, not threaded)

## Mock Data — General Board

1. **Noen som vet når Coop får inn ski?** — Spørsmål, Erik Hansen. 4 comments.
2. **Strømbrudd planlagt torsdag 13. mars** — Informasjon, Maja Nordahl. "Longyearbyen Lokalstyre melder om planlagt strømbrudd kl 08-12."
3. **Beste sted å se nordlys denne uka?** — Spørsmål, Ingrid Paulsen. 7 comments.
4. **Anbefaler Gruvelageret for middag** — Anbefaling, Lars Svendsen. "Ny meny, veldig bra reinsdyr."
5. **Helikoptertrafikk i natt?** — Diskusjon, Erik Hansen. "Noen som vet hva som skjedde?" 12 comments.
6. **Varsel: Isbjørn observert ved Adventdalen** — Informasjon, Maja Nordahl. "Sysselmannen melder. Hold avstand."
