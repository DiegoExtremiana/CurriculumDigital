import { MAX_SKILLS } from '../config.js';
import { LANGUAGE_LABELS, TECHNOLOGIES } from './catalog.js';

export function measureSkills(repos) {
    const reposWithCode = repos.filter(repo => Object.keys(repo.languages).length);

    return [
        ...rank(collect(reposWithCode, languageWeights), reposWithCode.length),
        ...rank(collect(reposWithCode, technologyWeights), reposWithCode.length)
    ];
}

// Lo medido en GitHub manda sobre lo declarado; lo declarado cubre lo que GitHub no ve (repos privados)
export function combineSkills(measured, declared) {
    const skills = new Map(declared.map(skill => [skill.label, skill]));
    for (const skill of measured) skills.set(skill.label, skill);

    return [...skills.values()].sort(byRelevance).slice(0, MAX_SKILLS);
}

function languageWeights({ languages }) {
    const weights = new Map();
    for (const [language, bytes] of Object.entries(languages)) {
        const label = LANGUAGE_LABELS[language] || language;
        weights.set(label, (weights.get(label) ?? 0) + bytes);
    }
    return weights;
}

// una tecnología pesa lo que todo el código del repo donde se usa
function technologyWeights({ languages, signals }) {
    const repoBytes = Object.values(languages).reduce((total, bytes) => total + bytes, 0);
    return new Map(signals.filter(signal => Object.hasOwn(TECHNOLOGIES, signal)).map(signal => [TECHNOLOGIES[signal], repoBytes]));
}

function collect(repos, weightsOf) {
    const groups = new Map();
    for (const repo of repos) {
        for (const [label, bytes] of weightsOf(repo)) {
            const group = groups.get(label) ?? { label, bytes: 0, repoCount: 0 };
            group.bytes += bytes;
            group.repoCount++;
            groups.set(label, group);
        }
    }
    return [...groups.values()];
}

// Nivel 1-10: mitad según en cuántos repos aparece, mitad según su cantidad de código.
// El código se mide con raíz cuadrada para que un lenguaje con muchísimo código (o archivos generados) no aplaste al resto.
function rank(groups, totalRepos) {
    const maxBytes = Math.max(...groups.map(group => group.bytes), 1);

    return groups.map(({ label, bytes, repoCount }) => {
        const repoShare = repoCount / totalRepos;
        const codeShare = Math.sqrt(bytes / maxBytes);
        const level = Math.max(1, Math.min(10, Math.round(((repoShare + codeShare) / 2) * 10)));
        return { label, level, bytes };
    });
}

function byRelevance(a, b) {
    return b.level - a.level
        || (b.bytes ?? -1) - (a.bytes ?? -1)
        || a.label.localeCompare(b.label);
}
