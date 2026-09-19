export function h(tag, attrs, ...children) {
    const node = document.createElement(tag);
    for (const [name, value] of Object.entries(attrs ?? {})) {
        if (value != null) node.setAttribute(name, value);
    }
    node.append(...children.flat().filter(Boolean));
    return node;
}

export function anchor({ text, href }) {
    const external = /^https?:/.test(href);
    return h('a', { href, target: external ? '_blank' : null, rel: external ? 'noopener noreferrer' : null }, text);
}

export const richText = parts => parts.map(part => typeof part === 'string' ? part : anchor(part));
