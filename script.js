document.addEventListener("DOMContentLoaded", function () {
  const formularioSeleccionado = sessionStorage.getItem(
    "formularioSeleccionado"
  );
  const itemSeleccionado = sessionStorage.getItem("itemSeleccionado");

  const botonesIniciales = document.querySelector(".button-container");
  const mensajeExito = document.getElementById("mensaje");
  const btnVolver = document.getElementById("btn-volver");

  // ✅ Mostrar u ocultar los botones iniciales correctamente
  if (!formularioSeleccionado) {
    botonesIniciales.style.display = "block";
  } else {
    botonesIniciales.style.display = "none";
    btnVolver.style.display = "block";
  }

  // Ocultar todos los formularios al inicio
  document.querySelectorAll(".formulario").forEach((form) => {
    form.style.display = "none";
  });

  // ✅ Si hay un formulario seleccionado desde otra página, mostrarlo
  if (formularioSeleccionado) {
    const form = document.getElementById(formularioSeleccionado);
    if (form) {
      form.style.display = "block";
    }

    // ✅ Seleccionar el checkbox correcto según el servicio elegido
    const checkboxes = form.querySelectorAll("input[type=checkbox]");
    checkboxes.forEach((checkbox) => {
      if (checkbox.value === itemSeleccionado) {
        checkbox.checked = true;
      }
    });

    // ✅ Limpiar sessionStorage después de usarlo
    sessionStorage.removeItem("formularioSeleccionado");
    sessionStorage.removeItem("itemSeleccionado");
  }
  // ✅ Manejo de los botones para seleccionar formularios manualmente
  document.querySelectorAll(".btn1").forEach((button) => {
    button.addEventListener("click", function () {
      let targetId = this.getAttribute("data-target");
      let targetForm = document.getElementById(targetId);

      // Ocultar todos los formularios y mensaje de éxito
      document.querySelectorAll(".formulario").forEach((form) => {
        form.style.display = "none";
      });
      mensajeExito.style.display = "none";

      // ✅ Mostrar el formulario seleccionado
      targetForm.style.display = "block";

      // ✅ Ocultar los botones iniciales
      botonesIniciales.style.display = "none";
      btnVolver.style.display = "block";
    });
  });
  // ✅ Evento para el botón "Volver" ⬇️ (AQUÍ ES DONDE SE AGREGA)
  btnVolver.addEventListener("click", function () {
    document.querySelectorAll(".formulario").forEach((form) => {
      form.style.display = "none"; // Ocultar formularios
    });

    botonesIniciales.style.display = "block"; // Mostrar botones iniciales
    btnVolver.style.display = "none"; // Ocultar el botón "Volver"
    mensajeExito.style.display = "none"; // Ocultar mensaje de éxito
  });
});

// ✅ Redirigir desde los botones de "Servicios" al formulario correspondiente
document.querySelectorAll(".redirect-button").forEach((button) => {
  button.addEventListener("click", function () {
    let formType = this.getAttribute("data-form"); // "formulario2"
    let item = this.getAttribute("data-item"); // "diseñoYparquizaciones"

    // ✅ Guardamos en sessionStorage para que "formulario.html" lo detecte
    sessionStorage.setItem("formularioSeleccionado", formType);
    sessionStorage.setItem("itemSeleccionado", item);

    // ✅ Redirigir a la página correcta
    window.location.href = "formulario.html";
  });
});

// ✅ Función para mostrar el mensaje de éxito y ocultar los formularios
function mostrarMensajeExito() {
  // Ocultar todos los formularios
  document.querySelectorAll(".formulario").forEach((form) => {
    form.style.display = "none";
  });

  // ✅ Mostrar mensaje de éxito
  document.getElementById("mensaje").style.display = "block";
}

// ✅ Capturar el envío de cualquier formulario y mostrar mensaje de éxito
document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    mostrarMensajeExito();
  });
});

// ✅ Ocultar botones iniciales si existen (arreglando el error de ID inexistente)
const botonesIniciales = document.querySelector(".button-container");
if (botonesIniciales) {
  botonesIniciales.style.display = "none";
}

// Función para reiniciar la vista y mostrar los botones iniciales
function nuevaConsulta() {
  // Recargar la página de contacto para reiniciar todo
  window.location.href = "formulario.html";
}
