document.addEventListener('DOMContentLoaded', () => {  
    // Selecciona todos los botones "Quiero saber más"  
    const buttons = document.querySelectorAll('.btn');  

    // Agrega un evento click a cada botón  
    buttons.forEach(button => {  
        button.addEventListener('click', (event) => {  
            event.preventDefault(); // Previene el comportamiento predeterminado del enlace  

            // Obtiene el valor del atributo data-target  
            const targetPage = button.getAttribute('data-target');  

            // Redirige a la página objetivo  
            window.location.href = targetPage;  
        });  
    });  
});

document.querySelectorAll('.agregar-carrito-btn').forEach(button => {
    button.addEventListener('click', function() {
    window.location.href = 'registro.html';
    });
});
document.addEventListener('DOMContentLoaded', function() {  
    // Seleccionamos todos los botones que tienen la clase 'btn-mas-destino'  
    const botones = document.querySelectorAll('.btn-mas-destino');  

    botones.forEach(boton => {  
        boton.addEventListener('click', function() {  
            // Obtenemos el valor del atributo 'data-destino' del botón clicado  
            const destino = this.getAttribute('data-destino');  
            // Redireccionamos a la URL correspondiente  
            window.location.href = destino;  
        });  
    });  
});  

document.querySelectorAll('.pasapagina').forEach(button => {
    button.addEventListener('click', function() {
        const targetPage = button.dataset.target;
    window.location.href = targetPage;
    });
});