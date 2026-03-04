import type { GeneralPost } from '../../types';
import { getUserById } from '../../data/users';
import Badge from '../common/Badge';

function timeAgo(dateStr: string): string {
  const now = new Date();
  const then = new Date(dateStr);
  const diffMs = now.getTime() - then.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return 'nå';
  if (diffMin < 60) return `${diffMin} min siden`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours} t siden`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} d siden`;
}

const categoryIcons: Record<string, string> = {
  'spørsmål': '❓',
  'informasjon': 'ℹ️',
  'anbefaling': '⭐',
  'diskusjon': '💬',
  'annet': '📌',
};

interface GeneralCardProps {
  post: GeneralPost;
  onClick?: () => void;
}

export default function GeneralCard({ post, onClick }: GeneralCardProps) {
  const author = getUserById(post.authorId);

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full gap-3 rounded-lg bg-gray-100 p-3 text-left transition-colors active:bg-gray-200"
    >
      <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-md bg-gray-50 text-2xl">
        {categoryIcons[post.category] || '📌'}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="truncate text-sm font-semibold text-gray-900">{post.title}</h3>
          <Badge variant={post.category} />
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          {author && <span>{author.avatar} {author.name}</span>}
        </div>

        <div className="mt-auto flex items-center gap-3 text-xs text-gray-500">
          <span>{timeAgo(post.createdAt)}</span>
          {post.comments.length > 0 && (
            <span>{post.comments.length} kommentar{post.comments.length !== 1 ? 'er' : ''}</span>
          )}
        </div>
      </div>
    </button>
  );
}
