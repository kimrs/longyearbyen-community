import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Button from '../common/Button';
import type { GeneralCategory } from '../../types';

const CATEGORY_OPTIONS: { value: GeneralCategory; label: string }[] = [
  { value: 'spørsmål', label: 'Spørsmål' },
  { value: 'informasjon', label: 'Informasjon' },
  { value: 'anbefaling', label: 'Anbefaling' },
  { value: 'diskusjon', label: 'Diskusjon' },
  { value: 'annet', label: 'Annet' },
];

export default function GeneralForm() {
  const { currentUser, addGeneralPost, setShowLoginModal } = useApp();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<GeneralCategory>('spørsmål');

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center gap-4 p-8 text-center">
        <p className="text-gray-600">Du må logge inn for å opprette et innlegg.</p>
        <Button onClick={() => setShowLoginModal(true)}>Logg inn</Button>
      </div>
    );
  }

  const canSubmit = title.trim().length > 0 && content.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    const post = {
      id: `gen-${Date.now()}`,
      title: title.trim(),
      content: content.trim(),
      category,
      authorId: currentUser.id,
      createdAt: new Date().toISOString(),
      comments: [],
    };

    addGeneralPost(post);
    navigate(`/oppslagstavla/${post.id}`);
  };

  const inputClass =
    'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none';

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <h1 className="text-xl font-semibold text-gray-800">Nytt innlegg</h1>

      {/* Category */}
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-700">Kategori *</span>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as GeneralCategory)}
          className={inputClass}
        >
          {CATEGORY_OPTIONS.map((o) => (
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
          placeholder="Skriv en tittel..."
          maxLength={100}
          className={inputClass}
        />
        <span className="text-xs text-gray-400">{title.length}/100</span>
      </label>

      {/* Content */}
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-700">Innhold *</span>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Skriv innholdet her..."
          maxLength={5000}
          rows={6}
          className={inputClass}
        />
        <span className="text-xs text-gray-400">{content.length}/5000</span>
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
