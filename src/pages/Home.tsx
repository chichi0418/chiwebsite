import { useTranslation } from 'react-i18next';
import './Home.css';

function Home() {
  const { t } = useTranslation();

  return (
    <div className="home-container">
      <div className="home-hero">
        <div className="hero-content">
          <div className="hero-tag">
            <span>Ping-Chi Hsu / 許秉棋</span>
          </div>
          <h1 className="hero-title">
            {t('welcome').split(' ').map((word, i) => (
              <span key={i} style={{ display: 'block' }}>{word}</span>
            ))}
          </h1>
          <p className="hero-subtitle">{t('intro_text')}</p>
          <div className="hero-buttons">
            <a 
              href="https://github.com/chichi0418" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="cta-button"
            >
              <span className="btn-label">[ ARCHIVE ]</span>
            </a>
            <a
              href="mailto:pinchi6266@gmail.com"
              className="cta-button secondary"
            >
              <span className="btn-label">[ CONTACT ]</span>
            </a>
          </div>
        </div>
        
        <div className="hero-image-container">
          <img 
            src="/chiwebsite/assets/home.jpg" 
            alt="Hero" 
            className="hero-image"
          />
        </div>
      </div>

      <div className="scroll-indicator">
        <span>Scroll to Explore</span>
      </div>
    </div>
  );
}

export default Home;
