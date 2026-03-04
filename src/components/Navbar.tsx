import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-logo">
        <Link to="/" onClick={() => setIsMenuOpen(false)}>
          CHI / P.C. HSU
        </Link>
      </div>

      <div className={`navbar-links ${isMenuOpen ? 'show' : ''}`}>
        <Link to="/home" className={location.pathname === '/home' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>{t('home')}</Link>
        <Link to="/about" className={location.pathname === '/about' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>{t('about')}</Link>
        <Link to="/projects" className={location.pathname === '/projects' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>{t('projects')}</Link>
        <Link to="/awards" className={location.pathname === '/awards' ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>{t('awards')}</Link>
      </div>

      <div className="navbar-right">
        <div className="language-switch">
          <button
            className={i18n.language.startsWith('en') ? 'active' : ''}
            onClick={() => changeLanguage('en')}
          >
            EN
          </button>
          <span className="lang-separator">/</span>
          <button
            className={i18n.language.startsWith('zh') ? 'active' : ''}
            onClick={() => changeLanguage('zh')}
          >
            CH
          </button>
        </div>

        <button
          className={`menu-toggle ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? '關閉選單' : '開啟選單'}
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
