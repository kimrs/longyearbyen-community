import type { MarketplacePostType, LostFoundType, LostFoundStatus, GeneralCategory } from '../../types';

type BadgeVariant = MarketplacePostType | LostFoundType | LostFoundStatus | GeneralCategory | 'default';

const variantStyles: Record<BadgeVariant, string> = {
  'til-salgs': 'bg-blue-100 text-blue-800',
  'ønskes-kjøpt': 'bg-orange-100 text-orange-800',
  'gis-bort': 'bg-green-100 text-green-800',
  'mistet': 'bg-red-100 text-red-800',
  'funnet': 'bg-green-100 text-green-800',
  'åpen': 'bg-yellow-100 text-yellow-800',
  'løst': 'bg-gray-100 text-gray-600',
  'spørsmål': 'bg-purple-100 text-purple-800',
  'informasjon': 'bg-blue-100 text-blue-800',
  'anbefaling': 'bg-green-100 text-green-800',
  'diskusjon': 'bg-yellow-100 text-yellow-800',
  'annet': 'bg-gray-100 text-gray-700',
  'default': 'bg-gray-100 text-gray-700',
};

const variantLabels: Record<string, string> = {
  'til-salgs': 'Til salgs',
  'ønskes-kjøpt': 'Ønskes kjøpt',
  'gis-bort': 'Gis bort',
  'mistet': 'Mistet',
  'funnet': 'Funnet',
  'åpen': 'Åpen',
  'løst': 'Løst',
  'spørsmål': 'Spørsmål',
  'informasjon': 'Informasjon',
  'anbefaling': 'Anbefaling',
  'diskusjon': 'Diskusjon',
  'annet': 'Annet',
};

interface BadgeProps {
  variant: BadgeVariant;
  label?: string;
  className?: string;
}

export default function Badge({ variant, label, className = '' }: BadgeProps) {
  const styles = variantStyles[variant] || variantStyles.default;
  const text = label || variantLabels[variant] || variant;

  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${styles} ${className}`}
    >
      {text}
    </span>
  );
}
