import { useTranslation } from 'react-i18next';
import './Projects.css';

function Projects() {
  const { t } = useTranslation();
  const assetPath = '/chiwebsite/assets';

  const projectList = [
    {
      title: t('project_recipe_title'),
      description: t('project_recipe_desc'),
      image: `${assetPath}/project1.png`,
      link: "https://github.com/wwiigh/AI-Project.git",
      tags: ["AI", "Python", "Generative"]
    },
    {
      title: "Coming Soon",
      description: t('award_coming_soon'),
      image: `${assetPath}/project1.png`, // 暫用同一張圖
      link: "#",
      tags: ["Future"]
    }
  ];

  return (
    <div className="projects-page">
      <header className="projects-header">
        <h1>{t('projects_title')}</h1>
      </header>
      <div className="projects-grid">
        {projectList.map((project, index) => (
          <div key={index} className="project-card">
            <div className="project-image">
              <img src={project.image} alt={project.title} />
              <div className="project-overlay">
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="github-link">
                  {t('project_github')}
                </a>
              </div>
            </div>
            <div className="project-info">
              <div className="project-tags">
                {project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
              </div>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
