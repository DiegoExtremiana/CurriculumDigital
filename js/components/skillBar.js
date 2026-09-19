import { h } from './dom.js';

export function skillBar({ label, level }) {
    return h('div', { class: 'skill-item' },
        h('span', null, label),
        h('div', { class: 'skill-bar', role: 'meter', 'aria-label': label, 'aria-valuenow': level, 'aria-valuemin': 0, 'aria-valuemax': 10 },
            h('div', { class: `skill-level nivel-${level}` })));
}
