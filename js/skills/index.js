import { getRepoLanguages } from '../services/github.js';
import { skillBar } from '../components/skillBar.js';
import { computeSkills } from './compute.js';

export async function initGithubSkills() {
    const container = document.getElementById('github-skills');
    if (!container) return;

    try {
        const skills = computeSkills(await getRepoLanguages());
        if (skills.length) container.replaceChildren(...skills.map(skillBar));
    } catch (e) {
        console.warn('No se pudieron cargar las estadísticas de GitHub, se mantienen las habilidades por defecto.', e);
    }
}
