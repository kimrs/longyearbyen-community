import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import GeneralCard from '../components/cards/GeneralCard';
import type { GeneralCategory } from '../types';

const CATEGORY_OPTIONS: { value: GeneralCategory | ''; label: string }[] = [
  { value: '', label: 'Alle kategorier' },
  { value: 'spørsmål', label: 'Spørsmål' },
  { value: 'informasjon', label: 'Informasjon' },
  { value: 'anbefaling', label: 'Anbefaling' },
  { value: 'diskusjon', label: 'Diskusjon' },
  { value: 'annet', label: 'Annet' },
];

type SortOption = 'newest' | 'most-commented';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Nyeste først' },
  { value: 'most-commented', label: 'Mest kommentert' },
];

export default function GeneralPage() {
  const { generalPosts } = useApp();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<GeneralCategory | ''>('');
  const [sort, setSort] = useState<SortOption>('newest');

  const filtered = useMemo(() => {
    let posts = generalPosts;

    if (search.trim()) {
      const q = search.toLowerCase();
      posts = posts.filter(
        (p) => p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q)
      );
    }

    if (categoryFilter) {
      posts = posts.filter((p) => p.category === categoryFilter);
    }

    const sorted = [...posts].sort((a, b) => {
      if (sort === 'most-commented') {
        return b.comments.length - a.comments.length;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return sorted;
  }, [generalPosts, search, categoryFilter, sort]);

  return (
    <div className="relative flex flex-col gap-3 p-3 pb-20">
      {/* Search */}
      <input
        type="search"
        placeholder="Søk i Oppslagstavla..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
      />

      {/* Filter row */}
      <div className="flex gap-2">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value as GeneralCategory | '')}
          className="flex-1 rounded-lg border border-gray-300 px-2 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
        >
          {CATEGORY_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="rounded-lg border border-gray-300 px-2 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* Results count */}
      <p className="text-xs text-gray-500">{filtered.length} innlegg</p>

      {/* Post list */}
      <div className="flex flex-col gap-2">
        {filtered.map((post) => (
          <GeneralCard
            key={post.id}
            post={post}
            onClick={() => navigate(`/oppslagstavla/${post.id}`)}
          />
        ))}

        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-gray-400">Ingen treff</p>
        )}
      </div>

      {/* FAB - New post */}
      <button
        onClick={() => navigate('/oppslagstavla/ny')}
        className="fixed bottom-20 right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 active:bg-blue-800"
        aria-label="Nytt innlegg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
}
