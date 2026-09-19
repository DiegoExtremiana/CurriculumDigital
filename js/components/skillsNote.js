import { h, anchor } from './dom.js';
import { GITHUB_USER } from '../config.js';

const github = () => anchor({ text: 'GitHub', href: `https://github.com/${GITHUB_USER}` });

const notes = {
    loading: () => ['Niveles propios · consultando GitHub…'],
    live: () => [h('span', { class: 'punto', 'aria-hidden': 'true' }), 'Sacado de ', github(), ' en tiempo real'],
    saved: () => ['Últimos datos guardados de ', github(), ' (sin conexión con la API ahora)'],
    own: () => ['Niveles propios (GitHub no disponible)']
};

export const skillsNote = state => notes[state]();
