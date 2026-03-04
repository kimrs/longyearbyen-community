import type { LostFoundPost } from '../../types';
import Badge from '../common/Badge';

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('nb-NO', { day: 'numeric', month: 'short' });
}

interface LostFoundCardProps {
  post: LostFoundPost;
  onClick?: () => void;
}

export default function LostFoundCard({ post, onClick }: LostFoundCardProps) {
  const resolved = post.status === 'løst';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full gap-3 rounded-lg bg-gray-100 p-3 text-left transition-colors active:bg-gray-200 ${resolved ? 'opacity-50' : ''}`}
    >
      <div
        className={`flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-md text-2xl ${
          post.type === 'mistet' ? 'bg-red-50' : 'bg-green-50'
        }`}
      >
        {post.type === 'mistet' ? '🔍' : '📦'}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="truncate text-sm font-semibold text-gray-900">{post.title}</h3>
          <Badge variant={post.type} />
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>📍 {post.location}</span>
        </div>

        <div className="mt-auto flex items-center gap-3 text-xs text-gray-500">
          <span>{formatDate(post.date)}</span>
          {post.comments.length > 0 && (
            <span>{post.comments.length} kommentar{post.comments.length !== 1 ? 'er' : ''}</span>
          )}
          {resolved && <span className="font-medium text-gray-400">Løst</span>}
        </div>
      </div>
    </button>
  );
}
