import { useTranslation } from 'react-i18next';
import './About.css'; // 共用 About 的樣式

function HighSchool() {
  const { t } = useTranslation();
  const assetPath = '/chiwebsite/assets';

  return (
    <div className="about-page">
      <header className="about-header hs-header">
        <h1>{t('hs_title')}</h1>
      </header>
      <div className="about-sections">
        <div className="about-card left">
          <div className="about-image">
            <img src={`${assetPath}/highschool.jpg`} alt="CKHS" loading="lazy" />
          </div>
          <div className="about-text">
            <h2>{t('hs_school_name')}</h2>
            <p>{t('hs_desc_1')}</p>
            <p>{t('hs_desc_2')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HighSchool;
