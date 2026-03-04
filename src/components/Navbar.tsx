import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" onClick={() => setIsMenuOpen(false)}>{t('welcome')}</Link>
      </div>

      {/* 漢堡按鈕 */}
      <button className={`menu-toggle ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`navbar-links ${isMenuOpen ? 'show' : ''}`}>
        <Link to="/home" onClick={() => setIsMenuOpen(false)}>{t('home')}</Link>
        <Link to="/about" onClick={() => setIsMenuOpen(false)}>{t('about')}</Link>
        <Link to="/highschool" onClick={() => setIsMenuOpen(false)}>{t('highschool')}</Link>
        <Link to="/department" onClick={() => setIsMenuOpen(false)}>{t('department')}</Link>
        <Link to="/projects" onClick={() => setIsMenuOpen(false)}>{t('projects')}</Link>
        <Link to="/awards" onClick={() => setIsMenuOpen(false)}>{t('awards')}</Link>
        
        <div className="language-switch-mobile">
          <button 
            className={i18n.language.startsWith('zh') ? 'active' : ''} 
            onClick={() => changeLanguage('zh')}
          >
            ZH
          </button>
          <button 
            className={i18n.language.startsWith('en') ? 'active' : ''} 
            onClick={() => changeLanguage('en')}
          >
            EN
          </button>
        </div>
      </div>

      <div className="language-switch-desktop">
        <button 
          className={i18n.language.startsWith('zh') ? 'active' : ''} 
          onClick={() => changeLanguage('zh')}
        >
          ZH
        </button>
        <button 
          className={i18n.language.startsWith('en') ? 'active' : ''} 
          onClick={() => changeLanguage('en')}
        >
          EN
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
