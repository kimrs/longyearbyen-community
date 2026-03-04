// === Users ===

export interface User {
  id: string;
  name: string;
  avatar: string;
}

// === Marketplace (Torget) ===

export type MarketplacePostType = 'til-salgs' | 'ønskes-kjøpt' | 'gis-bort';

export type MarketplaceCategory =
  | 'kjøretøy-og-snøscooter'
  | 'klær-og-utstyr'
  | 'møbler-og-hjem'
  | 'elektronikk'
  | 'våpen-og-sikkerhet'
  | 'sport-og-friluftsliv'
  | 'annet';

export interface Bid {
  id: string;
  userId: string;
  amount: number;
  timestamp: string;
}

export interface Question {
  id: string;
  userId: string;
  text: string;
  timestamp: string;
  answer?: {
    text: string;
    timestamp: string;
  };
}

export interface MarketplacePost {
  id: string;
  type: MarketplacePostType;
  title: string;
  description: string;
  price?: number;
  category: MarketplaceCategory;
  imageUrl?: string;
  authorId: string;
  createdAt: string;
  bids: Bid[];
  questions: Question[];
  sold: boolean;
  soldToUserId?: string;
}

// === Events (Hendelser) ===

export type EventCategory =
  | 'kultur-og-underholdning'
  | 'sport-og-friluftsliv'
  | 'barn-og-familie'
  | 'kurs-og-foredrag'
  | 'dugnad-og-frivillig'
  | 'fest-og-sosialt'
  | 'annet';

export interface Comment {
  id: string;
  userId: string;
  text: string;
  timestamp: string;
}

export interface EventPost {
  id: string;
  title: string;
  description: string;
  date: string;
  time?: string;
  location: string;
  category: EventCategory;
  authorId: string;
  createdAt: string;
  comments: Comment[];
}

// === Lost & Found (Hittegods) ===

export type LostFoundType = 'mistet' | 'funnet';
export type LostFoundStatus = 'åpen' | 'løst';

export interface LostFoundPost {
  id: string;
  type: LostFoundType;
  title: string;
  description: string;
  location: string;
  date: string;
  status: LostFoundStatus;
  authorId: string;
  createdAt: string;
  comments: Comment[];
}

// === General Board (Oppslagstavla) ===

export type GeneralCategory =
  | 'spørsmål'
  | 'informasjon'
  | 'anbefaling'
  | 'diskusjon'
  | 'annet';

export interface GeneralPost {
  id: string;
  title: string;
  content: string;
  category: GeneralCategory;
  authorId: string;
  createdAt: string;
  comments: Comment[];
}

// === Chatbot ===

export type ChatMessageSender = 'user' | 'bot';

export interface ChatMessage {
  id: string;
  sender: ChatMessageSender;
  text: string;
  timestamp: string;
  cards?: SearchResult[];
  actions?: ChatAction[];
}

export interface ChatAction {
  label: string;
  action: string;
}

export type BoardType = 'torget' | 'hendelser' | 'hittegods' | 'oppslagstavla';

export interface SearchResult {
  board: BoardType;
  postId: string;
  title: string;
  subtitle?: string;
}

// === App State ===

export interface AppState {
  currentUser: User | null;
  marketplacePosts: MarketplacePost[];
  eventPosts: EventPost[];
  lostFoundPosts: LostFoundPost[];
  generalPosts: GeneralPost[];
  chatMessages: ChatMessage[];
}
