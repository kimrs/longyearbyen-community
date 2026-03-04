import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getUserById } from '../data/users';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import PlaceholderImage from '../components/common/PlaceholderImage';
import CountdownTimer from '../components/common/CountdownTimer';

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

const categoryLabels: Record<string, string> = {
  'kjøretøy-og-snøscooter': 'Kjøretøy og snøscooter',
  'klær-og-utstyr': 'Klær og utstyr',
  'møbler-og-hjem': 'Møbler og hjem',
  'elektronikk': 'Elektronikk',
  'våpen-og-sikkerhet': 'Våpen og sikkerhet',
  'sport-og-friluftsliv': 'Sport og friluftsliv',
  'annet': 'Annet',
};

export default function MarketplaceDetailPage() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { marketplacePosts, currentUser, addBid, addQuestion, addAnswer, setShowLoginModal } = useApp();

  const post = marketplacePosts.find((p) => p.id === postId);

  const [bidAmount, setBidAmount] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [answerTexts, setAnswerTexts] = useState<Record<string, string>>({});
  const [withinWindow, setWithinWindow] = useState(() =>
    post ? isWithinFiveMinutes(post.createdAt) : false
  );

  if (!post) {
    return (
      <div className="flex flex-col items-center gap-4 py-12">
        <p className="text-gray-500">Annonsen ble ikke funnet</p>
        <Button variant="secondary" onClick={() => navigate('/torget')}>
          Tilbake til Torget
        </Button>
      </div>
    );
  }

  const author = getUserById(post.authorId);
  const isAuthor = currentUser?.id === post.authorId;
  const canBid = post.type === 'til-salgs' && !post.sold && !withinWindow && !isAuthor;

  const handleBid = () => {
    if (!currentUser) {
      setShowLoginModal(true);
      return;
    }
    const amount = parseInt(bidAmount, 10);
    if (!amount || amount <= 0) return;
    addBid(post.id, {
      id: `bid-${Date.now()}`,
      userId: currentUser.id,
      amount,
      timestamp: new Date().toISOString(),
    });
    setBidAmount('');
  };

  const handleQuestion = () => {
    if (!currentUser) {
      setShowLoginModal(true);
      return;
    }
    if (!questionText.trim()) return;
    addQuestion(post.id, {
      id: `q-${Date.now()}`,
      userId: currentUser.id,
      text: questionText.trim(),
      timestamp: new Date().toISOString(),
    });
    setQuestionText('');
  };

  const handleAnswer = (questionId: string) => {
    const text = answerTexts[questionId]?.trim();
    if (!text) return;
    addAnswer(post.id, questionId, {
      text,
      timestamp: new Date().toISOString(),
    });
    setAnswerTexts((prev) => {
      const next = { ...prev };
      delete next[questionId];
      return next;
    });
  };

  return (
    <div className="flex flex-col pb-4">
      {/* Back button */}
      <button
        type="button"
        onClick={() => navigate('/torget')}
        className="flex items-center gap-1 px-3 py-2 text-sm text-blue-600"
      >
        ← Tilbake
      </button>

      {/* Image */}
      <PlaceholderImage className="h-56 w-full" alt={post.title} />

      {/* Post info */}
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <h1 className="text-xl font-semibold text-gray-900">{post.title}</h1>
          <Badge variant={post.type} />
        </div>

        {post.price != null && (
          <p className="text-lg font-bold text-blue-600">{post.price.toLocaleString('nb-NO')} kr</p>
        )}

        {post.sold && (
          <p className="text-sm font-semibold text-red-600">Solgt</p>
        )}

        <p className="text-sm text-gray-500">{categoryLabels[post.category]}</p>

        <p className="text-sm leading-relaxed text-gray-700">{post.description}</p>

        {/* Author info */}
        <div className="flex items-center gap-2 border-t border-gray-200 pt-3">
          <span className="text-2xl">{author?.avatar}</span>
          <div>
            <p className="text-sm font-medium text-gray-900">{author?.name}</p>
            <p className="text-xs text-gray-500">{timeAgo(post.createdAt)}</p>
          </div>
        </div>

        {/* 5-minute timer */}
        {withinWindow && !post.sold && (
          <div className="flex items-center gap-2 rounded-lg bg-amber-50 p-3">
            <CountdownTimer
              expiresAt={getFiveMinExpiry(post.createdAt)}
              onExpire={() => setWithinWindow(false)}
            />
            <span className="text-sm text-amber-800">
              Venter — budgivning åpner snart
            </span>
          </div>
        )}

        {/* Bidding section */}
        {post.type === 'til-salgs' && !post.sold && (
          <section className="flex flex-col gap-3 border-t border-gray-200 pt-4">
            <h2 className="text-base font-semibold text-gray-900">
              Bud ({post.bids.length})
            </h2>

            {post.bids.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {[...post.bids]
                  .sort((a, b) => b.amount - a.amount)
                  .map((bid) => {
                    const bidder = getUserById(bid.userId);
                    return (
                      <li key={bid.id} className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
                        <div className="flex items-center gap-2">
                          <span>{bidder?.avatar}</span>
                          <span className="text-sm text-gray-700">{bidder?.name}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-900">
                            {bid.amount.toLocaleString('nb-NO')} kr
                          </p>
                          <p className="text-xs text-gray-500">{timeAgo(bid.timestamp)}</p>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            ) : (
              <p className="text-sm text-gray-400">Ingen bud ennå</p>
            )}

            {canBid && currentUser && (
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Ditt bud (kr)"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                />
                <Button size="sm" onClick={handleBid}>
                  Legg inn bud
                </Button>
              </div>
            )}

            {withinWindow && !isAuthor && (
              <p className="text-xs text-amber-700">
                Budgivning er ikke åpen ennå. Vent til nedtellingen er ferdig.
              </p>
            )}

            {!currentUser && !post.sold && (
              <button
                type="button"
                onClick={() => setShowLoginModal(true)}
                className="text-sm text-blue-600"
              >
                Logg inn for å legge inn bud
              </button>
            )}
          </section>
        )}

        {/* Questions & Answers */}
        <section className="flex flex-col gap-3 border-t border-gray-200 pt-4">
          <h2 className="text-base font-semibold text-gray-900">
            Spørsmål og svar ({post.questions.length})
          </h2>

          {post.questions.length > 0 ? (
            <ul className="flex flex-col gap-3">
              {post.questions.map((q) => {
                const asker = getUserById(q.userId);
                return (
                  <li key={q.id} className="flex flex-col gap-2 rounded-lg bg-gray-50 p-3">
                    <div className="flex items-start gap-2">
                      <span>{asker?.avatar}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{asker?.name}</p>
                        <p className="text-sm text-gray-700">{q.text}</p>
                        <p className="text-xs text-gray-400">{timeAgo(q.timestamp)}</p>
                      </div>
                    </div>

                    {q.answer ? (
                      <div className="ml-6 flex items-start gap-2 border-l-2 border-blue-200 pl-3">
                        <span>{author?.avatar}</span>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{author?.name}</p>
                          <p className="text-sm text-gray-700">{q.answer.text}</p>
                          <p className="text-xs text-gray-400">{timeAgo(q.answer.timestamp)}</p>
                        </div>
                      </div>
                    ) : isAuthor && currentUser ? (
                      <div className="ml-6 flex gap-2">
                        <input
                          type="text"
                          placeholder="Skriv et svar..."
                          value={answerTexts[q.id] || ''}
                          onChange={(e) =>
                            setAnswerTexts((prev) => ({ ...prev, [q.id]: e.target.value }))
                          }
                          className="flex-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
                        />
                        <Button size="sm" onClick={() => handleAnswer(q.id)}>
                          Svar
                        </Button>
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-sm text-gray-400">Ingen spørsmål ennå</p>
          )}

          {/* Ask a question */}
          {currentUser && !isAuthor ? (
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Still et spørsmål..."
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
              <Button size="sm" onClick={handleQuestion}>
                Spør
              </Button>
            </div>
          ) : !currentUser ? (
            <button
              type="button"
              onClick={() => setShowLoginModal(true)}
              className="text-sm text-blue-600"
            >
              Logg inn for å stille spørsmål
            </button>
          ) : null}
        </section>
      </div>
    </div>
  );
}
