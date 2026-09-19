import { LANGUAGE_LABELS, MAX_LANGUAGES } from '../config.js';

// Nivel 1-10: mitad según en cuántos repos aparece el lenguaje, mitad según su cantidad de código.
// El código se mide con raíz cuadrada para que un lenguaje con muchísimo código (o archivos generados) no aplaste al resto.
export function computeSkills(repos) {
    const reposWithCode = repos.filter(langs => Object.keys(langs).length);
    const groups = {};

    for (const langs of reposWithCode) {
        const labelsInRepo = new Set();
        for (const [lang, bytes] of Object.entries(langs)) {
            const label = LANGUAGE_LABELS[lang] || lang;
            const group = (groups[label] ||= { label, bytes: 0, repoCount: 0 });
            group.bytes += bytes;
            if (!labelsInRepo.has(label)) {
                labelsInRepo.add(label);
                group.repoCount++;
            }
        }
    }

    const groupList = Object.values(groups);
    const maxBytes = Math.max(...groupList.map(group => group.bytes), 1);

    return groupList
        .map(({ label, bytes, repoCount }) => {
            const repoShare = repoCount / reposWithCode.length;
            const codeShare = Math.sqrt(bytes / maxBytes);
            const level = Math.max(1, Math.min(10, Math.round(((repoShare + codeShare) / 2) * 10)));
            return { label, level, bytes };
        })
        .sort((a, b) => b.level - a.level || b.bytes - a.bytes)
        .slice(0, MAX_LANGUAGES);
}
