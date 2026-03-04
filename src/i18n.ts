import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "welcome": "THE DIGITAL SPACE",
      "intro_text": "Engineering at the critical intersection of aesthetics and pure logic. Dedicated to crafting immersive digital experiences through modern web frameworks and deep AI integration. A relentless pursuit of structural elegance in both code and design.",
      "about_me_title": "MANIFESTO",
      "bio_hi": "01 / ORIGINS",
      "bio_intro": "Rooted in the cultural heritage of Tainan and raised amidst the urban intensity of Taipei. My journey began with an innate curiosity for functional systems. At Chien Kuo High School, leadership within the Student Association was not just a role, but an early immersion into structural thinking and collective problem-solving.",
      "bio_current": "This early exposure to complex social systems laid the groundwork for a transition into technical architectures. Currently refining digital craft and algorithmic logic at National Yang Ming Chiao Tung University (NYCU), specializing in the evolving landscape of Computer Science.",
      "bio_hs_title": "02 / FOUNDATION (2018 - 2021)",
      "bio_hs_desc": "Served as Public Relations Officer, operating as a strategic architect between internal student frameworks and external institutional environments. This period served as a masterclass in systematic communication—learning to translate diverse needs into a unified vision, a skill that now informs my approach to user-centric interface design.",
      "bio_uni_1_title": "03 / TRANSITION (2021 - 2023)",
      "bio_uni_1_desc": "Initiated my higher education in Mechanical Engineering at National Taiwan University (NTU). This chapter was defined by an exploration of the physical world. I studied the physics of motion not just through theory, but through the kinetic lens of skateboarding and basketball—understanding the delicate balance between structural integrity and fluid movement.",
      "bio_uni_2_title": "04 / CURRENT CHAPTER (2023 - PRESENT)",
      "bio_uni_2_desc": "A calculated and intentional pivot led me to Computer Science at NYCU. I now navigate the abstract world of binary logic and complex data structures with the same intensity I bring to the dance floor. By day, I architect digital systems; by night, I explore the explosive rhythm and flow of Breaking (Street Dance), constantly seeking the common ground where binary precision meets human expression.",
      "hs_title": "High School Life",
      "hs_school_name": "Taipei Municipal Chien Kuo High School (CKHS)",
      "hs_desc_1": "CKHS is a prestigious high school in Taipei, known for its academic excellence and rich history. It has been a cradle for leaders in various fields since its founding.",
      "hs_desc_2": "The school emphasizes holistic development, excelling not only in sciences and arts but also in sports and music.",
      "dept_title": "Department Info",
      "dept_name": "Department of Computer Science, NYCU",
      "dept_desc_1": "Computer science is the greatest invention of the 20th century. NYCU's CS department has been at the forefront of this revolution in Taiwan.",
      "dept_desc_2": "Established in 1980, the department has grown into the largest and most well-equipped CS program in the country, fostering top-tier engineering talent.",
      "projects_title": "ARCHIVE",
      "project_recipe_title": "PROJECT 01 / GENERATIVE RECIPES",
      "project_recipe_desc": "An AI-driven solution addressing global food sustainability. By leveraging generative models, this project transforms near-expiry ingredients into curated, high-quality culinary experiences, bridging the gap between raw data and domestic utility.",
      "project_github": "View Source",
      "awards_title": "HONORS",
      "award_coming_soon": "Continuously evolving. Stay tuned for upcoming milestones and digital explorations.",
      "explore_projects": "View Archive",
      "contact_me": "Initiate Contact",
      "select_language": "Select Language:",
      "chinese": "CH",
      "english": "EN",
      "elements": "Elements",
      "home": "Home",
      "about": "Manifesto",
      "projects": "Archive",
      "awards": "Honors",
      "highschool": "High School",
      "department": "Department",
      "go_to_home": "Return"
    }
  },
  zh: {
    translation: {
      "welcome": "THE DIGITAL SPACE",
      "intro_text": "在純粹邏輯與前衛美學的交匯點進行工程實踐。致力於透過現代網頁框架與人工智慧深度整合，打造具沉浸感的數位體驗。在程式碼與設計之間，不懈地追求結構上的優雅與精準。",
      "about_me_title": "MANIFESTO / 關於我",
      "bio_hi": "01 / 起源",
      "bio_intro": "生於具深厚文化底蘊的台南，長於充滿都市張力的台北。我的旅程始於對「功能性系統」的內在好奇。在建國中學期間，參與班聯會不僅僅是一份職務，更是一場關於領導哲學、結構化思維與集體問題解決的早期探索。",
      "bio_current": "這段處理複雜社會系統的經歷，為我日後轉向技術架構設計奠定了基石。目前我於陽明交通大學 (NYCU) 資訊工程學系，在不斷演進的數位領域中，持續淬鍊程式工藝與演算法邏輯。",
      "bio_hs_title": "02 / 奠基 (2018 - 2021)",
      "bio_hs_desc": "在建國中學班聯會擔任公關長的歲月，是我對複雜社會系統進行初步建模的起點。我不僅是組織內部框架與外界環境間的戰略橋樑，更是在多元利益衝突中尋求共識的協調者。這段經歷讓我深刻體會到，任何穩定的架構都源於精準的溝通與結構的平衡。這種從混亂中梳理出秩序的實踐，日後轉化為我對數位產品介面設計的嚴苛追求，致力於在功能繁複的系統中，提煉出直觀且具人性溫度的互動路徑。",
      "bio_uni_1_title": "03 / 轉換 (2021 - 2023)",
      "bio_uni_1_desc": "進入台大機械系，是我與物理世界進行的一場深度對話。那段時期，我不僅在教室內鑽研熱力學與動力學的抽象公式，更在城市的街道上，透過滑板與籃球的極限動態，親身體悟運動物理的真諦。滑板對重心的極致控制、籃球場上對空間與慣性的精準判讀，讓我理解到「結構穩定性」並非靜止，而是一種在高速流動中維持平衡的藝術。這種對物理實體與動態結構的敏感度，成為我後來建構虛擬數位邏輯時，不可或缺的觸覺記憶。",
      "bio_uni_2_title": "04 / 現階段 (2023 - 至今)",
      "bio_uni_2_desc": "經過深思熟慮與精密計算，我決定從實體機械跨足至抽象的資工領域，開啟在交大的全新章節。這不只是專業的切換，更是思維維度的躍遷。我發現，演算法的邏輯推演與 Breaking 街舞的肢體爆發，在本質上具有驚人的相似性：兩者都在嚴謹的規則限制下，追求極致的自由與效率。白天，我在二進位的海洋中導航，透過代碼構築邏輯嚴密的虛擬世界；夜晚，我則在舞池中挑戰體能與節奏的極限。這種雙重身份的交織，讓我得以在冷峻的運算邏輯中注入感性的流動，不斷在 0 與 1 的精準與人類情緒的律動之間，尋找最完美的匯流點。",

      "hs_title": "高中生活",
      "hs_school_name": "台北市立建國高級中學",
      "hs_desc_1": "建國中學是台北市著名的頂尖高中，擁有悠久的歷史。除了學術表現卓越，也重視體育與藝術發展。",
      "hs_desc_2": "校內設施齊全，包含現代化實驗室與體育館。畢業生多數進入全球頂尖大學深造。",
      "dept_title": "系所介紹",
      "dept_name": "陽明交通大學資訊工程學系",
      "dept_desc_1": "電腦是20世紀最偉大的發明，交大資工自1980年成立以來，一直是台灣資訊產業發展的核心推動力。",
      "dept_desc_2": "目前為全台第一大資訊科系，擁有最充沛的師資與實驗設備，致力於培育下一代精英資訊人才。",
      "projects_title": "ARCHIVE / 專案經歷",
      "project_recipe_title": "PROJECT 01 / 生成式食譜",
      "project_recipe_desc": "針對全球糧食永續問題提出的 AI 解決方案。利用生成式模型將即期食材轉化為高品質的烹飪體驗，成功在原始數據與居家實用性之間建立連結。",
      "project_github": "檢視原始碼",
      "awards_title": "HONORS / 獲獎紀錄",
      "award_coming_soon": "持續演進中。敬請期待未來的里程碑與數位探索。",
      "explore_projects": "探索專案",
      "contact_me": "聯絡我",
      "select_language": "請選擇語言:",
      "chinese": "CH",
      "english": "EN",
      "elements": "元素",
      "home": "Home",
      "about": "Manifesto",
      "projects": "Archive",
      "awards": "Honors",
      "highschool": "高中生活",
      "department": "系所介紹",
      "go_to_home": "返回"
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
