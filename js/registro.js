// Abrir y cerrar modal  
function openModal() {  
  document.getElementById("registerModal").style.display = "flex";  
}  

function closeModal() {  
  document.getElementById("registerModal").style.display = "none";  
}  

// Limpiar campos del formulario después del registro  
function clearRegisterForm() {  
  document.getElementById("nombre").value = '';  
  document.getElementById("apellido").value = '';  
  document.getElementById("telefono").value = '';  
  document.getElementById("correo").value = '';  
  document.getElementById("password-reg").value = '';  
  document.getElementById("confirm-password").value = '';  
  // Limpiar mensajes de error  
  document.querySelectorAll('.error-message').forEach((element) => {  
      element.textContent = '';  
  });  
}  

// Validar y registrar usuario  
function validateForm() {  
  const fields = [  
      { id: "nombre", error: "error-nombre", message: "El nombre es obligatorio." },  
      { id: "apellido", error: "error-apellido", message: "Los apellidos son obligatorios." },  
      { id: "telefono", error: "error-telefono", message: "El teléfono es obligatorio." },  
      { id: "correo", error: "error-correo", message: "El correo electrónico es obligatorio." },  
      { id: "password-reg", error: "error-password", message: "La contraseña es obligatoria." },  
      { id: "confirm-password", error: "error-confirm-password", message: "Debes confirmar la contraseña." },  
  ];  

  let isValid = true;  

  // Validar los campos  
  fields.forEach((field) => {  
      const input = document.getElementById(field.id);  
      const errorElement = document.getElementById(field.error);  

      if (!input.value.trim()) {  
          errorElement.textContent = field.message;  
          isValid = false;  
      } else {  
          errorElement.textContent = "";  
      }  
  });  

  // Verificar si las contraseñas coinciden  
  const password = document.getElementById("password-reg").value;  
  const confirmPassword = document.getElementById("confirm-password").value;  

  if (password && confirmPassword && password !== confirmPassword) {  
      document.getElementById("error-confirm-password").textContent =  
          "Las contraseñas no coinciden.";  
      isValid = false;  
  }  

  if (isValid) {  
      // Obtener el correo del usuario  
      const email = document.getElementById("correo").value.trim();  

      // Obtener el array de usuarios existentes  
      let users = JSON.parse(localStorage.getItem("users")) || [];  

      // Verificar si el correo ya está registrado  
      const existingUser = users.find(user => user.correo === email);  

      if (existingUser) {  
          document.getElementById("error-correo").textContent = "Este correo ya está registrado.";  
          return;  
      }  

      // Obtener los datos del nuevo usuario  
      const userData = {  
          nombre: document.getElementById("nombre").value,  
          apellido: document.getElementById("apellido").value,  
          telefono: document.getElementById("telefono").value,  
          correo: email,  
          password: password,  
          reservas: [] // Inicializar el array de reservas vacío  
      };  

      // Agregar el nuevo usuario al array  
      users.push(userData);  

      // Guardar el array actualizado en localStorage  
      localStorage.setItem("users", JSON.stringify(users));  

      alert("Registro exitoso.");  
      closeModal();  
      clearRegisterForm(); // Limpiar el formulario de registro después del éxito  
  }  
}  

// Validar inicio de sesión
function validateLogin(event) {
  event.preventDefault();

  const emailInput = document.getElementById("email").value.trim();
  const passwordInput = document.getElementById("password").value.trim();
  const errorElement = document.getElementById("error-login-password");

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const storedUser = users.find(user => user.correo === emailInput && user.password === passwordInput);

  if (!storedUser) {
      errorElement.textContent = "Correo o contraseña incorrectos";
      return;
  }

  errorElement.textContent = "";

  // Cargar las reservas desde el objeto global de reservas
  const reservas = JSON.parse(localStorage.getItem("reservas")) || {};
  storedUser.reservas = reservas[emailInput] || [];

  // Actualizar el currentUser
  localStorage.setItem("currentUser", JSON.stringify(storedUser));

  openLoginSuccessModal();

  setTimeout(function () {
      window.location.href = "reserva.html";
  }, 2000);
} 
// Actualizar las reservas del currentUser antes de cerrar sesión
function actualizarReservasAntesCerrarSesion() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) return;

  const reservas = JSON.parse(localStorage.getItem("reservas")) || {};
  reservas[currentUser.correo] = currentUser.reservas;

  localStorage.setItem("reservas", JSON.stringify(reservas));
}
// Función para cargar las reservas del usuario  
function cargarReservas(email) {  
    const reservas = JSON.parse(localStorage.getItem("reservas")) || {};  
    
    // Si no existen reservas, inicializa un array vacío  
    if (!reservas[email]) {  
        reservas[email] = [];  
    }  

    // Guarda las reservas en el currentUser o en otro lugar si es necesario  
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));  
    currentUser.reservas = reservas[email];  
    localStorage.setItem("currentUser", JSON.stringify(currentUser));  
}
// Función para guardar las reservas en localStorage para el usuario actual
function guardarReservas(email, reservasUsuario) {
  const reservas = JSON.parse(localStorage.getItem("reservas")) || {};
  reservas[email] = reservasUsuario;
  localStorage.setItem("reservas", JSON.stringify(reservas));
} 

// Función para abrir el modal de inicio de sesión exitoso  
function openLoginSuccessModal() {  
  document.getElementById("loginSuccessModal").style.display = "flex";  
}  

// Función para cerrar el modal de inicio de sesión exitoso  
function closeLoginSuccessModal() {  
  document.getElementById("loginSuccessModal").style.display = "none";  
  window.location.href = "reserva.html"; // Redirigir inmediatamente si el modal se cierra  
}

function redirectToAdminLogin() {
  window.location.href = "login-admin.html";
}
