import { GITHUB_USER, CACHE_KEY, LANGUAGES_SETTLE_MS } from '../config.js';
import { createCache } from './cache.js';

const cache = createCache(CACHE_KEY);

// Sin token son 60 peticiones/hora y cuentan hasta las 304, así que la lista de repos se pide siempre
// y los lenguajes de cada repo solo cuando ha habido un push nuevo.
export async function getRepoLanguages() {
    const saved = cache.read() ?? {};

    try {
        const repos = await fetchOwnRepos();
        // si falla una petición se descarta todo, con datos parciales los niveles saldrían mal
        const entries = await Promise.all(repos.map(async repo => [repo.id, await getLanguagesEntry(repo, saved[repo.id])]));
        const current = Object.fromEntries(entries);

        cache.write(current);
        return Object.values(current).map(entry => entry.languages);
    } catch (error) {
        if (!Object.keys(saved).length) throw error;
        console.warn('GitHub no responde, se usan los últimos lenguajes guardados.', error);
        return Object.values(saved).map(entry => entry.languages);
    }
}

async function fetchOwnRepos() {
    const repos = await fetchJson(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100`);
    return repos.filter(repo => !repo.fork);
}

async function getLanguagesEntry(repo, saved) {
    if (saved && isUpToDate(saved, repo)) return saved;
    return { pushedAt: repo.pushed_at, fetchedAt: Date.now(), languages: await fetchJson(repo.languages_url) };
}

function isUpToDate(saved, repo) {
    return saved.pushedAt === repo.pushed_at
        && saved.fetchedAt - Date.parse(repo.pushed_at) > LANGUAGES_SETTLE_MS;
}

// no-cache: revalida siempre en vez de usar la copia de 60 s del navegador
async function fetchJson(url) {
    const res = await fetch(url, { cache: 'no-cache' });
    if (!res.ok) throw new Error(`GitHub API ${url}: ${res.status}`);
    return res.json();
}
