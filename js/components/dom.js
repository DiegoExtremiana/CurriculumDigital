export function h(tag, attrs, ...children) {
    const node = document.createElement(tag);
    for (const [name, value] of Object.entries(attrs ?? {})) {
        if (value != null) node.setAttribute(name, value);
    }
    node.append(...children.flat().filter(Boolean));
    return node;
}

export const anchor = ({ text, href }) => h('a', { href }, text);

export const richText = parts => parts.map(part => typeof part === 'string' ? part : anchor(part));
