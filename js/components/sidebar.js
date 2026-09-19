import { h } from './dom.js';
import { skillBar } from './skillBar.js';

export function renderSidebar({ name, role, photo, contact }, languageSkills, otherSkills) {
    return [
        h('h1', { id: 'nombre' }, name),
        h('p', { id: 'puesto' }, role),
        h('img', photo),
        h('h2', null, 'Perfil'),
        h('section', { id: 'intro' }, contact.map(contactRow)),
        h('h2', null, 'Habilidades'),
        h('section', { class: 'skills-section' },
            h('div', { id: 'github-skills' }, languageSkills.map(skillBar)),
            otherSkills.map(skillBar))
    ];
}

function contactRow({ label, text, href }) {
    return h('p', null, h('b', null, `${label}:`), ' ', href ? h('a', { href }, text) : text);
}
