import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getUserById } from '../data/users';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';

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

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('nb-NO', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function LostFoundDetailPage() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { lostFoundPosts, currentUser, addComment, setShowLoginModal, markLostFoundResolved } = useApp();

  const post = lostFoundPosts.find((p) => p.id === postId);
  const [commentText, setCommentText] = useState('');

  if (!post) {
    return (
      <div className="flex flex-col items-center gap-4 py-12">
        <p className="text-gray-500">Innlegget ble ikke funnet</p>
        <Button variant="secondary" onClick={() => navigate('/hittegods')}>
          Tilbake til Hittegods
        </Button>
      </div>
    );
  }

  const author = getUserById(post.authorId);
  const isAuthor = currentUser?.id === post.authorId;
  const isResolved = post.status === 'løst';

  const handleComment = () => {
    if (!currentUser) {
      setShowLoginModal(true);
      return;
    }
    if (!commentText.trim()) return;
    addComment('hittegods', post.id, {
      id: `comment-${Date.now()}`,
      userId: currentUser.id,
      text: commentText.trim(),
      timestamp: new Date().toISOString(),
    });
    setCommentText('');
  };

  const handleMarkResolved = () => {
    markLostFoundResolved(post.id);
  };

  return (
    <div className="flex flex-col pb-4">
      {/* Back button */}
      <button
        type="button"
        onClick={() => navigate('/hittegods')}
        className="flex items-center gap-1 px-3 py-2 text-sm text-blue-600"
      >
        ← Tilbake
      </button>

      {/* Status banner */}
      <div className={`flex items-center justify-between px-4 py-3 ${isResolved ? 'bg-gray-100' : post.type === 'mistet' ? 'bg-red-50' : 'bg-green-50'}`}>
        <div className="flex items-center gap-3">
          <Badge variant={post.type} />
          <Badge variant={post.status} />
        </div>
        {isAuthor && !isResolved && (
          <Button size="sm" variant="secondary" onClick={handleMarkResolved}>
            Merk som løst
          </Button>
        )}
      </div>

      {/* Post info */}
      <div className="flex flex-col gap-3 p-4">
        <h1 className={`text-xl font-semibold ${isResolved ? 'text-gray-400' : 'text-gray-900'}`}>
          {post.title}
        </h1>

        <div className="flex flex-col gap-1 text-sm text-gray-500">
          <span>📍 {post.location}</span>
          <span>📅 {formatDate(post.date)}</span>
        </div>

        <p className={`text-sm leading-relaxed ${isResolved ? 'text-gray-400' : 'text-gray-700'}`}>
          {post.description}
        </p>

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
