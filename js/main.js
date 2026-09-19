import { profile, languageSkills, otherSkills, sections } from './data/index.js';
import { renderSidebar } from './components/sidebar.js';
import { renderSection } from './components/section.js';
import { initHeaderHeight } from './layout/headerHeight.js';
import { initGithubSkills } from './skills/index.js';

document.querySelector('header').replaceChildren(...renderSidebar(profile, languageSkills, otherSkills));
document.querySelector('main').replaceChildren(...sections.map(renderSection));

initHeaderHeight();
initGithubSkills();
