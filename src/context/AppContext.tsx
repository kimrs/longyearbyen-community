/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type {
  AppState,
  User,
  MarketplacePost,
  EventPost,
  LostFoundPost,
  GeneralPost,
  ChatMessage,
  Bid,
  Comment,
  Question,
} from '../types';
import { marketplacePosts as initialMarketplace } from '../data/marketplace';
import { eventPosts as initialEvents } from '../data/events';
import { lostFoundPosts as initialLostFound } from '../data/lostFound';
import { generalPosts as initialGeneral } from '../data/general';

interface AppContextValue extends AppState {
  login: (user: User) => void;
  logout: () => void;
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
  addMarketplacePost: (post: MarketplacePost) => void;
  addEventPost: (post: EventPost) => void;
  addLostFoundPost: (post: LostFoundPost) => void;
  addGeneralPost: (post: GeneralPost) => void;
  addBid: (postId: string, bid: Bid) => void;
  addQuestion: (postId: string, question: Question) => void;
  addAnswer: (postId: string, questionId: string, answer: { text: string; timestamp: string }) => void;
  addComment: (board: 'hendelser' | 'hittegods' | 'oppslagstavla', postId: string, comment: Comment) => void;
  addChatMessage: (message: ChatMessage) => void;
  markLostFoundResolved: (postId: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [marketplacePosts, setMarketplacePosts] = useState<MarketplacePost[]>(initialMarketplace);
  const [eventPosts, setEventPosts] = useState<EventPost[]>(initialEvents);
  const [lostFoundPosts, setLostFoundPosts] = useState<LostFoundPost[]>(initialLostFound);
  const [generalPosts, setGeneralPosts] = useState<GeneralPost[]>(initialGeneral);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const login = useCallback((user: User) => {
    setCurrentUser(user);
    setShowLoginModal(false);
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  const addMarketplacePost = useCallback((post: MarketplacePost) => {
    setMarketplacePosts((prev) => [post, ...prev]);
  }, []);

  const addEventPost = useCallback((post: EventPost) => {
    setEventPosts((prev) => [post, ...prev]);
  }, []);

  const addLostFoundPost = useCallback((post: LostFoundPost) => {
    setLostFoundPosts((prev) => [post, ...prev]);
  }, []);

  const addGeneralPost = useCallback((post: GeneralPost) => {
    setGeneralPosts((prev) => [post, ...prev]);
  }, []);

  const addBid = useCallback((postId: string, bid: Bid) => {
    setMarketplacePosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, bids: [...p.bids, bid] } : p))
    );
  }, []);

  const addQuestion = useCallback((postId: string, question: Question) => {
    setMarketplacePosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, questions: [...p.questions, question] } : p))
    );
  }, []);

  const addAnswer = useCallback(
    (postId: string, questionId: string, answer: { text: string; timestamp: string }) => {
      setMarketplacePosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? {
                ...p,
                questions: p.questions.map((q) =>
                  q.id === questionId ? { ...q, answer } : q
                ),
              }
            : p
        )
      );
    },
    []
  );

  const addComment = useCallback(
    (board: 'hendelser' | 'hittegods' | 'oppslagstavla', postId: string, comment: Comment) => {
      const updater = (prev: { id: string; comments: Comment[] }[]) =>
        prev.map((p) => (p.id === postId ? { ...p, comments: [...p.comments, comment] } : p));

      if (board === 'hendelser') {
        setEventPosts((prev) => updater(prev) as EventPost[]);
      } else if (board === 'hittegods') {
        setLostFoundPosts((prev) => updater(prev) as LostFoundPost[]);
      } else {
        setGeneralPosts((prev) => updater(prev) as GeneralPost[]);
      }
    },
    []
  );

  const markLostFoundResolved = useCallback((postId: string) => {
    setLostFoundPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, status: 'løst' as const } : p))
    );
  }, []);

  const addChatMessage = useCallback((message: ChatMessage) => {
    setChatMessages((prev) => [...prev, message]);
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        showLoginModal,
        setShowLoginModal,
        marketplacePosts,
        eventPosts,
        lostFoundPosts,
        generalPosts,
        chatMessages,
        login,
        logout,
        addMarketplacePost,
        addEventPost,
        addLostFoundPost,
        addGeneralPost,
        addBid,
        addQuestion,
        addAnswer,
        addComment,
        addChatMessage,
        markLostFoundResolved,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextValue {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
