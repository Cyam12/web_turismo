document.addEventListener("DOMContentLoaded", () => {
  loadReservations();
});

const packages = {
  Arequipa: { Basic: 400, Bronce: 600, Platinum: 800, Gold: 1000 },
  Cuzco: { Basic: 400, Bronce: 600, Platinum: 800, Gold: 1000 },
  Chiclayo: { Basic: 400, Bronce: 600, Platinum: 800, Gold: 1000 },
};

let currentActionIndex = null;
let currentActionType = null;

function loadReservations() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    alert("No hay usuario registrado.");
    return;
  }

  const email = currentUser.correo;
  const reservas = JSON.parse(localStorage.getItem("reservas")) || {};
  const userReservations = reservas[email] || [];

  const tableBody = document.querySelector("#reservationTable tbody");
  tableBody.innerHTML = "";

  userReservations.forEach((reservation, index) => {
    const packagePrice = packages[reservation.destination][reservation.package.split(" ")[1]];
    const row = document.createElement("tr");

    const isCompleted = reservation.status === "Completado";

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${reservation.destination}</td>
      <td>${reservation.package}</td>
      <td>S/. ${packagePrice}</td>
      <td>${reservation.accommodation}</td>
      <td>${reservation.startDate}</td>
      <td>${reservation.endDate}</td>
      <td>${reservation.people}</td>
      <td>${reservation.guide}</td>
      <td>S/. ${reservation.total}</td>
      <td>${reservation.status}</td>
      <td class="actions">
          <button class="btn confirm" onclick="openModal('confirm', ${index})" ${
      isCompleted ? "disabled" : ""
    }>Confirmar Pago</button>
          <button class="btn edit" onclick="openModal('edit', ${index})" ${
      isCompleted ? "disabled" : ""
    }>Editar</button>
          <button class="btn delete" onclick="openModal('delete', ${index})" ${
      isCompleted ? "disabled" : ""
    }>Eliminar</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function openModal(actionType, index) {
  currentActionIndex = index;
  currentActionType = actionType;

  const actionTitle = document.getElementById("actionTitle");
  const actionMessage = document.getElementById("actionMessage");
  const actionConfirm = document.getElementById("actionConfirm");

  if (actionType === "confirm") {
    actionTitle.textContent = "Confirmar Pago";
    actionMessage.textContent = "¿Estás seguro de que deseas confirmar el pago para esta reserva?";
    actionConfirm.textContent = "Confirmar Pago";
  } else if (actionType === "edit") {
    actionTitle.textContent = "Editar Reserva";
    actionMessage.textContent = "¿Estás seguro de que deseas editar esta reserva?";
    actionConfirm.textContent = "Editar Reserva";
  } else if (actionType === "delete") {
    actionTitle.textContent = "Eliminar Reserva";
    actionMessage.textContent = "¿Estás seguro de que deseas eliminar esta reserva?";
    actionConfirm.textContent = "Eliminar Reserva";
  }

  document.getElementById("actionModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("actionModal").style.display = "none";
}

function confirmAction() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const reservas = JSON.parse(localStorage.getItem("reservas")) || {};
  const email = currentUser.correo;
  const userReservations = reservas[email] || [];

  if (currentActionType === "confirm") {
    userReservations[currentActionIndex].status = "Completado";
    alert("Pago confirmado. Estado actualizado a Completado.");
  } else if (currentActionType === "edit") {
    editReservation(userReservations, currentActionIndex);
  } else if (currentActionType === "delete") {
    userReservations.splice(currentActionIndex, 1);
    alert("Reserva eliminada.");
  }

  reservas[email] = userReservations;
  localStorage.setItem("reservas", JSON.stringify(reservas));

  loadReservations();
  closeModal();
}

function editReservation(userReservations, index) {
  const reservation = userReservations[index];

  const newDestination = prompt("Destino (Arequipa, Cuzco, Chiclayo):", reservation.destination);
  if (!packages[newDestination]) {
    alert("Destino inválido. Operación cancelada.");
    return;
  }

  const newPackage = prompt("Paquete (Basic, Bronce, Platinum, Gold):", reservation.package.split(" ")[1]);
  if (!packages[newDestination][newPackage]) {
    alert("Paquete inválido. Operación cancelada.");
    return;
  }

  const newStartDate = prompt("Fecha Inicio (yyyy-mm-dd):", reservation.startDate);
  const newEndDate = prompt("Fecha Fin (yyyy-mm-dd):", reservation.endDate);
  const newPeople = parseInt(prompt("Número de Personas:", reservation.people), 10);
  if (isNaN(newPeople) || newPeople <= 0) {
    alert("Número de personas inválido. Operación cancelada.");
    return;
  }

  const days = Math.ceil((new Date(newEndDate) - new Date(newStartDate)) / (1000 * 60 * 60 * 24));
  if (days <= 0) {
    alert("Rango de fechas inválido. Operación cancelada.");
    return;
  }

  const newPrice = packages[newDestination][newPackage];
  const newTotal = days * newPrice * newPeople;

  reservation.destination = newDestination;
  reservation.package = `${newDestination} ${newPackage}`;
  reservation.startDate = newStartDate;
  reservation.endDate = newEndDate;
  reservation.people = newPeople;
  reservation.total = newTotal;

  alert("Reserva actualizada.");
}