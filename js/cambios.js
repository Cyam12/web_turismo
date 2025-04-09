document.addEventListener('DOMContentLoaded', () => {
    const inicioLink = document.querySelector('.link[href="#"]'); // Selecciona el enlace del botón de inicio
    if (inicioLink) {
        inicioLink.addEventListener('click', (event) => {
            event.preventDefault(); // Previene el comportamiento predeterminado del enlace
            window.location.href = 'index.html'; // Redirige a la página de inicio
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const registroLink = document.querySelector('.link[href="#"]:nth-of-type(2)'); // Selecciona el enlace de "Registro"
    if (registroLink) {
        registroLink.addEventListener('click', (event) => {
            event.preventDefault(); // Evita la acción predeterminada
            window.location.href = 'destinos.html'; // Redirige a la página de registro
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const registroLink = document.querySelector('.link[href="#"]:nth-of-type(3)'); // Selecciona el enlace de "Registro"
    if (registroLink) {
        registroLink.addEventListener('click', (event) => {
            event.preventDefault(); // Evita la acción predeterminada
            window.location.href = 'grupo-viajero.html'; // Redirige a la página grupo
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const registroLink = document.querySelector('.link[href="#"]:nth-of-type(4)'); // Selecciona el enlace de "Blog"
    if (registroLink) {
        registroLink.addEventListener('click', (event) => {
            event.preventDefault(); // Evita la acción predeterminada
            window.location.href = 'blog.html'; 
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const registroLink = document.querySelector('.link[href="#"]:nth-of-type(5)'); // Selecciona el enlace de "Registro"
    if (registroLink) {
        registroLink.addEventListener('click', (event) => {
            event.preventDefault(); // Evita la acción predeterminada
            window.location.href = 'registro.html'; 
        });
    }
});
// Selecciona el enlace de Contactanos
document.addEventListener('DOMContentLoaded', () => {  
    // Seleccionar el enlace "Contacto" en el footer  
    const contactoLink = document.querySelector('footer .navegacion .link[href="#"]:nth-of-type(2)');  
    
    if (contactoLink) {  
        contactoLink.addEventListener('click', (event) => {  
            event.preventDefault(); // Evita la acción predeterminada del enlace  
            window.location.href = 'contactanos.html'; // Redirige a la página contactanos.html  
        });  
    }  
});

