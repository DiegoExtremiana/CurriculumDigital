import { h, richText } from './dom.js';
import { entry } from './entry.js';

const bodies = {
    text: ({ text }) => h('section', null, h('p', null, text)),
    entries: ({ entries }) => entries.map(entry),
    terms: ({ terms }) => terms.map(termRow),
    groups: ({ groups }) => h('div', { class: 'grupos' }, groups.map(certGroup))
};

export function renderSection({ id, title, type, intro, footer, ...data }) {
    return h('article', { id },
        h('h2', null, title),
        intro && h('p', { class: 'nota' }, intro),
        bodies[type](data),
        footer && h('p', { class: 'nota' }, richText(footer)));
}

function termRow({ term, items }) {
    return h('section', null,
        h('div', { class: 'categoria' }, h('p', null, term)),
        h('div', { class: 'content' }, h('p', null, items.join(', '))));
}

function certGroup({ title, items }) {
    return h('div', { class: 'grupo' },
        h('h3', null, title),
        h('ul', null, items.map(item => h('li', null, item))));
}
