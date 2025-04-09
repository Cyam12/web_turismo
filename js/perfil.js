document.addEventListener("DOMContentLoaded", function () {
    // Recuperar el usuario actual del localStorage
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    // Verificar si hay un usuario registrado
    if (currentUser) {
        // Llenar los elementos con los datos del usuario
        document.getElementById("nombre-usuario").textContent = currentUser.nombre;
        document.getElementById("apellido-usuario").textContent = currentUser.apellido;
        document.getElementById("correo-usuario").textContent = currentUser.correo;
        document.getElementById("telefono-usuario").textContent = currentUser.telefono;
    } else {
        // Manejo si no hay usuario registrado
        document.querySelector('.user-data').innerHTML = '<p>No has iniciado sesión.</p>';
        return; // Salir de la función si no hay usuario
    }

    // Evento de cerrar sesión al botón
    const logoutButton = document.getElementById("logout-button");
    logoutButton.addEventListener("click", function () {
        // Limpiar solo el usuario actual del localStorage
        localStorage.removeItem("currentUser");
        // Redireccionar al registro
        window.location.href = "registro.html";
    });

    // Cargar compras del usuario
    loadPurchases();

    // Filtro
    document.getElementById("apply-filter").addEventListener("click", () => {
        const status = document.getElementById("filter-status").value;
        loadPurchases(status);
    });
});

function loadPurchases(filter = "todos") {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return;

    const email = currentUser.correo;
    const reservas = JSON.parse(localStorage.getItem("reservas")) || {};
    const userReservations = reservas[email] || []; // Obtener reservas del usuario actual
    const tableBody = document.querySelector(".reservation-table tbody");

    tableBody.innerHTML = "";

    // Filtrar las compras según el estado
    const filteredPurchases = userReservations.filter((purchase) => {
        if (filter === "todos") return true;
        return purchase.status === filter; // Simplificación
    });

    // Guardar los índices originales de las reservas filtradas
    const originalIndexes = userReservations
        .map((purchase, index) => (filteredPurchases.includes(purchase) ? index : -1))
        .filter(index => index !== -1);

    // Verificar si hay compras filtradas
    if (filteredPurchases.length === 0) {
        const row = document.createElement("tr");
        row.innerHTML = `<td colspan="5">No hay compras disponibles.</td>`;
        tableBody.appendChild(row);
        return; // Salir si no hay compras
    }

    // Crear la tabla con las compras filtradas
    filteredPurchases.forEach((purchase, filteredIndex) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${filteredIndex + 1}</td>
            <td>${purchase.destination}</td>
            <td>${purchase.package}</td>
            <td>${purchase.status}</td>
            <td>
                <button class="btn details" onclick="viewDetails(${originalIndexes[filteredIndex]})">Más Detalles</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

function viewDetails(originalIndex) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const email = currentUser.correo;
    const reservas = JSON.parse(localStorage.getItem("reservas")) || {};
    const userReservations = reservas[email] || [];

    // Acceder a la reserva original utilizando el índice original
    const purchase = userReservations[originalIndex];

    if (purchase) {
        // Llenar los datos en el modal
        document.getElementById("modal-destination").textContent = purchase.destination || "N/A";
        document.getElementById("modal-package").textContent = purchase.package || "N/A";
        document.getElementById("modal-accommodation").textContent = purchase.accommodation || "N/A";
        document.getElementById("modal-start-date").textContent = purchase.startDate || "N/A";
        document.getElementById("modal-end-date").textContent = purchase.endDate || "N/A";
        document.getElementById("modal-guide").textContent = purchase.guide || "N/A";
        document.getElementById("modal-people").textContent = purchase.people || "N/A";
        document.getElementById("modal-status").textContent = purchase.status || "N/A";
        document.getElementById("modal-total").textContent = purchase.total || "N/A";

        // Mostrar el modal
        document.getElementById("detailsModal").style.display = "block";
    } else {
        alert("Compra no encontrada.");
    }
}

function closeModal() {
    // Ocultar el modal
    document.getElementById("detailsModal").style.display = "none";
}

// Cerrar el modal al hacer clic fuera de él
window.onclick = function (event) {
    const modal = document.getElementById("detailsModal");
    if (event.target === modal) {
        closeModal();
    }
};