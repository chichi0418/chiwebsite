import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "welcome": "Welcome to My World",
      "intro_text": "I am a developer passionate about building modern web experiences.",
      "about_me_title": "About Me",
      "bio_hi": "Hi, I'm Ping-Chi Hsu",
      "bio_intro": "I grew up in Taipei but originally from Tainan. I studied at Chien Kuo High School and was active in the Student Association.",
      "bio_current": "Currently, I'm a student at National Yang Ming Chiao Tung University (NYCU), majoring in Computer Science.",
      "bio_hs_title": "High School (2018.9 - 2021.6)",
      "bio_hs_desc": "At CKHS, I served as the Public Relations Officer for the Student Association, acting as a bridge between the school, students, and external organizations.",
      "bio_uni_1_title": "University (2021.9 - 2023.6)",
      "bio_uni_1_desc": "I first studied Mechanical Engineering at NTU, where I enjoyed skateboarding and playing basketball in my free time.",
      "bio_uni_2_title": "University (2023.9 - Now)",
      "bio_uni_2_desc": "Life is full of surprises. After deep consideration, I decided to pursue Computer Science at NYCU. Now I'm also into Breaking (Street Dance)!",
      "hs_title": "High School Life",
      "hs_school_name": "Taipei Municipal Chien Kuo High School (CKHS)",
      "hs_desc_1": "CKHS is a prestigious high school in Taipei, known for its academic excellence and rich history. It has been a cradle for leaders in various fields since its founding.",
      "hs_desc_2": "The school emphasizes holistic development, excelling not only in sciences and arts but also in sports and music.",
      "dept_title": "Department Info",
      "dept_name": "Department of Computer Science, NYCU",
      "dept_desc_1": "Computer science is the greatest invention of the 20th century. NYCU's CS department has been at the forefront of this revolution in Taiwan.",
      "dept_desc_2": "Established in 1980, the department has grown into the largest and most well-equipped CS program in the country, fostering top-tier engineering talent.",
      "projects_title": "Projects",
      "project_recipe_title": "Generative Recipes",
      "project_recipe_desc": "Ever had too many near-expiry ingredients and didn't know what to do? Generative Recipes solves this by creating delicious dishes based on what you have!",
      "project_github": "View on GitHub",
      "awards_title": "Awards & Honors",
      "award_coming_soon": "Stay tuned for more updates!",
      "explore_projects": "Explore Projects",
      "contact_me": "Contact Me",
      "select_language": "Please select your preferred language:",
      "chinese": "Chinese",
      "english": "English",
      "elements": "Elements",
      "home": "Home",
      "about": "About",
      "projects": "Projects",
      "awards": "Awards",
      "highschool": "High School",
      "department": "Department",
      "go_to_home": "Go to Home"
    }
  },
  zh: {
    translation: {
      "welcome": "歡迎來到我的世界",
      "intro_text": "我是一名熱衷於打造現代化網頁體驗的開發者。",
      "about_me_title": "關於我",
      "bio_hi": "嗨，我是許秉棋",
      "bio_intro": "我是一位在台北長大的台南人，高中時就讀建國中學，期間參與了班聯會。",
      "bio_current": "目前就讀於陽明交通大學資訊工程學系。",
      "bio_hs_title": "高中生活 (2018.9 - 2021.6)",
      "bio_hs_desc": "我就讀建國高中，曾擔任班聯會公關長，負責學校、學生及校外的溝通橋樑，培養了團隊領導與合作能力。",
      "bio_uni_1_title": "大學生活 (2021.9 - 2023.6)",
      "bio_uni_1_desc": "高中畢業後，我曾就讀台大機械系。除了學業，我也參與了滑板社與系籃，兼顧健康與生活。",
      "bio_uni_2_title": "大學生活 (2023.9 - 至今)",
      "bio_uni_2_desc": "人生充滿意外，深思熟慮後我重新考取交大資工系。目前也熱衷於熱舞社的 Breaking 舞風！",
      "hs_title": "高中生活",
      "hs_school_name": "台北市立建國高級中學",
      "hs_desc_1": "建國中學是台北市著名的頂尖高中，擁有悠久的歷史。除了學術表現卓越，也重視體育與藝術發展。",
      "hs_desc_2": "校內設施齊全，包含現代化實驗室與體育館。畢業生多數進入全球頂尖大學深造。",
      "dept_title": "系所介紹",
      "dept_name": "陽明交通大學資訊工程學系",
      "dept_desc_1": "電腦是20世紀最偉大的發明，交大資工自1980年成立以來，一直是台灣資訊產業發展的核心推動力。",
      "dept_desc_2": "目前為全台第一大資訊科系，擁有最充沛的師資與實驗設備，致力於培育下一代精英資訊人才。",
      "projects_title": "專案經歷",
      "project_recipe_title": "生成式食譜",
      "project_recipe_desc": "在生活中，你曾經有過手邊剩餘太多即期食材卻不知道該如何處理的窘境嗎？透過生成式食譜，幫你製作出美味佳餚！",
      "project_github": "在 GitHub 上查看",
      "awards_title": "獲獎紀錄",
      "award_coming_soon": "更多獎項更新中，敬請期待！",
      "explore_projects": "探索專案",
      "contact_me": "聯絡我",
      "select_language": "請選擇你的語言:",
      "chinese": "中文",
      "english": "English",
      "elements": "元素",
      "home": "首頁",
      "about": "關於我",
      "projects": "專案經歷",
      "awards": "獲獎紀錄",
      "highschool": "高中生活",
      "department": "系所介紹",
      "go_to_home": "前往首頁"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'zh',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
