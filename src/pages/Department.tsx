import { useTranslation } from 'react-i18next';
import './About.css';

function Department() {
  const { t } = useTranslation();
  const assetPath = '/chiwebsite/assets';

  return (
    <div className="about-page">
      <header className="about-header dept-header">
        <h1>{t('dept_title')}</h1>
      </header>
      <div className="about-sections">
        <div className="about-card left">
          <div className="about-image">
            <img src={`${assetPath}/department1.webp`} alt="NYCU CS" loading="lazy" />
          </div>
          <div className="about-text">
            <h2>{t('dept_name')}</h2>
            <p>{t('dept_desc_1')}</p>
          </div>
        </div>
        <div className="about-card right">
          <div className="about-image">
            <img src={`${assetPath}/department2.jpg`} alt="NYCU CS Architecture" loading="lazy" />
          </div>
          <div className="about-text">
            <h2>{t('dept_desc_2_title') || '整合與創新'}</h2>
            <p>{t('dept_desc_2')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Department;
