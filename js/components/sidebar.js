import { h, anchor } from './dom.js';
import { skillBar } from './skillBar.js';
import { skillsNote } from './skillsNote.js';

export function renderSidebar({ name, role, photo, contact, cv }, skills) {
    return [
        h('h1', { id: 'nombre' }, name),
        h('p', { id: 'puesto' }, role),
        h('img', photo),
        h('h2', null, 'Perfil'),
        h('section', { id: 'intro' }, contact.map(contactRow)),
        h('a', { class: 'boton', href: cv.href, download: '' }, cv.text),
        h('h2', null, 'Habilidades'),
        h('p', { id: 'skills-source', class: 'fuente' }, skillsNote('loading')),
        h('section', { id: 'skills', class: 'skills-section' }, skills.map(skillBar)),
        h('p', { id: 'skills-footnote', class: 'fuente', hidden: '' }, '* Nivel propio: no se puede medir en GitHub (trabajo en repos privados)')
    ];
}

function contactRow({ label, text, href }) {
    return h('p', null, h('b', null, `${label}:`), ' ', href ? anchor({ text, href }) : text);
}
