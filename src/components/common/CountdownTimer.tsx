import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  expiresAt: string;
  onExpire?: () => void;
  className?: string;
}

function getTimeLeft(expiresAt: string): number {
  return Math.max(0, new Date(expiresAt).getTime() - Date.now());
}

function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export default function CountdownTimer({ expiresAt, onExpire, className = '' }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(expiresAt));

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      const remaining = getTimeLeft(expiresAt);
      setTimeLeft(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        onExpire?.();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt, onExpire, timeLeft]);

  if (timeLeft <= 0) {
    return (
      <span className={`text-sm font-medium text-gray-500 ${className}`}>
        Utløpt
      </span>
    );
  }

  const isUrgent = timeLeft < 60_000;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800 ${isUrgent ? 'animate-pulse' : ''} ${className}`}
    >
      ⏱ {formatTime(timeLeft)}
    </span>
  );
}
