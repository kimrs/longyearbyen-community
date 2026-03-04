import type {
  MarketplacePost,
  EventPost,
  LostFoundPost,
  GeneralPost,
  SearchResult,
} from '../types';

const STOP_WORDS = new Set([
  'jeg', 'du', 'han', 'hun', 'den', 'det', 'vi', 'de', 'er', 'var', 'har',
  'til', 'for', 'med', 'på', 'av', 'fra', 'om', 'som', 'en', 'et', 'ei',
  'og', 'i', 'å', 'ikke', 'kan', 'vil', 'skal', 'meg', 'deg', 'seg',
  'noen', 'noe', 'hva', 'hvor', 'når', 'hvordan', 'leter', 'etter',
  'finne', 'finn', 'søker', 'trenger', 'ønsker', 'salgs', 'kjøpt',
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-zA-ZæøåÆØÅ0-9\s]/g, '')
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w));
}

function scoreMatch(tokens: string[], text: string): number {
  const lower = text.toLowerCase();
  let score = 0;
  for (const token of tokens) {
    if (lower.includes(token)) {
      score += 1;
    }
  }
  return score;
}

function searchMarketplace(
  tokens: string[],
  posts: MarketplacePost[],
): SearchResult[] {
  return posts
    .map((post) => {
      const score = scoreMatch(tokens, `${post.title} ${post.description}`);
      return { post, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ post }) => ({
      board: 'torget' as const,
      postId: post.id,
      title: post.title,
      subtitle: post.price != null ? `${post.price} kr` : 'Gis bort',
    }));
}

function searchEvents(
  tokens: string[],
  posts: EventPost[],
): SearchResult[] {
  return posts
    .map((post) => {
      const score = scoreMatch(tokens, `${post.title} ${post.description}`);
      return { post, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ post }) => ({
      board: 'hendelser' as const,
      postId: post.id,
      title: post.title,
      subtitle: post.date,
    }));
}

function searchLostFound(
  tokens: string[],
  posts: LostFoundPost[],
): SearchResult[] {
  return posts
    .map((post) => {
      const score = scoreMatch(tokens, `${post.title} ${post.description}`);
      return { post, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ post }) => ({
      board: 'hittegods' as const,
      postId: post.id,
      title: post.title,
      subtitle: post.type === 'mistet' ? 'Mistet' : 'Funnet',
    }));
}

function searchGeneral(
  tokens: string[],
  posts: GeneralPost[],
): SearchResult[] {
  return posts
    .map((post) => {
      const score = scoreMatch(tokens, `${post.title} ${post.content}`);
      return { post, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ post }) => ({
      board: 'oppslagstavla' as const,
      postId: post.id,
      title: post.title,
      subtitle: undefined,
    }));
}

export interface BotSearchParams {
  marketplacePosts: MarketplacePost[];
  eventPosts: EventPost[];
  lostFoundPosts: LostFoundPost[];
  generalPosts: GeneralPost[];
}

export function searchAllBoards(
  query: string,
  data: BotSearchParams,
): SearchResult[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  return [
    ...searchMarketplace(tokens, data.marketplacePosts),
    ...searchEvents(tokens, data.eventPosts),
    ...searchLostFound(tokens, data.lostFoundPosts),
    ...searchGeneral(tokens, data.generalPosts),
  ];
}

export function extractSearchTerm(input: string): string {
  const tokens = tokenize(input);
  return tokens.join(' ');
}
