import { h, anchor } from './dom.js';

const ABBREVIATIONS = { IES: 'Instituto de Educación Secundaria' };
const abbreviationPattern = new RegExp(`\\b(${Object.keys(ABBREVIATIONS).join('|')})\\b`);

export function entry({ dates, title, link, subtitle, text, bullets }) {
    return h('section', null,
        dates && h('div', { class: 'fechas' }, dates.map(date => h('p', null, date))),
        h('div', { class: 'content' },
            h('h3', null, title, link && [' · ', anchor(link)]),
            subtitle && h('p', null, abbreviate(subtitle)),
            text && h('p', null, text),
            bullets && h('ul', null, bullets.map(item => h('li', null, item)))));
}

function abbreviate(text) {
    return text.split(abbreviationPattern).map(part =>
        Object.hasOwn(ABBREVIATIONS, part) ? h('abbr', { title: ABBREVIATIONS[part] }, part) : part);
}
