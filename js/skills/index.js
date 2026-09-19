import { getRepoStack } from '../services/github.js';
import { skillBar } from '../components/skillBar.js';
import { measureSkills, combineSkills } from './compute.js';

export async function initGithubSkills(declared) {
    const container = document.getElementById('skills');
    if (!container) return;

    try {
        const measured = measureSkills(await getRepoStack());
        container.replaceChildren(...combineSkills(measured, declared).map(skillBar));
    } catch (e) {
        console.warn('No se pudieron cargar las estadísticas de GitHub, se mantienen las habilidades por defecto.', e);
    }
}
