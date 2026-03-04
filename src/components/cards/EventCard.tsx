import type { EventPost } from '../../types';
import Badge from '../common/Badge';

const categoryLabels: Record<string, string> = {
  'kultur-og-underholdning': 'Kultur',
  'sport-og-friluftsliv': 'Sport & friluft',
  'barn-og-familie': 'Barn & familie',
  'kurs-og-foredrag': 'Kurs & foredrag',
  'dugnad-og-frivillig': 'Dugnad',
  'fest-og-sosialt': 'Fest & sosialt',
  'annet': 'Annet',
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('nb-NO', { day: 'numeric', month: 'short' });
}

function isPast(dateStr: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(dateStr + 'T00:00:00') < today;
}

interface EventCardProps {
  post: EventPost;
  onClick?: () => void;
}

export default function EventCard({ post, onClick }: EventCardProps) {
  const past = isPast(post.date);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full gap-3 rounded-lg bg-gray-100 p-3 text-left transition-colors active:bg-gray-200 ${past ? 'opacity-50' : ''}`}
    >
      <div className="flex h-16 w-16 flex-shrink-0 flex-col items-center justify-center rounded-md bg-blue-50 text-blue-700">
        <span className="text-lg font-bold leading-tight">{new Date(post.date + 'T00:00:00').getDate()}</span>
        <span className="text-xs uppercase">
          {new Date(post.date + 'T00:00:00').toLocaleDateString('nb-NO', { month: 'short' })}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="truncate text-sm font-semibold text-gray-900">{post.title}</h3>
          <Badge variant="default" label={categoryLabels[post.category] || post.category} />
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          {post.time && <span>🕐 {post.time}</span>}
          <span>📍 {post.location}</span>
        </div>

        <div className="mt-auto flex items-center gap-3 text-xs text-gray-500">
          <span>{formatDate(post.date)}</span>
          {post.comments.length > 0 && (
            <span>{post.comments.length} kommentar{post.comments.length !== 1 ? 'er' : ''}</span>
          )}
          {past && <span className="font-medium text-gray-400">Avsluttet</span>}
        </div>
      </div>
    </button>
  );
}
