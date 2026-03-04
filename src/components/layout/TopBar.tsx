import { useApp } from '../../context/AppContext';

export default function TopBar({ title }: { title: string }) {
  const { currentUser, setShowLoginModal, logout } = useApp();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 h-12 flex items-center justify-between px-4">
      <h1 className="text-lg font-semibold text-gray-800 truncate">{title}</h1>
      {currentUser ? (
        <button
          onClick={logout}
          className="flex items-center gap-2 text-sm text-gray-600"
        >
          <span className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-xs font-medium text-blue-700">
            {currentUser.name.charAt(0)}
          </span>
          <span className="hidden sm:inline">{currentUser.name}</span>
        </button>
      ) : (
        <button
          onClick={() => setShowLoginModal(true)}
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          Logg inn
        </button>
      )}
    </header>
  );
}
