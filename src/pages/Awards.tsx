import { useTranslation } from 'react-i18next';
import './Awards.css';

function Awards() {
  const { t } = useTranslation();

  return (
    <div className="awards-page">
      <header className="awards-header">
        <h1>{t('awards_title')}</h1>
      </header>
      <div className="awards-content">
        <div className="award-badge-container">
          <div className="award-badge">
            <span className="medal-icon">[*]</span>
            <h2>{t('award_coming_soon')}</h2>
            <p>Continuously seeking new challenges and technological milestones.</p>
          </div>
          
          <div className="award-badge disabled">
            <span className="medal-icon">[—]</span>
            <h2>UPCOMING</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Awards;
