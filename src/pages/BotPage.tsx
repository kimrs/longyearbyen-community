import { useState, useRef, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { searchAllBoards, extractSearchTerm } from '../utils/botEngine';
import ChatMessage from '../components/chat/ChatMessage';
import ChatInput from '../components/chat/ChatInput';
import type { ChatMessage as ChatMessageType, MarketplacePost } from '../types';

function makeId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function now(): string {
  return new Date().toISOString();
}

const WELCOME_MESSAGE: ChatMessageType = {
  id: 'welcome',
  sender: 'bot',
  text: 'Hei! 👋 Jeg er Svali, din hjelper for Longyearbyen-samfunnet. Spør meg om noe du leter etter, så sjekker jeg Torget for deg!',
  timestamp: new Date().toISOString(),
};

type BotState = 'idle' | 'awaiting-create-confirm' | 'awaiting-post-confirm';

export default function BotPage() {
  const {
    currentUser,
    setShowLoginModal,
    marketplacePosts,
    eventPosts,
    lostFoundPosts,
    generalPosts,
    addMarketplacePost,
  } = useApp();

  const [messages, setMessages] = useState<ChatMessageType[]>([WELCOME_MESSAGE]);
  const [botState, setBotState] = useState<BotState>('idle');
  const [pendingSearchTerm, setPendingSearchTerm] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing, scrollToBottom]);

  function addBotMessage(
    text: string,
    extras?: Partial<Pick<ChatMessageType, 'cards' | 'actions'>>,
  ) {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: makeId(), sender: 'bot', text, timestamp: now(), ...extras },
      ]);
    }, 600);
  }

  function handleSend(text: string) {
    const userMsg: ChatMessageType = {
      id: makeId(),
      sender: 'user',
      text,
      timestamp: now(),
    };
    setMessages((prev) => [...prev, userMsg]);

    if (botState !== 'idle') return;

    const results = searchAllBoards(text, {
      marketplacePosts,
      eventPosts,
      lostFoundPosts,
      generalPosts,
    });

    const searchTerm = extractSearchTerm(text) || text;

    if (results.length > 0) {
      const topResults = results.slice(0, 3);
      addBotMessage(
        `Jeg fant ${results.length === 1 ? 'dette' : 'disse'} treffene:`,
        { cards: topResults },
      );
    } else {
      setPendingSearchTerm(searchTerm);
      setBotState('awaiting-create-confirm');
      addBotMessage(
        `Beklager, jeg fant ingen treff for «${searchTerm}». Vil du at jeg oppretter et «Ønskes kjøpt»-innlegg for deg?`,
        {
          actions: [
            { label: 'Ja, opprett innlegg', action: 'create-yes' },
            { label: 'Nei takk', action: 'create-no' },
          ],
        },
      );
    }
  }

  function handleAction(action: string) {
    if (action === 'create-yes') {
      if (!currentUser) {
        setShowLoginModal(true);
        addBotMessage('Du må logge inn først for å opprette innlegg.');
        setBotState('idle');
        return;
      }

      setBotState('awaiting-post-confirm');
      const title = pendingSearchTerm.charAt(0).toUpperCase() + pendingSearchTerm.slice(1);
      addBotMessage(
        `Her er et utkast:\n\n📌 Ønskes kjøpt: ${title}\n📝 Hei, jeg er på utkikk etter ${pendingSearchTerm}. Ta kontakt om du har noe!\n\nSer dette bra ut?`,
        {
          actions: [
            { label: 'Legg ut', action: 'post-confirm' },
            { label: 'Avbryt', action: 'post-cancel' },
          ],
        },
      );
    } else if (action === 'create-no') {
      setBotState('idle');
      addBotMessage('Greit! Spør meg gjerne om noe annet.');
    } else if (action === 'post-confirm') {
      if (!currentUser) {
        setShowLoginModal(true);
        addBotMessage('Du må logge inn først for å opprette innlegg.');
        setBotState('idle');
        return;
      }

      const title = pendingSearchTerm.charAt(0).toUpperCase() + pendingSearchTerm.slice(1);
      const newPost: MarketplacePost = {
        id: `mp-bot-${Date.now()}`,
        type: 'ønskes-kjøpt',
        title: `Ønskes kjøpt: ${title}`,
        description: `Hei, jeg er på utkikk etter ${pendingSearchTerm}. Ta kontakt om du har noe!`,
        category: 'annet',
        authorId: currentUser.id,
        createdAt: now(),
        bids: [],
        questions: [],
        sold: false,
      };
      addMarketplacePost(newPost);
      setBotState('idle');
      setPendingSearchTerm('');
      addBotMessage('Innlegget er lagt ut på Torget! 🎉');
    } else if (action === 'post-cancel') {
      setBotState('idle');
      setPendingSearchTerm('');
      addBotMessage('Avbrutt. Spør meg gjerne om noe annet!');
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} onAction={handleAction} />
        ))}

        {typing && (
          <div className="flex justify-start">
            <div className="max-w-[85%] space-y-1">
              <span className="text-xs text-gray-500">Svali</span>
              <div className="rounded-2xl rounded-tl-sm bg-gray-100 px-4 py-2 text-sm text-gray-500">
                <span className="inline-flex gap-1">
                  <span className="animate-bounce" style={{ animationDelay: '0ms' }}>.</span>
                  <span className="animate-bounce" style={{ animationDelay: '150ms' }}>.</span>
                  <span className="animate-bounce" style={{ animationDelay: '300ms' }}>.</span>
                </span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <ChatInput
        onSend={handleSend}
        disabled={typing}
        placeholder="Spør Svali om noe..."
      />
    </div>
  );
}
