import { useState, useEffect, type FormEvent } from 'react';

const STORAGE_KEY = 'email-signup-dismissed';
const FORMSPREE_URL = 'https://formspree.io/f/mbdzdbjv';

export default function EmailSignup() {
  const [dismissed, setDismissed] = useState(true);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) setDismissed(false);
  }, []);

  function dismiss() {
    setDismissed(true);
    localStorage.setItem(STORAGE_KEY, 'true');
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || status === 'sending') return;

    setStatus('sending');
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus('success');
        setTimeout(dismiss, 2000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (dismissed) return null;

  return (
    <div className="fixed bottom-15 left-0 right-0 z-45 flex justify-center pointer-events-none">
      <div className="w-full max-w-[480px] pointer-events-auto">
        <div className="mx-3 mb-2 bg-gray-900 text-white rounded-2xl p-4 shadow-lg">
          <div className="flex items-start justify-between gap-2 mb-2">
            <p className="text-sm font-medium leading-snug">
              Vil du ha denne appen i Longyearbyen? Legg igjen e-posten din!
            </p>
            <button
              onClick={dismiss}
              className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-gray-400 hover:text-white"
              aria-label="Lukk"
            >
              ✕
            </button>
          </div>

          {status === 'success' ? (
            <p className="text-sm text-green-400 font-medium">Takk! Vi holder deg oppdatert.</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="din@epost.no"
                className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 text-sm border border-gray-700 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={status === 'sending'}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 active:bg-blue-700 disabled:opacity-50 shrink-0"
              >
                {status === 'sending' ? 'Sender...' : status === 'error' ? 'Prøv igjen' : 'Send'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
