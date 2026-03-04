import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getUserById } from '../data/users';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';

const categoryLabels: Record<string, string> = {
  'kultur-og-underholdning': 'Kultur og underholdning',
  'sport-og-friluftsliv': 'Sport og friluftsliv',
  'barn-og-familie': 'Barn og familie',
  'kurs-og-foredrag': 'Kurs og foredrag',
  'dugnad-og-frivillig': 'Dugnad og frivillig',
  'fest-og-sosialt': 'Fest og sosialt',
  'annet': 'Annet',
};

function formatEventDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('nb-NO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

function isPast(dateStr: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(dateStr + 'T00:00:00') < today;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'Nå';
  if (minutes < 60) return `${minutes} min siden`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} t siden`;
  const days = Math.floor(hours / 24);
  return `${days} d siden`;
}

export default function EventDetailPage() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { eventPosts, currentUser, addComment, setShowLoginModal } = useApp();

  const post = eventPosts.find((p) => p.id === postId);
  const [commentText, setCommentText] = useState('');

  if (!post) {
    return (
      <div className="flex flex-col items-center gap-4 py-12">
        <p className="text-gray-500">Hendelsen ble ikke funnet</p>
        <Button variant="secondary" onClick={() => navigate('/hendelser')}>
          Tilbake til Hva skjer?
        </Button>
      </div>
    );
  }

  const author = getUserById(post.authorId);
  const past = isPast(post.date);

  const handleComment = () => {
    if (!currentUser) {
      setShowLoginModal(true);
      return;
    }
    if (!commentText.trim()) return;
    addComment('hendelser', post.id, {
      id: crypto.randomUUID(),
      userId: currentUser.id,
      text: commentText.trim(),
      timestamp: new Date().toISOString(),
    });
    setCommentText('');
  };

  return (
    <div className="flex flex-col pb-4">
      {/* Back button */}
      <button
        type="button"
        onClick={() => navigate('/hendelser')}
        className="flex items-center gap-1 px-3 py-2 text-sm text-blue-600"
      >
        ← Tilbake
      </button>

      {/* Date banner */}
      <div className={`flex items-center gap-4 px-4 py-4 ${past ? 'bg-gray-100' : 'bg-blue-50'}`}>
        <div className={`flex h-16 w-16 flex-shrink-0 flex-col items-center justify-center rounded-md ${past ? 'bg-gray-200 text-gray-500' : 'bg-blue-100 text-blue-700'}`}>
          <span className="text-lg font-bold leading-tight">{new Date(post.date + 'T00:00:00').getDate()}</span>
          <span className="text-xs uppercase">
            {new Date(post.date + 'T00:00:00').toLocaleDateString('nb-NO', { month: 'short' })}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm capitalize text-gray-700">{formatEventDate(post.date)}</p>
          {post.time && <p className="text-sm text-gray-600">🕐 {post.time}</p>}
          {past && <p className="text-xs font-medium text-gray-400">Avsluttet</p>}
        </div>
      </div>

      {/* Post info */}
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <h1 className="text-xl font-semibold text-gray-900">{post.title}</h1>
          <Badge variant="default" label={categoryLabels[post.category] || post.category} />
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>📍 {post.location}</span>
        </div>

        <p className="text-sm leading-relaxed text-gray-700">{post.description}</p>

        {/* Author info */}
        <div className="flex items-center gap-2 border-t border-gray-200 pt-3">
          <span className="text-2xl">{author?.avatar}</span>
          <div>
            <p className="text-sm font-medium text-gray-900">{author?.name}</p>
            <p className="text-xs text-gray-500">Lagt ut {timeAgo(post.createdAt)}</p>
          </div>
        </div>

        {/* Comments section */}
        <section className="flex flex-col gap-3 border-t border-gray-200 pt-4">
          <h2 className="text-base font-semibold text-gray-900">
            Kommentarer ({post.comments.length})
          </h2>

          {post.comments.length > 0 ? (
            <ul className="flex flex-col gap-2">
              {post.comments.map((c) => {
                const commenter = getUserById(c.userId);
                return (
                  <li key={c.id} className="flex items-start gap-2 rounded-lg bg-gray-50 p-3">
                    <span>{commenter?.avatar}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{commenter?.name}</p>
                      <p className="text-sm text-gray-700">{c.text}</p>
                      <p className="text-xs text-gray-400">{timeAgo(c.timestamp)}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-sm text-gray-400">Ingen kommentarer ennå</p>
          )}

          {/* Add comment */}
          {currentUser ? (
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Skriv en kommentar..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleComment()}
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
              <Button size="sm" onClick={handleComment}>
                Send
              </Button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowLoginModal(true)}
              className="text-sm text-blue-600"
            >
              Logg inn for å kommentere
            </button>
          )}
        </section>
      </div>
    </div>
  );
}
