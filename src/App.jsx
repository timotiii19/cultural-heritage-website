import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SiteLayout from './components/SiteLayout';
import Home from './pages/Home';
// Notice these imports now match your singular file names exactly:
import ArtsPage from './pages/arts/ArtPage'; 
import TraditionsPage from './pages/traditions/TraditionPage';
import TraditionCategoryPage from './pages/traditions/TraditionCategoryPage';
import TraditionDetailPage from './pages/traditions/TraditionDetailPage';
import FestivalsPage from './pages/festivals/FestivalPage';
import ReferencesPage from './pages/ReferencesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/arts" element={<ArtsPage />} />
          <Route path="/references" element={<ReferencesPage />} />
          <Route path="/traditions" element={<TraditionsPage />} />
          <Route path="/traditions/:categoryId" element={<TraditionCategoryPage />} />
          <Route path="/traditions/:categoryId/:entryId" element={<TraditionDetailPage />} />
          <Route path="/festivals" element={<FestivalsPage />} />
          <Route path="/developers" element={<Navigate to="/#team" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
