import { NavLink } from 'react-router-dom';

const tabs = [
  { to: '/torget', label: 'Torget', icon: '🏪' },
  { to: '/hendelser', label: 'Hva skjer?', icon: '📅' },
  { to: '/hittegods', label: 'Hittegods', icon: '🔍' },
  { to: '/oppslagstavla', label: 'Oppslag', icon: '📌' },
  { to: '/bot', label: 'Svali', icon: '💬' },
];

export default function BottomTabBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 pb-[env(safe-area-inset-bottom)]">
      <div className="flex justify-around items-center h-15">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-0.5 flex-1 py-2 text-xs ${
                isActive ? 'text-blue-600 font-medium' : 'text-gray-500'
              }`
            }
          >
            <span className="text-xl leading-none">{tab.icon}</span>
            <span>{tab.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
