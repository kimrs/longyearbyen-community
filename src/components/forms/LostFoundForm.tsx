import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Button from '../common/Button';
import type { LostFoundType } from '../../types';

const TYPE_OPTIONS: { value: LostFoundType; label: string }[] = [
  { value: 'mistet', label: 'Mistet' },
  { value: 'funnet', label: 'Funnet' },
];

export default function LostFoundForm() {
  const { currentUser, addLostFoundPost, setShowLoginModal } = useApp();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<LostFoundType>('mistet');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center gap-4 p-8 text-center">
        <p className="text-gray-600">Du må logge inn for å opprette en melding.</p>
        <Button onClick={() => setShowLoginModal(true)}>Logg inn</Button>
      </div>
    );
  }

  const canSubmit =
    title.trim().length > 0 &&
    description.trim().length > 0 &&
    location.trim().length > 0 &&
    date.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    const post = {
      id: `lf-${Date.now()}`,
      type,
      title: title.trim(),
      description: description.trim(),
      location: location.trim(),
      date,
      status: 'åpen' as const,
      authorId: currentUser.id,
      createdAt: new Date().toISOString(),
      comments: [],
    };

    addLostFoundPost(post);
    navigate(`/hittegods/${post.id}`);
  };

  const inputClass =
    'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none';

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <h1 className="text-xl font-semibold text-gray-800">Ny hittegods-melding</h1>

      {/* Type */}
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-700">Type *</span>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as LostFoundType)}
          className={inputClass}
        >
          {TYPE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </label>

      {/* Title */}
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-700">Tittel *</span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Kort beskrivelse av gjenstanden"
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
          placeholder="Beskriv gjenstanden og kjennetegn..."
          maxLength={2000}
          rows={4}
          className={inputClass}
        />
        <span className="text-xs text-gray-400">{description.length}/2000</span>
      </label>

      {/* Location */}
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-700">Sted *</span>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Hvor ble gjenstanden mistet/funnet?"
          maxLength={100}
          className={inputClass}
        />
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
