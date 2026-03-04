import { useTranslation } from 'react-i18next';
import './Home.css';

function Home() {
  const { t } = useTranslation();

  return (
    <div className="home-container">
      <div className="home-hero">
        <h1 className="hero-title">{t('welcome')}</h1>
        <p className="hero-subtitle">{t('intro_text')}</p>
        <div className="hero-buttons">
          <a 
            href="https://github.com/chichi0418" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="cta-button"
          >
            {t('explore_projects')}
          </a>
          <button className="cta-button secondary">{t('contact_me')}</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
