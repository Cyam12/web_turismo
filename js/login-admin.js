// Credenciales predefinidas
const adminCredentials = [
  { email: "fabricio@gmail.com", password: "admin123" },
  { email: "diego@gmail.com", password: "admin123" },
  { email: "alvaro@gmail.com", password: "admin123" },
  { email: "alvaro@gmail.com", password: "admin123" },
  { email: "williams@gmail.com", password: "admin123" }
];

// Guardar las credenciales en localStorage para consistencia
if (!localStorage.getItem("adminUsers")) {
  localStorage.setItem("adminUsers", JSON.stringify(adminCredentials));
}

// Elementos del DOM
const loginForm = document.getElementById("admin-login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginError = document.getElementById("login-error");
const loginBtn = document.getElementById("login-btn");

// Validación de credenciales
loginBtn.addEventListener("click", (event) => {
  event.preventDefault(); // Evita el comportamiento por defecto del formulario

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // Verificar que los campos no estén vacíos
  if (!email || !password) {
    loginError.textContent = "Por favor, complete todos los campos.";
    loginError.style.display = "block";
    return;
  }

  // Obtener las credenciales almacenadas
  const storedAdmins = JSON.parse(localStorage.getItem("adminUsers")) || [];

  // Buscar coincidencias
  const validAdmin = storedAdmins.find(
    (admin) => admin.email === email && admin.password === password
  );

  if (validAdmin) {
    // Guardar al usuario actual como 'currentUser'
    localStorage.setItem("currentUser", JSON.stringify({ role: "admin", email }));
    window.location.href = "vista-admin.html"; // Redirige al panel administrativo
  } else {
    loginError.textContent = "Correo o contraseña incorrectos.";
    loginError.style.display = "block";
  }
});

// Ocultar mensaje de error al cambiar los inputs
[emailInput, passwordInput].forEach((input) =>
  input.addEventListener("input", () => {
    loginError.style.display = "none";
  })
);
