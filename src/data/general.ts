import type { GeneralPost } from '../types';

export const generalPosts: GeneralPost[] = [
  {
    id: 'gen-1',
    title: 'Noen som vet når Coop får inn ski?',
    content: 'Har ventet i flere uker nå. Noen som har hørt noe?',
    category: 'spørsmål',
    authorId: 'erik',
    createdAt: '2026-03-01T09:00:00Z',
    comments: [
      {
        id: 'gen-c1',
        userId: 'maja',
        text: 'Hørte rykter om neste uke, men vet ikke sikkert.',
        timestamp: '2026-03-01T10:00:00Z',
      },
      {
        id: 'gen-c2',
        userId: 'lars',
        text: 'Bestilte fra nett i stedet. Tok bare 3 uker.',
        timestamp: '2026-03-01T11:30:00Z',
      },
      {
        id: 'gen-c3',
        userId: 'ingrid',
        text: 'Snakket med de i dag — de sa onsdag.',
        timestamp: '2026-03-01T14:00:00Z',
      },
      {
        id: 'gen-c4',
        userId: 'erik',
        text: 'Takk for info alle sammen!',
        timestamp: '2026-03-01T15:00:00Z',
      },
    ],
  },
  {
    id: 'gen-2',
    title: 'Strømbrudd planlagt torsdag 13. mars',
    content:
      'Longyearbyen Lokalstyre melder om planlagt strømbrudd kl 08-12. Gjelder området rundt Nybyen.',
    category: 'informasjon',
    authorId: 'maja',
    createdAt: '2026-03-02T08:00:00Z',
    comments: [],
  },
  {
    id: 'gen-3',
    title: 'Beste sted å se nordlys denne uka?',
    content:
      'Er relativt ny her og lurer på hvor folk pleier å dra for å se nordlys uten for mye lysforurensning.',
    category: 'spørsmål',
    authorId: 'ingrid',
    createdAt: '2026-02-28T18:00:00Z',
    comments: [
      {
        id: 'gen-c5',
        userId: 'erik',
        text: 'Bjørndalen er klassikeren. Husk isbjørnvakt!',
        timestamp: '2026-02-28T18:30:00Z',
      },
      {
        id: 'gen-c6',
        userId: 'lars',
        text: 'Platåfjellet er også bra, og nærmere sentrum.',
        timestamp: '2026-02-28T19:00:00Z',
      },
      {
        id: 'gen-c7',
        userId: 'maja',
        text: 'Mine Sjøfuglkolonien-bilder ble best fra Adventdalen.',
        timestamp: '2026-02-28T19:15:00Z',
      },
      {
        id: 'gen-c8',
        userId: 'ingrid',
        text: 'Flott, prøver Bjørndalen i kveld!',
        timestamp: '2026-02-28T19:30:00Z',
      },
      {
        id: 'gen-c9',
        userId: 'erik',
        text: 'Husk signalpistol og noen å gå med.',
        timestamp: '2026-02-28T20:00:00Z',
      },
      {
        id: 'gen-c10',
        userId: 'lars',
        text: 'KP-indeksen er 4 i natt, bør bli bra!',
        timestamp: '2026-02-28T21:00:00Z',
      },
      {
        id: 'gen-c11',
        userId: 'maja',
        text: 'Ble det noe nordlys? 😊',
        timestamp: '2026-03-01T08:00:00Z',
      },
    ],
  },
  {
    id: 'gen-4',
    title: 'Anbefaler Gruvelageret for middag',
    content: 'Ny meny, veldig bra reinsdyr. Prøv sjokoladedeserten også.',
    category: 'anbefaling',
    authorId: 'lars',
    createdAt: '2026-03-02T20:00:00Z',
    comments: [
      {
        id: 'gen-c12',
        userId: 'ingrid',
        text: 'Enig! Var der i helga, fantastisk mat.',
        timestamp: '2026-03-02T21:00:00Z',
      },
    ],
  },
  {
    id: 'gen-5',
    title: 'Helikoptertrafikk i natt?',
    content: 'Noen som vet hva som skjedde? Hørte helikopter flere ganger mellom 02 og 04.',
    category: 'diskusjon',
    authorId: 'erik',
    createdAt: '2026-03-03T07:00:00Z',
    comments: [
      {
        id: 'gen-c13',
        userId: 'maja',
        text: 'Tror det var søk og redning. Så blålys også.',
        timestamp: '2026-03-03T07:30:00Z',
      },
      {
        id: 'gen-c14',
        userId: 'lars',
        text: 'Sysselmannen hadde øvelse i går. Kan være det.',
        timestamp: '2026-03-03T08:00:00Z',
      },
      {
        id: 'gen-c15',
        userId: 'ingrid',
        text: 'Noen som har sjekket Svalbardposten?',
        timestamp: '2026-03-03T08:30:00Z',
      },
      {
        id: 'gen-c16',
        userId: 'erik',
        text: 'Ingenting der ennå. Oppdaterer om jeg finner ut mer.',
        timestamp: '2026-03-03T09:00:00Z',
      },
      {
        id: 'gen-c17',
        userId: 'maja',
        text: 'Bekreftet: det var en øvelse ifølge Sysselmannen.',
        timestamp: '2026-03-03T10:00:00Z',
      },
      {
        id: 'gen-c18',
        userId: 'lars',
        text: 'Greit å vite. Ble litt bekymret.',
        timestamp: '2026-03-03T10:30:00Z',
      },
      {
        id: 'gen-c19',
        userId: 'ingrid',
        text: 'Skulle ønske de varslet på forhånd.',
        timestamp: '2026-03-03T11:00:00Z',
      },
      {
        id: 'gen-c20',
        userId: 'erik',
        text: 'Enig. Legger ut om det skjer igjen.',
        timestamp: '2026-03-03T11:30:00Z',
      },
      {
        id: 'gen-c21',
        userId: 'maja',
        text: 'Takk for at du postet!',
        timestamp: '2026-03-03T12:00:00Z',
      },
      {
        id: 'gen-c22',
        userId: 'lars',
        text: 'Bra med fellesskapet her.',
        timestamp: '2026-03-03T12:30:00Z',
      },
      {
        id: 'gen-c23',
        userId: 'ingrid',
        text: 'Absolutt!',
        timestamp: '2026-03-03T13:00:00Z',
      },
      {
        id: 'gen-c24',
        userId: 'erik',
        text: '👍',
        timestamp: '2026-03-03T13:30:00Z',
      },
    ],
  },
  {
    id: 'gen-6',
    title: 'Varsel: Isbjørn observert ved Adventdalen',
    content:
      'Sysselmannen melder. Hold avstand og meld fra om nye observasjoner.',
    category: 'informasjon',
    authorId: 'maja',
    createdAt: '2026-03-03T15:00:00Z',
    comments: [
      {
        id: 'gen-c25',
        userId: 'erik',
        text: 'Takk for varselet! Deler videre.',
        timestamp: '2026-03-03T15:15:00Z',
      },
      {
        id: 'gen-c26',
        userId: 'lars',
        text: 'Viktig info. Alle bør ha signalpistol ute.',
        timestamp: '2026-03-03T15:30:00Z',
      },
    ],
  },
];
