import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import LostFoundCard from '../components/cards/LostFoundCard';
import type { LostFoundType } from '../types';

const TYPE_OPTIONS: { value: LostFoundType | ''; label: string }[] = [
  { value: '', label: 'Alle typer' },
  { value: 'mistet', label: 'Mistet' },
  { value: 'funnet', label: 'Funnet' },
];

export default function LostFoundPage() {
  const { lostFoundPosts } = useApp();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<LostFoundType | ''>('');

  const filtered = useMemo(() => {
    let posts = lostFoundPosts;

    if (search.trim()) {
      const q = search.toLowerCase();
      posts = posts.filter(
        (p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.location.toLowerCase().includes(q)
      );
    }

    if (typeFilter) {
      posts = posts.filter((p) => p.type === typeFilter);
    }

    // Sort: open posts first (newest), then resolved posts
    const sorted = [...posts].sort((a, b) => {
      if (a.status !== b.status) {
        return a.status === 'åpen' ? -1 : 1;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return sorted;
  }, [lostFoundPosts, search, typeFilter]);

  return (
    <div className="relative flex flex-col gap-3 p-3 pb-20">
      {/* Search */}
      <input
        type="search"
        placeholder="Søk i Hittegods..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
      />

      {/* Filter row */}
      <div className="flex gap-2">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as LostFoundType | '')}
          className="flex-1 rounded-lg border border-gray-300 px-2 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
        >
          {TYPE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* Results count */}
      <p className="text-xs text-gray-500">{filtered.length} innlegg</p>

      {/* Post list */}
      <div className="flex flex-col gap-2">
        {filtered.map((post) => (
          <LostFoundCard
            key={post.id}
            post={post}
            onClick={() => navigate(`/hittegods/${post.id}`)}
          />
        ))}

        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-gray-400">Ingen treff</p>
        )}
      </div>

      {/* FAB - New post */}
      <button
        onClick={() => navigate('/hittegods/ny')}
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
