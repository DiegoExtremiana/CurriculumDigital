const GITHUB_USER = 'DiegoExtremiana';
const CACHE_KEY = 'githubSkillsCache';
const CACHE_TTL = 6 * 60 * 60 * 1000; // 6 horas, evita agotar el límite de peticiones sin autenticar de GitHub

document.addEventListener('DOMContentLoaded', updateSkillLevelsFromGithub);

async function updateSkillLevelsFromGithub() {
    const items = document.querySelectorAll('.skill-item[data-lang]');
    if (!items.length) return;

    try {
        const totals = await getLanguageTotals();
        applySkillLevels(items, totals);
    } catch (e) {
        console.warn('No se pudieron cargar las estadísticas de GitHub, se mantienen los niveles por defecto.', e);
    }
}

async function getLanguageTotals() {
    const cached = readCache();
    if (cached) return cached;

    const totals = await fetchLanguageTotals();
    writeCache(totals);
    return totals;
}

function readCache() {
    try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (!raw) return null;
        const { timestamp, totals } = JSON.parse(raw);
        if (Date.now() - timestamp > CACHE_TTL) return null;
        return totals;
    } catch {
        return null;
    }
}

function writeCache(totals) {
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), totals }));
    } catch {
        // localStorage no disponible (modo privado, etc.): se ignora, no es crítico
    }
}

async function fetchLanguageTotals() {
    const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100`);
    if (!reposRes.ok) throw new Error(`GitHub API repos: ${reposRes.status}`);
    const repos = await reposRes.json();

    const languagesPerRepo = await Promise.all(
        repos
            .filter(repo => !repo.fork)
            .map(repo => fetch(repo.languages_url).then(res => (res.ok ? res.json() : {})))
    );

    const totals = {};
    for (const langs of languagesPerRepo) {
        for (const [lang, bytes] of Object.entries(langs)) {
            totals[lang] = (totals[lang] || 0) + bytes;
        }
    }
    return totals;
}

function applySkillLevels(items, totals) {
    const values = [...items].map(item =>
        item.dataset.lang
            .split(',')
            .reduce((sum, lang) => sum + (totals[lang] || 0), 0)
    );

    const maxValue = Math.max(...values, 1);

    items.forEach((item, i) => {
        if (values[i] <= 0) return; // sin datos para este lenguaje: se conserva el nivel por defecto del HTML
        const level = Math.max(1, Math.min(10, Math.round((values[i] / maxValue) * 10)));
        item.querySelector('.skill-level').className = `skill-level nivel-${level}`;
    });
}
