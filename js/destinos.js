function mostrarInfo(paquete) {
  let infoPaquete = document.getElementById("info-paquete");

  // Limpiar el contenido previo y eliminar las clases previas
  infoPaquete.innerHTML = "";
  infoPaquete.className = "info-paquete"; // Restablece las clases antes de añadir una nueva

  // Información de cada paquete
  let descripcionPaquete;

  if (paquete === "basic") {
    descripcionPaquete = `
      <h4 class="titulo-paquete">Plan Basic</h4>
      <p><strong>Alimentación:</strong> Desayuno incluido.</p>
      <p><strong>Transporte:</strong> Traslados en grupo.</p>
      <p><strong>Tours:</strong> Recorridos en grupo por la ciudad.</p>
      <p><strong>Alojamiento:</strong> Hostales seleccionados.</p>
      <p><strong>Estadía:</strong> 2 días, 1 noche.</p>
      <p><strong>Aplica para:</strong> 1 persona.</p>
      <h4 class="titulo-paquete">S/ 400</h4>
      <!-- Botón de Agregar al Carrito con enlace -->
      <a href="registro.html">
        <button class="agregar-carrito-btn">
          <img src="img/anadir-al-carrito.png" alt="Añadir al carrito" class="icono-carrito" />
          Agregar al carrito
        </button>
      </a>
    `;
    infoPaquete.classList.add("basic");
  } else if (paquete === "bronce") {
    descripcionPaquete = `
      <h4 class="titulo-paquete">Plan Bronce</h4>
      <p><strong>Alimentación:</strong> Desayuno y almuerzo incluidos.</p>
      <p><strong>Transporte:</strong> Traslados en bus turístico.</p>
      <p><strong>Tours:</strong> Recorridos en grupo por la ciudad.</p>
      <p><strong>Alojamiento:</strong> Hoteles 3 estrellas.</p>
      <p><strong>Estadía:</strong> 3 días, 2 noches.</p>
      <p><strong>Aplica para:</strong> 1 persona.</p>
      <h4 class="titulo-paquete">S/ 600</h4>
      <!-- Botón de Agregar al Carrito con enlace -->
      <a href="registro.html">
        <button class="agregar-carrito-btn">
          <img src="img/anadir-al-carrito.png" alt="Añadir al carrito" class="icono-carrito" />
          Agregar al carrito
        </button>
      </a>
    `;
    infoPaquete.classList.add("bronce");
  } else if (paquete === "platinum") {
    descripcionPaquete = `
      <h4 class="titulo-paquete">Plan Platinum</h4>
      <p><strong>Alimentación:</strong> Todos los alimentos incluidos.</p>
      <p><strong>Transporte:</strong> Transporte privado de lujo.</p>
      <p><strong>Tours:</strong> Tour privado por toda la ciudad.</p>
      <p><strong>Alojamiento:</strong> Hoteles 5 estrellas.</p>
      <p><strong>Estadía:</strong> 5 días, 4 noches.</p>
      <p><strong>Aplica para:</strong> 1 persona.</p>
      <h4 class="titulo-paquete">S/ 800</h4>
      <!-- Botón de Agregar al Carrito con enlace -->
      <a href="registro.html">
        <button class="agregar-carrito-btn">
          <img src="img/anadir-al-carrito.png" alt="Añadir al carrito" class="icono-carrito" />
          Agregar al carrito
        </button>
      </a>
    `;
    infoPaquete.classList.add("platinum");
  } else if (paquete === "gold") {
    descripcionPaquete = `
      <h4 class="titulo-paquete">Plan Gold</h4>
      <p><strong>Alimentación:</strong> Menú gourmet durante toda la estadía.</p>
      <p><strong>Transporte:</strong> Traslado en avión privado.</p>
      <p><strong>Tours:</strong> Tour privado por toda la ciudad.</p>
      <p><strong>Alojamiento:</strong> Hoteles de lujo.</p>
      <p><strong>Estadía:</strong> 7 días, 6 noches.</p>
      <p><strong>Aplica para:</strong> 1 persona.</p>
      <h4 class="titulo-paquete">S/ 1000</h4>
      <!-- Botón de Agregar al Carrito con enlace -->
      <a href="registro.html">
        <button class="agregar-carrito-btn">
          <img src="img/anadir-al-carrito.png" alt="Añadir al carrito" class="icono-carrito" />
          Agregar al carrito
        </button>
      </a>
    `;
    infoPaquete.classList.add("gold");
  }

  // Inyectar la descripción en el div
  infoPaquete.innerHTML = descripcionPaquete;
  // Clase 'mostrar' para hacer visible el contenedor
  infoPaquete.classList.add("mostrar");
}
