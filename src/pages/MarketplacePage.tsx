import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import MarketplaceCard from '../components/cards/MarketplaceCard';
import type { MarketplacePostType, MarketplaceCategory } from '../types';

const TYPE_OPTIONS: { value: MarketplacePostType | ''; label: string }[] = [
  { value: '', label: 'Alle typer' },
  { value: 'til-salgs', label: 'Til salgs' },
  { value: 'ønskes-kjøpt', label: 'Ønskes kjøpt' },
  { value: 'gis-bort', label: 'Gis bort' },
];

const CATEGORY_OPTIONS: { value: MarketplaceCategory | ''; label: string }[] = [
  { value: '', label: 'Alle kategorier' },
  { value: 'kjøretøy-og-snøscooter', label: 'Kjøretøy og snøscooter' },
  { value: 'klær-og-utstyr', label: 'Klær og utstyr' },
  { value: 'møbler-og-hjem', label: 'Møbler og hjem' },
  { value: 'elektronikk', label: 'Elektronikk' },
  { value: 'våpen-og-sikkerhet', label: 'Våpen og sikkerhet' },
  { value: 'sport-og-friluftsliv', label: 'Sport og friluftsliv' },
  { value: 'annet', label: 'Annet' },
];

type SortOption = 'newest' | 'price-asc' | 'price-desc';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Nyeste først' },
  { value: 'price-asc', label: 'Pris: lav–høy' },
  { value: 'price-desc', label: 'Pris: høy–lav' },
];

export default function MarketplacePage() {
  const { marketplacePosts } = useApp();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<MarketplacePostType | ''>('');
  const [categoryFilter, setCategoryFilter] = useState<MarketplaceCategory | ''>('');
  const [sort, setSort] = useState<SortOption>('newest');

  const filtered = useMemo(() => {
    let posts = marketplacePosts;

    if (search.trim()) {
      const q = search.toLowerCase();
      posts = posts.filter(
        (p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }

    if (typeFilter) {
      posts = posts.filter((p) => p.type === typeFilter);
    }

    if (categoryFilter) {
      posts = posts.filter((p) => p.category === categoryFilter);
    }

    const sorted = [...posts];
    if (sort === 'price-asc') {
      sorted.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    } else if (sort === 'price-desc') {
      sorted.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    } else {
      sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return sorted;
  }, [marketplacePosts, search, typeFilter, categoryFilter, sort]);

  return (
    <div className="relative flex flex-col gap-3 p-3 pb-20">
      {/* Search */}
      <input
        type="search"
        placeholder="Søk i Torget..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
      />

      {/* Filters row */}
      <div className="flex gap-2">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as MarketplacePostType | '')}
          className="flex-1 rounded-lg border border-gray-300 px-2 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
        >
          {TYPE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value as MarketplaceCategory | '')}
          className="flex-1 rounded-lg border border-gray-300 px-2 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
        >
          {CATEGORY_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="flex-1 rounded-lg border border-gray-300 px-2 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* Results count */}
      <p className="text-xs text-gray-500">{filtered.length} annonser</p>

      {/* Post list */}
      <div className="flex flex-col gap-2">
        {filtered.map((post) => (
          <MarketplaceCard
            key={post.id}
            post={post}
            onClick={() => navigate(`/torget/${post.id}`)}
          />
        ))}

        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-gray-400">Ingen treff</p>
        )}
      </div>

      {/* FAB - New post */}
      <button
        onClick={() => navigate('/torget/ny')}
        className="fixed bottom-20 right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 active:bg-blue-800"
        aria-label="Ny annonse"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
}
