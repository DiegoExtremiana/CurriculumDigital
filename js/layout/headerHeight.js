export function initHeaderHeight() {
    const header = document.querySelector('header');
    if (!header) return;

    const publish = () => document.body.style.setProperty('--header-height', `${header.scrollHeight}px`);
    new ResizeObserver(publish).observe(header);
}
