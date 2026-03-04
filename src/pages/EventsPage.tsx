import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import EventCard from '../components/cards/EventCard';
import type { EventCategory } from '../types';

const CATEGORY_OPTIONS: { value: EventCategory | ''; label: string }[] = [
  { value: '', label: 'Alle kategorier' },
  { value: 'kultur-og-underholdning', label: 'Kultur og underholdning' },
  { value: 'sport-og-friluftsliv', label: 'Sport og friluftsliv' },
  { value: 'barn-og-familie', label: 'Barn og familie' },
  { value: 'kurs-og-foredrag', label: 'Kurs og foredrag' },
  { value: 'dugnad-og-frivillig', label: 'Dugnad og frivillig' },
  { value: 'fest-og-sosialt', label: 'Fest og sosialt' },
  { value: 'annet', label: 'Annet' },
];

function isPast(dateStr: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(dateStr + 'T00:00:00') < today;
}

export default function EventsPage() {
  const { eventPosts } = useApp();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<EventCategory | ''>('');

  const filtered = useMemo(() => {
    let posts = eventPosts;

    if (search.trim()) {
      const q = search.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q)
      );
    }

    if (categoryFilter) {
      posts = posts.filter((p) => p.category === categoryFilter);
    }

    // Upcoming first (soonest date on top), past events at the bottom
    const upcoming = posts.filter((p) => !isPast(p.date));
    const past = posts.filter((p) => isPast(p.date));

    upcoming.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    past.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return [...upcoming, ...past];
  }, [eventPosts, search, categoryFilter]);

  return (
    <div className="relative flex flex-col gap-3 p-3 pb-20">
      {/* Search */}
      <input
        type="search"
        placeholder="Søk i hendelser..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
      />

      {/* Filter */}
      <div className="flex gap-2">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value as EventCategory | '')}
          className="flex-1 rounded-lg border border-gray-300 px-2 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
        >
          {CATEGORY_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* Results count */}
      <p className="text-xs text-gray-500">{filtered.length} hendelser</p>

      {/* Event list */}
      <div className="flex flex-col gap-2">
        {filtered.map((post) => (
          <EventCard
            key={post.id}
            post={post}
            onClick={() => navigate(`/hendelser/${post.id}`)}
          />
        ))}

        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-gray-400">Ingen hendelser funnet</p>
        )}
      </div>

      {/* FAB - New event */}
      <button
        onClick={() => navigate('/hendelser/ny')}
        className="fixed bottom-20 right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 active:bg-blue-800"
        aria-label="Ny hendelse"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
}
