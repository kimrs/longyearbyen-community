import type { MarketplacePost } from '../types';

// Post 6 is within the 5-minute window (created "now")
const now = new Date();

export const marketplacePosts: MarketplacePost[] = [
  {
    id: 'mp-1',
    type: 'til-salgs',
    title: 'Snøscooter Lynx Xtrim 2019',
    description:
      'Velholdt snøscooter, 4200 km. Nylig service. Komplett med deksel og ekstra belter. Kan prøvekjøres etter avtale.',
    price: 85000,
    category: 'kjøretøy-og-snøscooter',
    authorId: 'erik',
    createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
    bids: [
      {
        id: 'bid-1',
        userId: 'maja',
        amount: 75000,
        timestamp: new Date(now.getTime() - 90 * 60 * 1000).toISOString(),
      },
      {
        id: 'bid-2',
        userId: 'lars',
        amount: 78000,
        timestamp: new Date(now.getTime() - 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'bid-3',
        userId: 'ingrid',
        amount: 80000,
        timestamp: new Date(now.getTime() - 30 * 60 * 1000).toISOString(),
      },
    ],
    questions: [
      {
        id: 'q-1',
        userId: 'maja',
        text: 'Har den blitt brukt til turkjøring eller arbeidskjøring?',
        timestamp: new Date(now.getTime() - 100 * 60 * 1000).toISOString(),
        answer: {
          text: 'Hovedsakelig turkjøring i helger. Godt vedlikeholdt.',
          timestamp: new Date(now.getTime() - 95 * 60 * 1000).toISOString(),
        },
      },
      {
        id: 'q-2',
        userId: 'lars',
        text: 'Er prisen fast eller kan du forhandle?',
        timestamp: new Date(now.getTime() - 50 * 60 * 1000).toISOString(),
      },
    ],
    sold: false,
  },
  {
    id: 'mp-2',
    type: 'til-salgs',
    title: 'Signalpistol Orion',
    description:
      'Signalpistol med 6 patroner. Påkrevd utstyr for turer utenfor bebyggelsen. Lite brukt.',
    price: 1200,
    category: 'våpen-og-sikkerhet',
    authorId: 'lars',
    createdAt: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString(),
    bids: [
      {
        id: 'bid-4',
        userId: 'erik',
        amount: 1000,
        timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString(),
      },
    ],
    questions: [],
    sold: false,
  },
  {
    id: 'mp-3',
    type: 'til-salgs',
    title: 'Hundeslede (brukt)',
    description:
      'Hundeslede i tre, plass til 2 personer. Noen bruksmerker, men solid. Hentes i Nybyen.',
    price: 4500,
    category: 'sport-og-friluftsliv',
    authorId: 'ingrid',
    createdAt: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(),
    bids: [],
    questions: [],
    sold: false,
  },
  {
    id: 'mp-4',
    type: 'ønskes-kjøpt',
    title: 'Ønsker å kjøpe: Varmepumpe',
    description:
      'Ser etter en brukt varmepumpe, helst luft-til-luft. Må passe til ca 50 kvm leilighet. Ta kontakt om du har en!',
    category: 'møbler-og-hjem',
    authorId: 'maja',
    createdAt: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString(),
    bids: [],
    questions: [],
    sold: false,
  },
  {
    id: 'mp-5',
    type: 'gis-bort',
    title: 'Sofa, god stand',
    description:
      'Grå 3-seter sofa gis bort grunnet flytting. Ingen flekker, puter i fin form. Må hentes innen fredag.',
    category: 'møbler-og-hjem',
    authorId: 'erik',
    createdAt: new Date(now.getTime() - 8 * 60 * 60 * 1000).toISOString(),
    bids: [],
    questions: [
      {
        id: 'q-3',
        userId: 'maja',
        text: 'Er den fortsatt ledig?',
        timestamp: new Date(now.getTime() - 7 * 60 * 60 * 1000).toISOString(),
        answer: {
          text: 'Ja, fortsatt ledig!',
          timestamp: new Date(now.getTime() - 6.5 * 60 * 60 * 1000).toISOString(),
        },
      },
      {
        id: 'q-4',
        userId: 'lars',
        text: 'Er den fortsatt ledig?',
        timestamp: new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString(),
        answer: {
          text: 'Ja, kom gjerne innom.',
          timestamp: new Date(now.getTime() - 5.5 * 60 * 60 * 1000).toISOString(),
        },
      },
      {
        id: 'q-5',
        userId: 'ingrid',
        text: 'Er den fortsatt ledig?',
        timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'q-6',
        userId: 'maja',
        text: 'Kan du levere til Nybyen?',
        timestamp: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'q-7',
        userId: 'lars',
        text: 'Hvor stor er den? Mål?',
        timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
      },
    ],
    sold: false,
  },
  {
    id: 'mp-6',
    type: 'til-salgs',
    title: 'Canada Goose jakke str M',
    description:
      'Canada Goose Expedition Parka, størrelse M. Brukt én sesong. Perfekt for Svalbard-vinteren.',
    price: 3500,
    category: 'klær-og-utstyr',
    authorId: 'ingrid',
    // Within the 5-minute window
    createdAt: new Date(now.getTime() - 2 * 60 * 1000).toISOString(),
    bids: [],
    questions: [],
    sold: false,
  },
  {
    id: 'mp-7',
    type: 'til-salgs',
    title: 'Xbox Series X + 4 spill',
    description:
      'Xbox Series X med 2 kontrollere og 4 spill (Halo Infinite, Forza, FIFA 24, Minecraft). Alt i original eske.',
    price: 3000,
    category: 'elektronikk',
    authorId: 'lars',
    createdAt: new Date(now.getTime() - 12 * 60 * 60 * 1000).toISOString(),
    bids: [
      {
        id: 'bid-5',
        userId: 'erik',
        amount: 2500,
        timestamp: new Date(now.getTime() - 10 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'bid-6',
        userId: 'maja',
        amount: 2800,
        timestamp: new Date(now.getTime() - 8 * 60 * 60 * 1000).toISOString(),
      },
    ],
    questions: [],
    sold: false,
  },
  {
    id: 'mp-8',
    type: 'gis-bort',
    title: 'Skiutstyr barn 120cm',
    description:
      'Komplett skiutstyr til barn: ski (120cm), staver, og støvler str 34. Brukt 2 sesonger.',
    category: 'sport-og-friluftsliv',
    authorId: 'maja',
    createdAt: new Date(now.getTime() - 48 * 60 * 60 * 1000).toISOString(),
    bids: [],
    questions: [],
    sold: false,
  },
  {
    id: 'mp-9',
    type: 'ønskes-kjøpt',
    title: 'Ønsker: Isbjørnvarsel-radio',
    description:
      'Trenger en isbjørnvarsel-radio for turer utenfor byen. Gjerne brukt i god stand. Betaler godt!',
    category: 'våpen-og-sikkerhet',
    authorId: 'erik',
    createdAt: new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString(),
    bids: [],
    questions: [],
    sold: false,
  },
  {
    id: 'mp-10',
    type: 'til-salgs',
    title: 'Flyttesalg: Div. kjøkkenutstyr',
    description:
      'Flytter sørover! Selger diverse kjøkkenutstyr: gryter, panner, bestikk, tallerkener. Alt samlet for 500 kr.',
    price: 500,
    category: 'møbler-og-hjem',
    authorId: 'maja',
    createdAt: new Date(now.getTime() - 36 * 60 * 60 * 1000).toISOString(),
    bids: [],
    questions: [],
    sold: false,
  },
];
