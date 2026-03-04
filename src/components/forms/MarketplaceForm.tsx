import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Button from '../common/Button';
import type { MarketplacePostType, MarketplaceCategory } from '../../types';

const TYPE_OPTIONS: { value: MarketplacePostType; label: string }[] = [
  { value: 'til-salgs', label: 'Til salgs' },
  { value: 'ønskes-kjøpt', label: 'Ønskes kjøpt' },
  { value: 'gis-bort', label: 'Gis bort' },
];

const CATEGORY_OPTIONS: { value: MarketplaceCategory; label: string }[] = [
  { value: 'kjøretøy-og-snøscooter', label: 'Kjøretøy og snøscooter' },
  { value: 'klær-og-utstyr', label: 'Klær og utstyr' },
  { value: 'møbler-og-hjem', label: 'Møbler og hjem' },
  { value: 'elektronikk', label: 'Elektronikk' },
  { value: 'våpen-og-sikkerhet', label: 'Våpen og sikkerhet' },
  { value: 'sport-og-friluftsliv', label: 'Sport og friluftsliv' },
  { value: 'annet', label: 'Annet' },
];

export default function MarketplaceForm() {
  const { currentUser, addMarketplacePost, setShowLoginModal } = useApp();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState<MarketplacePostType>('til-salgs');
  const [category, setCategory] = useState<MarketplaceCategory>('annet');

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center gap-4 p-8 text-center">
        <p className="text-gray-600">Du må logge inn for å opprette en annonse.</p>
        <Button onClick={() => setShowLoginModal(true)}>Logg inn</Button>
      </div>
    );
  }

  const canSubmit = title.trim().length > 0 && description.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    const post = {
      id: `mp-${Date.now()}`,
      type,
      title: title.trim(),
      description: description.trim(),
      price: price ? Number(price) : undefined,
      category,
      authorId: currentUser.id,
      createdAt: new Date().toISOString(),
      bids: [],
      questions: [],
      sold: false,
    };

    addMarketplacePost(post);
    navigate(`/torget/${post.id}`);
  };

  const inputClass =
    'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none';

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <h1 className="text-xl font-semibold text-gray-800">Ny annonse</h1>

      {/* Type */}
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-700">Type *</span>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as MarketplacePostType)}
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
          placeholder="Hva selger eller søker du?"
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
          placeholder="Beskriv varen eller hva du leter etter..."
          maxLength={2000}
          rows={4}
          className={inputClass}
        />
        <span className="text-xs text-gray-400">{description.length}/2000</span>
      </label>

      {/* Price */}
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-700">Pris (NOK)</span>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Valgfritt"
          min={0}
          className={inputClass}
        />
      </label>

      {/* Category */}
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-700">Kategori *</span>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as MarketplaceCategory)}
          className={inputClass}
        >
          {CATEGORY_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </label>

      {/* Image placeholder */}
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-700">Bilder</span>
        <div className="flex h-20 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-sm text-gray-400">
          Bildeopplasting (kommer snart)
        </div>
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
