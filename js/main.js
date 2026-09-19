import { profile, skills, sections } from './data/index.js';
import { renderSidebar } from './components/sidebar.js';
import { renderSection } from './components/section.js';
import { combineSkills } from './skills/compute.js';
import { initHeaderHeight } from './layout/headerHeight.js';
import { initGithubSkills } from './skills/index.js';

document.querySelector('header').replaceChildren(...renderSidebar(profile, combineSkills([], skills)));
document.querySelector('main').replaceChildren(...sections.map(renderSection));

initHeaderHeight();
initGithubSkills(skills);
