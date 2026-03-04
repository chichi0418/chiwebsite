import { useTranslation } from 'react-i18next';
import './About.css';

function About() {
  const { t } = useTranslation();
  const assetPath = '/chiwebsite/assets';

  const bioSections = [
    {
      title: t('bio_hi'),
      content: [t('bio_intro'), t('bio_current')],
      img: `${assetPath}/aboutme.jpg`,
      align: 'left'
    },
    {
      title: t('bio_hs_title'),
      content: [t('bio_hs_desc')],
      img: `${assetPath}/aboutme2.jpg`,
      align: 'right'
    },
    {
      title: t('bio_uni_1_title'),
      content: [t('bio_uni_1_desc')],
      img: `${assetPath}/aboutme3.jpg`,
      align: 'left'
    },
    {
      title: t('bio_uni_2_title'),
      content: [t('bio_uni_2_desc')],
      img: `${assetPath}/aboutme4.jpg`,
      align: 'right'
    }
  ];

  return (
    <div className="about-page">
      <header className="about-header">
        <h1>{t('about_me_title')}</h1>
      </header>
      <div className="about-sections">
        {bioSections.map((section, index) => (
          <div key={index} className={`about-card ${section.align}`}>
            <div className="about-image">
              <img src={section.img} alt={section.title} />
            </div>
            <div className="about-text">
              <h2>{section.title}</h2>
              {section.content.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;
