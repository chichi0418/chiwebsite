import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Awards from './pages/Awards';
import CustomCursor from './components/CustomCursor';
import './App.css';

// Component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const { i18n } = useTranslation();
  const location = useLocation();

  return (
    <div className="app-container">
      <CustomCursor />
      <ScrollToTop />
      <Navbar />
      {/* Combined key triggers animation on BOTH route change and language switch */}
      <main className="main-content" key={`${i18n.language}-${location.pathname}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/awards" element={<Awards />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router basename="/chiwebsite">
      <AppContent />
    </Router>
  );
}

export default App;

