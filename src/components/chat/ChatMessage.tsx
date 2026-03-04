import { useNavigate } from 'react-router-dom';
import type { ChatMessage as ChatMessageType, BoardType } from '../../types';

function boardPath(board: BoardType, postId: string): string {
  const map: Record<BoardType, string> = {
    torget: `/marketplace/${postId}`,
    hendelser: `/events/${postId}`,
    hittegods: `/lost-found/${postId}`,
    oppslagstavla: `/general/${postId}`,
  };
  return map[board];
}

function boardLabel(board: BoardType): string {
  const map: Record<BoardType, string> = {
    torget: 'Torget',
    hendelser: 'Hva skjer?',
    hittegods: 'Hittegods',
    oppslagstavla: 'Oppslagstavla',
  };
  return map[board];
}

interface ChatMessageProps {
  message: ChatMessageType;
  onAction?: (action: string) => void;
}

export default function ChatMessage({ message, onAction }: ChatMessageProps) {
  const navigate = useNavigate();
  const isBot = message.sender === 'bot';

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-[85%] space-y-2`}>
        {isBot && (
          <span className="text-xs text-gray-500">Svali</span>
        )}

        <div
          className={`rounded-2xl px-4 py-2 text-sm ${
            isBot
              ? 'rounded-tl-sm bg-gray-100 text-gray-900'
              : 'rounded-tr-sm bg-blue-600 text-white'
          }`}
        >
          {message.text}
        </div>

        {message.cards && message.cards.length > 0 && (
          <div className="space-y-2">
            {message.cards.map((card) => (
              <button
                key={`${card.board}-${card.postId}`}
                type="button"
                onClick={() => navigate(boardPath(card.board, card.postId))}
                className="block w-full rounded-lg border border-gray-200 bg-white p-3 text-left transition-colors active:bg-gray-50"
              >
                <p className="text-xs text-blue-600">{boardLabel(card.board)}</p>
                <p className="text-sm font-semibold text-gray-900">{card.title}</p>
                {card.subtitle && (
                  <p className="text-xs text-gray-500">{card.subtitle}</p>
                )}
              </button>
            ))}
          </div>
        )}

        {message.actions && message.actions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {message.actions.map((action) => (
              <button
                key={action.action}
                type="button"
                onClick={() => onAction?.(action.action)}
                className="rounded-full border border-blue-600 px-4 py-1.5 text-sm font-medium text-blue-600 transition-colors active:bg-blue-50"
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
