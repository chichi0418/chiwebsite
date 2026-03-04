import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">{t('welcome')}</Link>
      </div>
      <div className="navbar-links">
        <Link to="/home">{t('home')}</Link>
        <Link to="/about">{t('about')}</Link>
        <Link to="/highschool">{t('highschool')}</Link>
        <Link to="/department">{t('department')}</Link>
        <Link to="/projects">{t('projects')}</Link>
        <Link to="/awards">{t('awards')}</Link>
      </div>
      <div className="language-switch">
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
