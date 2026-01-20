document.addEventListener('DOMContentLoaded', function () {
    backgroundFixer();
    window.addEventListener('resize', () => {
        backgroundFixer();
    });
});

const backgroundFixer = () => {
    if (window.innerWidth < 721) {
        let altura = document.getElementsByTagName('header').item(0).scrollHeight;
        document.body.style.background = `linear-gradient(180deg, #00416A ${altura * 1.04 - 10}px, #EBF7FF ${altura * 1.04 + 10}px)`;
    } else
        document.body.style.background = '';
}