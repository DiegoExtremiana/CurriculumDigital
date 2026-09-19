import { summary } from './summary.js';
import { experience } from './experience.js';
import { projects } from './projects.js';
import { technicalSkills } from './technicalSkills.js';
import { languages } from './languages.js';
import { education } from './education.js';
import { certifications } from './certifications.js';
import { otherExperience } from './otherExperience.js';

export { profile } from './profile.js';
export { languageSkills, otherSkills } from './skills.js';

export const sections = [
    summary,
    experience,
    projects,
    technicalSkills,
    languages,
    education,
    certifications,
    otherExperience
];
