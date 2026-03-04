import type { User } from '../types';

export const users: User[] = [
  {
    id: 'erik',
    name: 'Erik Hansen',
    avatar: '👨',
  },
  {
    id: 'maja',
    name: 'Maja Nordahl',
    avatar: '👩',
  },
  {
    id: 'lars',
    name: 'Lars Svendsen',
    avatar: '🧔',
  },
  {
    id: 'ingrid',
    name: 'Ingrid Paulsen',
    avatar: '👩‍🦰',
  },
];

export function getUserById(id: string): User | undefined {
  return users.find((u) => u.id === id);
}
