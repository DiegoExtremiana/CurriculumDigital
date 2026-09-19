import { h } from './dom.js';

export function skillBar({ label, level, own }) {
    return h('div', { class: 'skill-item' },
        h('span', { title: own ? 'Nivel propio: GitHub no puede medirlo' : null }, label, own && ' *'),
        h('div', { class: 'skill-bar', role: 'meter', 'aria-label': own ? `${label} (nivel propio)` : label, 'aria-valuenow': level, 'aria-valuemin': 0, 'aria-valuemax': 10 },
            h('div', { class: `skill-level nivel-${level}` })));
}
