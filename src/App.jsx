import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
// Notice these imports now match your singular file names exactly:
import ArtsPage from './pages/arts/ArtPage'; 
import TraditionsPage from './pages/traditions/TraditionPage';
import FestivalsPage from './pages/festivals/FestivalPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/arts" element={<ArtsPage />} />
        <Route path="/traditions" element={<TraditionsPage />} />
        <Route path="/festivals" element={<FestivalsPage />} />
      </Routes>
    </Router>
  );
}

export default App;