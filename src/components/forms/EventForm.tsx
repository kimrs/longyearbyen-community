import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Button from '../common/Button';
import type { EventCategory } from '../../types';

const CATEGORY_OPTIONS: { value: EventCategory; label: string }[] = [
  { value: 'kultur-og-underholdning', label: 'Kultur og underholdning' },
  { value: 'sport-og-friluftsliv', label: 'Sport og friluftsliv' },
  { value: 'barn-og-familie', label: 'Barn og familie' },
  { value: 'kurs-og-foredrag', label: 'Kurs og foredrag' },
  { value: 'dugnad-og-frivillig', label: 'Dugnad og frivillig' },
  { value: 'fest-og-sosialt', label: 'Fest og sosialt' },
  { value: 'annet', label: 'Annet' },
];

export default function EventForm() {
  const { currentUser, addEventPost, setShowLoginModal } = useApp();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState<EventCategory>('annet');

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center gap-4 p-8 text-center">
        <p className="text-gray-600">Du må logge inn for å opprette en hendelse.</p>
        <Button onClick={() => setShowLoginModal(true)}>Logg inn</Button>
      </div>
    );
  }

  const canSubmit =
    title.trim().length > 0 &&
    description.trim().length > 0 &&
    date.length > 0 &&
    location.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    const post = {
      id: `ev-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      date,
      time: time || undefined,
      location: location.trim(),
      category,
      authorId: currentUser.id,
      createdAt: new Date().toISOString(),
      comments: [],
    };

    addEventPost(post);
    navigate(`/hendelser/${post.id}`);
  };

  const inputClass =
    'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none';

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <h1 className="text-xl font-semibold text-gray-800">Ny hendelse</h1>

      {/* Title */}
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-700">Tittel *</span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Navn på hendelsen"
          maxLength={100}
          className={inputClass}
        />
        <span className="text-xs text-gray-400">{title.length}/100</span>
      </label>

      {/* Description */}
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-700">Beskrivelse *</span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Beskriv hendelsen..."
          maxLength={2000}
          rows={4}
          className={inputClass}
        />
        <span className="text-xs text-gray-400">{description.length}/2000</span>
      </label>

      {/* Date */}
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-700">Dato *</span>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={inputClass}
        />
      </label>

      {/* Time */}
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-700">Tid</span>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className={inputClass}
        />
      </label>

      {/* Location */}
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-700">Sted *</span>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Hvor i Longyearbyen?"
          maxLength={100}
          className={inputClass}
        />
      </label>

      {/* Category */}
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-700">Kategori *</span>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as EventCategory)}
          className={inputClass}
        >
          {CATEGORY_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </label>

      {/* Organizer info */}
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-700">Arrangør</span>
        <p className="text-sm text-gray-500">{currentUser.name} (automatisk)</p>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Button type="button" variant="secondary" className="flex-1" onClick={() => navigate(-1)}>
          Avbryt
        </Button>
        <Button type="submit" disabled={!canSubmit} className="flex-1">
          Publiser
        </Button>
      </div>
    </form>
  );
}
