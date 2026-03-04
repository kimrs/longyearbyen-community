interface PlaceholderImageProps {
  alt?: string;
  className?: string;
  icon?: string;
}

export default function PlaceholderImage({ alt = 'Plassholder', className = '', icon = '📷' }: PlaceholderImageProps) {
  return (
    <div
      className={`flex items-center justify-center bg-gray-200 text-gray-400 ${className}`}
      role="img"
      aria-label={alt}
    >
      <span className="text-2xl">{icon}</span>
    </div>
  );
}
