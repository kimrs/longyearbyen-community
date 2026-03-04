import type { MarketplacePost } from '../../types';
import Badge from '../common/Badge';
import PlaceholderImage from '../common/PlaceholderImage';
import CountdownTimer from '../common/CountdownTimer';

const FIVE_MINUTES = 5 * 60 * 1000;

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

function isWithinFiveMinutes(createdAt: string): boolean {
  return Date.now() - new Date(createdAt).getTime() < FIVE_MINUTES;
}

function getFiveMinExpiry(createdAt: string): string {
  return new Date(new Date(createdAt).getTime() + FIVE_MINUTES).toISOString();
}

interface MarketplaceCardProps {
  post: MarketplacePost;
  onClick?: () => void;
}

export default function MarketplaceCard({ post, onClick }: MarketplaceCardProps) {
  const withinWindow = isWithinFiveMinutes(post.createdAt);

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full gap-3 rounded-lg bg-gray-100 p-3 text-left transition-colors active:bg-gray-200"
    >
      <PlaceholderImage className="h-20 w-20 flex-shrink-0 rounded-md" alt={post.title} />

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="truncate text-sm font-semibold text-gray-900">{post.title}</h3>
          <Badge variant={post.type} />
        </div>

        {post.price != null && (
          <p className="text-sm font-medium text-blue-600">{post.price.toLocaleString('nb-NO')} kr</p>
        )}

        <div className="mt-auto flex items-center gap-3 text-xs text-gray-500">
          <span>{timeAgo(post.createdAt)}</span>

          {post.bids.length > 0 && (
            <span>{post.bids.length} bud</span>
          )}

          {post.questions.length > 0 && (
            <span>{post.questions.length} spm</span>
          )}

          {post.sold && (
            <span className="font-medium text-red-600">Solgt</span>
          )}

          {withinWindow && !post.sold && (
            <CountdownTimer expiresAt={getFiveMinExpiry(post.createdAt)} />
          )}
        </div>
      </div>
    </button>
  );
}
