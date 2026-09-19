import { GITHUB_USER, CACHE_KEY, SETTLE_MS } from '../config.js';
import { createCache } from './cache.js';

const cache = createCache(CACHE_KEY);

// no-cache: revalida siempre en vez de usar la copia de 60 s del navegador
const ALWAYS_FRESH = { cache: 'no-cache' };

const MANIFESTS = [
    { file: 'package.json', languages: ['JavaScript', 'TypeScript'], sections: ['dependencies', 'devDependencies'] },
    { file: 'composer.json', languages: ['PHP'], sections: ['require', 'require-dev'] }
];

// Sin token son 60 peticiones/hora y cuentan hasta las 304, así que la lista de repos se pide siempre
// y lo demás (lenguajes y dependencias) solo cuando ha habido un push nuevo.
export async function getRepoStack() {
    const saved = cache.read() ?? {};

    try {
        const repos = await fetchOwnRepos();
        // si falla una petición se descarta todo, con datos parciales los niveles saldrían mal
        const entries = await Promise.all(repos.map(async repo => [repo.id, await getRepoEntry(repo, saved[repo.id])]));
        const current = Object.fromEntries(entries);

        cache.write(current);
        return Object.values(current);
    } catch (error) {
        if (!Object.keys(saved).length) throw error;
        console.warn('GitHub no responde, se usan los últimos datos guardados.', error);
        return Object.values(saved);
    }
}

async function fetchOwnRepos() {
    const repos = await fetchJson(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100`);
    return repos.filter(repo => !repo.fork);
}

async function getRepoEntry(repo, saved) {
    if (saved && isUpToDate(saved, repo)) return saved;

    const languages = await fetchJson(repo.languages_url);
    const dependencies = await Promise.all(MANIFESTS
        .filter(manifest => manifest.languages.some(language => language in languages))
        .map(manifest => fetchDependencies(repo, manifest)));
    const signals = [...(repo.topics ?? []), ...dependencies.flat()].map(name => name.toLowerCase());

    return { pushedAt: repo.pushed_at, fetchedAt: Date.now(), languages, signals: [...new Set(signals)] };
}

function isUpToDate(saved, repo) {
    return saved.pushedAt === repo.pushed_at
        && saved.fetchedAt - Date.parse(repo.pushed_at) > SETTLE_MS;
}

// raw.githubusercontent.com no gasta las peticiones de la API
async function fetchDependencies(repo, { file, sections }) {
    const res = await fetch(`https://raw.githubusercontent.com/${repo.full_name}/${repo.default_branch}/${file}`, ALWAYS_FRESH);
    if (res.status === 404) return [];
    if (!res.ok) throw new Error(`GitHub raw ${repo.name}/${file}: ${res.status}`);

    const manifest = await res.json().catch(() => null);
    return sections.flatMap(section => Object.keys(manifest?.[section] ?? {}));
}

async function fetchJson(url) {
    const res = await fetch(url, ALWAYS_FRESH);
    if (!res.ok) throw new Error(`GitHub API ${url}: ${res.status}`);
    return res.json();
}
