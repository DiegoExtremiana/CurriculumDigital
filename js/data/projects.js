export const projects = {
    id: 'proyectos',
    title: 'Proyectos Personales',
    type: 'entries',
    intro: 'Proyectos propios desarrollados y desplegados de forma autónoma, gestionados con Git/GitHub:',
    entries: [
        {
            title: 'Diegoncurso',
            link: { text: 'diegoncurso.es', href: 'https://diegoncurso.es' },
            text: 'Concurso de preguntas sobre videojuegos con más de 1.500 preguntas propias, con contenido aportado por mi comunidad de Twitch. Diseño, desarrollo y mantengo yo solo toda la infraestructura (servidor propio y base de datos MySQL) y la lógica del concurso, para dar a la comunidad una forma de participar más allá del chat.'
        },
        {
            dates: ['4/2025 - Actualidad'],
            title: 'Collect-Connect',
            subtitle: 'En desarrollo',
            text: 'Plataforma para coleccionistas que estoy construyendo para resolver la falta de un espacio centralizado donde catalogar, mostrar e intercambiar colecciones entre usuarios. Construida con HTML, CSS, React y PHP, integrada con MySQL; permitirá registro, gestión de perfil, estantería virtual, mensajería, compraventa entre usuarios e integración con empresas afiliadas.'
        },
        {
            title: 'Contador de Cafés (cafesDiego)',
            link: { text: 'diegoextremiana.github.io/cafesDiego', href: 'https://diegoextremiana.github.io/cafesDiego' },
            text: 'Aplicación para registrar y analizar el consumo de café durante la jornada laboral, con TypeScript y Supabase como base de datos, como práctica de integración con un backend as a service.'
        },
        {
            title: 'cuentaTiempo',
            link: { text: 'github.com/DiegoExtremiana/cuentaTiempo', href: 'https://github.com/DiegoExtremiana/cuentaTiempo' },
            text: 'Cronómetro con distintos modos y barra de progreso, desarrollado en React.'
        },
        {
            title: '3 en Raya',
            link: { text: 'diegoextremiana.github.io/3enRaya', href: 'https://diegoextremiana.github.io/3enRaya' },
            text: 'Juego del 3 en raya construido con Vite + React, como práctica de componentes y gestión de estado.'
        }
    ],
    footer: [
        'Repositorio completo de proyectos disponible en ',
        { text: 'github.com/DiegoExtremiana', href: 'https://github.com/DiegoExtremiana' },
        '.'
    ]
};
