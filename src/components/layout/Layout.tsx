import { Outlet, useLocation } from 'react-router-dom';
import TopBar from './TopBar';
import BottomTabBar from './BottomTabBar';
import LoginModal from '../common/LoginModal';

const titles: Record<string, string> = {
  '/torget': 'Torget',
  '/hendelser': 'Hva skjer?',
  '/hittegods': 'Hittegods',
  '/oppslagstavla': 'Oppslagstavla',
  '/bot': 'Svali',
};

function getTitle(pathname: string): string {
  for (const [prefix, title] of Object.entries(titles)) {
    if (pathname.startsWith(prefix)) return title;
  }
  return 'Longyearbyen';
}

export default function Layout() {
  const { pathname } = useLocation();
  const title = getTitle(pathname);

  return (
    <div className="max-w-[480px] mx-auto min-h-screen relative bg-white">
      <TopBar title={title} />
      <main className="pt-12 pb-16 px-4">
        <Outlet />
      </main>
      <BottomTabBar />
      <LoginModal />
    </div>
  );
}
