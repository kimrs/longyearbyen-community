import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/layout/Layout';
import MarketplacePage from './pages/MarketplacePage';
import MarketplaceDetailPage from './pages/MarketplaceDetailPage';
import MarketplaceForm from './components/forms/MarketplaceForm';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import EventForm from './components/forms/EventForm';
import LostFoundPage from './pages/LostFoundPage';
import LostFoundDetailPage from './pages/LostFoundDetailPage';
import LostFoundForm from './components/forms/LostFoundForm';
import GeneralPage from './pages/GeneralPage';
import GeneralDetailPage from './pages/GeneralDetailPage';
import GeneralForm from './components/forms/GeneralForm';
import BotPage from './pages/BotPage';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/torget" replace />} />
            <Route path="/torget" element={<MarketplacePage />} />
            <Route path="/torget/ny" element={<MarketplaceForm />} />
            <Route path="/torget/:postId" element={<MarketplaceDetailPage />} />
            <Route path="/hendelser" element={<EventsPage />} />
            <Route path="/hendelser/ny" element={<EventForm />} />
            <Route path="/hendelser/:postId" element={<EventDetailPage />} />
            <Route path="/hittegods" element={<LostFoundPage />} />
            <Route path="/hittegods/ny" element={<LostFoundForm />} />
            <Route path="/hittegods/:postId" element={<LostFoundDetailPage />} />
            <Route path="/oppslagstavla" element={<GeneralPage />} />
            <Route path="/oppslagstavla/ny" element={<GeneralForm />} />
            <Route path="/oppslagstavla/:postId" element={<GeneralDetailPage />} />
            <Route path="/bot" element={<BotPage />} />
          </Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
