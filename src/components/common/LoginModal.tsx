import { useApp } from '../../context/AppContext';
import { users } from '../../data/users';

export default function LoginModal() {
  const { showLoginModal, setShowLoginModal, login } = useApp();

  if (!showLoginModal) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40"
      onClick={() => setShowLoginModal(false)}
    >
      <div
        className="bg-white w-full max-w-[480px] rounded-t-2xl sm:rounded-2xl p-6 pb-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Velg en demo-bruker
          </h2>
          <button
            onClick={() => setShowLoginModal(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          Dette er en demo. Velg en bruker for å teste funksjonaliteten.
        </p>
        <ul className="space-y-2">
          {users.map((user) => (
            <li key={user.id}>
              <button
                onClick={() => login(user)}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors text-left"
              >
                <span className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-xl">
                  {user.avatar}
                </span>
                <span className="font-medium text-gray-800">{user.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
