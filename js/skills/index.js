import { getRepoStack } from '../services/github.js';
import { skillBar } from '../components/skillBar.js';
import { skillsNote } from '../components/skillsNote.js';
import { measureSkills, combineSkills } from './compute.js';

export async function initGithubSkills(declared) {
    const list = document.getElementById('skills');
    const source = document.getElementById('skills-source');
    const footnote = document.getElementById('skills-footnote');
    if (!list) return;

    try {
        const { repos, live } = await getRepoStack();
        const skills = combineSkills(measureSkills(repos), declared);
        const anyMeasured = skills.some(skill => skill.measured);

        list.replaceChildren(...skills.map(skill => skillBar({ ...skill, own: anyMeasured && !skill.measured })));
        source.replaceChildren(...skillsNote(!anyMeasured ? 'own' : live ? 'live' : 'saved'));
        footnote.hidden = !anyMeasured || skills.every(skill => skill.measured);
    } catch (e) {
        console.warn('No se pudieron cargar las estadísticas de GitHub, se mantienen las habilidades por defecto.', e);
        source.replaceChildren(...skillsNote('own'));
    }
}
