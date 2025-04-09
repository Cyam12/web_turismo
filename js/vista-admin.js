document.addEventListener("DOMContentLoaded", function () {
    // Verificar si hay un usuario administrativo actual
    const currentAdmin = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentAdmin) {
        alert("Debes iniciar sesión como administrador.");
        window.location.href = "login-admin.html"; // Redirige al login administrativo
        return;
    }

    // Elementos del DOM
    const userTableBody = document.getElementById("userTableBody");
    const logoutButton = document.getElementById("logout-admin-btn");

    // Cargar datos de usuarios registrados y sus reservas
    loadUsersAndReservations();

    // Evento para cerrar sesión
    logoutButton.addEventListener("click", function () {
        localStorage.removeItem("currentUser"); // Cierra la sesión del administrador
        window.location.href = "login-admin.html"; // Redirige al login administrativo
    });
});

function loadUsersAndReservations() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const reservas = JSON.parse(localStorage.getItem("reservas")) || {};
    const userTableBody = document.getElementById("userTableBody");

    userTableBody.innerHTML = ""; // Limpiar tabla antes de llenarla

    if (users.length === 0) {
        const row = document.createElement("tr");
        row.innerHTML = `<td colspan="4">No hay usuarios registrados.</td>`;
        userTableBody.appendChild(row);
        return;
    }

    // Iterar sobre los usuarios registrados
    users.forEach((user, index) => {
        const userEmail = user.correo;
        const userReservations = reservas[userEmail] || [];

        // Crear una fila para cada usuario
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.nombre} ${user.apellido}</td>
            <td>${user.correo}</td>
            <td>
                <button class="btn view-reservations" onclick="viewUserReservations('${userEmail}')">
                    Ver Reservas (${userReservations.length})
                </button>
            </td>
        `;
        userTableBody.appendChild(row);
    });
}

function viewUserReservations(email) {
    const reservas = JSON.parse(localStorage.getItem("reservas")) || {};
    const userReservations = reservas[email] || [];

    const reservationDetails = document.getElementById("reservationDetails");
    const reservationList = document.getElementById("reservationList");

    reservationList.innerHTML = ""; // Limpiar detalles antes de llenarlos
    reservationDetails.innerHTML = ""; 

    if (userReservations.length === 0) {
        // Si el usuario no tiene reservas, mostrar este mensaje
        reservationDetails.textContent = "Este usuario no tiene reservas.";
    } else {
        // Si el usuario tiene reservas, mostrar las reservas en la lista
        userReservations.forEach((reservation, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>Reserva ${index + 1}:</strong>
                Destino: ${reservation.destination}, Paquete: ${reservation.package}, 
                Personas: ${reservation.people}, Estado: ${reservation.status}, 
                Fecha Inicio: ${reservation.startDate}, Fecha Fin: ${reservation.endDate}, 
                Guia: ${reservation.guide}, Total: S/.${reservation.total}
                
            `;
            reservationList.appendChild(li);
        });
    }

    // Mostrar modal con detalles de reservas
    document.getElementById("reservationsModal").style.display = "flex";
}
// Función para cerrar el modal
function closeModal() {
    document.getElementById("reservationsModal").style.display = "none";
}

// Cerrar el modal al hacer clic fuera de él
window.onclick = function (event) {
    const modal = document.getElementById("reservationsModal");
    if (event.target === modal) {
        closeModal();
    }
};