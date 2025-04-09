const packages = {  
  Arequipa: {  
    Basic: { price: 400, accommodations: ["Hostal Oasis", "Hostal Confort", "Hostal White"] },  
    Bronce: { price: 600, accommodations: ["Hotel Madison - 3 estrellas", "Hotel Andes - 3 estrellas"] },  
    Platinum: { price: 800, accommodations: ["Hotel Pensilvania - 5 estrellas", "Hotel Real - 5 estrellas"] },  
    Gold: { price: 1000, accommodations: ["Hotel Star - De Lujo", "Hotel Nova - De Lujo"] },  
  },  
  Cuzco: {  
    Basic: { price: 400, accommodations: ["Hostal Pariwana", "Hostal Pirwa", "Hostal Way Cap"] },  
    Bronce: { price: 600, accommodations: ["Hotel Selina - 3 estrellas", "Hotel Royal - 3 estrellas"] },  
    Platinum: { price: 800, accommodations: ["Hotel Golden Inca - 5 estrellas", "Hotel Inka II - 5 estrellas"] },  
    Gold: { price: 1000, accommodations: ["Hotel Imperial - De Lujo", "Hotel Inkayra - De Lujo"] },  
  },  
  Chiclayo: {  
    Basic: { price: 400, accommodations: ["Hostal Solec", "Hostal Chiclayito", "Hostal San Eduardo"] },  
    Bronce: { price: 600, accommodations: ["Hotel Casa Andina - 3 estrellas", "Hotel Winner - 3 estrellas"] },  
    Platinum: { price: 800, accommodations: ["Hotel Plaza Gold - 5 estrellas", "Hotel Perla - 5 estrellas"] },  
    Gold: { price: 1000, accommodations: ["Hotel Bulgari - De Lujo", "Hotel Crillon - De Lujo"] },  
  },  
};  

document.addEventListener("DOMContentLoaded", () => {  
  const today = new Date().toISOString().split("T")[0];  
  document.getElementById("startDate").setAttribute("min", today);  
  document.getElementById("endDate").setAttribute("min", today);
  localStorage.removeItem("reservationFormData");  
});

function updatePackages() {  
  const destination = document.getElementById("destination").value;  
  const packageSelect = document.getElementById("package");  

  packageSelect.innerHTML = `<option value="">-- Seleccionar --</option>`;  
  if (packages[destination]) {  
    Object.entries(packages[destination]).forEach(([key, value]) => {  
      packageSelect.innerHTML += `<option value="${key}">${destination} ${key} - S/. ${value.price}</option>`;  
    });  
  }  
  updateAccommodations();  
}  

function updateAccommodations() {  
  const destination = document.getElementById("destination").value;  
  const selectedPackage = document.getElementById("package").value;  
  const accommodationSelect = document.getElementById("accommodation");  

  accommodationSelect.innerHTML = `<option value="">-- Seleccionar --</option>`;  
  if (packages[destination] && packages[destination][selectedPackage]) {  
    packages[destination][selectedPackage].accommodations.forEach((hotel) => {  
      accommodationSelect.innerHTML += `<option value="${hotel}">${hotel}</option>`;  
    });  
  }  
}  

function calculateTotal(startDate, endDate, packagePrice, peopleCount) {  
  const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));  
  return days * packagePrice * peopleCount;  
}
// ver perfil
function goToProfile() {
  window.location.href = 'perfil.html'; // redireccionamiento a la pestaña Perfil
}

// ver gestion reservas
function goToReservation() {
  window.location.href = 'gestion-reserva.html';  // redireccionamiento a la pestaña Gestion Reservas
}

function updateGuideAvailability() {
  const guideSelect = document.getElementById("guide");
  const reservas = JSON.parse(localStorage.getItem("reservas")) || {};
  const allReservations = Object.values(reservas).flat(); // Unir todas las reservas de todos los usuarios

  // Obtener guías ocupados
  const occupiedGuides = allReservations.map(reserva => reserva.guide);

  // Actualizar opciones de guía
  Array.from(guideSelect.options).forEach(option => {
    if (occupiedGuides.includes(option.value)) {
      option.disabled = true;
    } else {
      option.disabled = false;
    }
  });
}

// Llamar la función al cargar la página
document.addEventListener("DOMContentLoaded", updateGuideAvailability);  

function makeReservation() {  
  const destination = document.getElementById("destination").value;  
  const people = document.getElementById("people").value;  
  const selectedPackage = document.getElementById("package").value;  
  const accommodation = document.getElementById("accommodation").value;  
  const startDate = document.getElementById("startDate").value;  
  const endDate = document.getElementById("endDate").value;  
  const guide = document.getElementById("guide").value;  

  // Validar campos  
  if (!destination || !people || !selectedPackage || !accommodation || !startDate || !endDate || !guide) {  
    alert("Por favor, completa todos los campos.");  
    return;  
  }  

  // Validar fechas  
  if (new Date(startDate) >= new Date(endDate)) {  
    alert("La fecha de inicio debe ser anterior a la fecha de fin.");  
    return;  
  }
  if (people <= 0) {
    alert("Por favor, ingresa una cantidad válida de personas.");
    return;
  }
    
  
  const packageDetails = packages[destination][selectedPackage];  
  const total = calculateTotal(startDate, endDate, packageDetails.price, people);  

  const reservation = {  
    destination,  
    package: `${destination} ${selectedPackage}`,  
    price: packageDetails.price,  
    accommodation,  
    startDate,  
    endDate,  
    people,  
    guide,  
    total,  
    status: "Proceso",  
  };  

  // Obtener el usuario actual  
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));  
  if (currentUser) {  
    const email = currentUser.correo; // Obtener el correo del usuario  

    // Obtener el objeto de reservas desde localStorage  
    const reservas = JSON.parse(localStorage.getItem("reservas")) || {};  

    // Si no existe un array de reservas para el usuario, inicializarlo  
    if (!reservas[email]) {  
      reservas[email] = [];  
    }  

    // Agregar la reserva al array de reservas del usuario  
    reservas[email].push(reservation);  
    
    // Actualizar el objeto de reservas en localStorage  
    localStorage.setItem("reservas", JSON.stringify(reservas));  
  } else {  
    alert("No se encontró un usuario registrado. Por favor, inicia sesión.");  
    return;  
  }  

  // Mostrar resumen de la reserva  
  document.getElementById("summaryDetails").innerHTML = `  
    <strong>Resumen de la Reserva:</strong><br>  
    Destino: ${reservation.destination}<br>  
    Paquete: ${reservation.package}<br>  
    Precio por día: S/. ${reservation.price}<br>  
    Alojamiento: ${reservation.accommodation}<br>  
    Fecha Inicio: ${reservation.startDate}<br>  
    Fecha Fin: ${reservation.endDate}<br>  
    Número de personas: ${reservation.people}<br>  
    Guía: ${reservation.guide}<br>  
    Monto total: S/. ${reservation.total}  
  `;  
  document.getElementById("reservationSummary").classList.remove("hidden");
  updateGuideAvailability();  
}
document.getElementById("reservationForm").addEventListener("input", () => {
  const formData = {
    destination: document.getElementById("destination").value,
    people: document.getElementById("people").value,
    package: document.getElementById("package").value,
    accommodation: document.getElementById("accommodation").value,
    startDate: document.getElementById("startDate").value,
    endDate: document.getElementById("endDate").value,
    guide: document.getElementById("guide").value,
  };
  saveToLocalStorage("reservationFormData", formData);
});
// Al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  const savedFormData = getFromLocalStorage("reservationFormData");
  if (savedFormData) {
    document.getElementById("destination").value = savedFormData.destination;
    document.getElementById("people").value = savedFormData.people;
    document.getElementById("package").value = savedFormData.package;
    document.getElementById("accommodation").value = savedFormData.accommodation;
    document.getElementById("startDate").value = savedFormData.startDate;
    document.getElementById("endDate").value = savedFormData.endDate;
    document.getElementById("guide").value = savedFormData.guide;
  }
});

function resetForm() {  
  document.getElementById("reservationForm").reset();  
  document.getElementById("reservationSummary").classList.add("hidden");  
}
function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || null;
}