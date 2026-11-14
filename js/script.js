const deviceTabs = [...document.querySelectorAll(".device-tab")];

deviceTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    deviceTabs.forEach((t) => {
      const selected = t === tab;
      t.setAttribute("aria-selected", String(selected));
      document.getElementById(t.getAttribute("aria-controls")).hidden =
        !selected;
    });
  });
});

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.textContent = open ? "✕ Cerrar" : "☰ Menú";
});

navLinks.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.textContent = "☰ Menú";
  });
});

const advice = {
  slow: [
    "Cierra las aplicaciones que no estés utilizando.",
    "Reinicia el equipo si responde con normalidad.",
    "Revisa el espacio disponible y las actualizaciones pendientes.",
    "Si continúa lento, registra cuándo ocurre y solicita una revisión técnica.",
  ],
  power: [
    "Comprueba que el tomacorriente funcione y que el cable externo esté bien conectado.",
    "En una laptop, observa si el cargador muestra algún indicador luminoso.",
    "No insistas si hay olor, calor anormal o daños visibles.",
    "Si sigue sin encender, solicita asistencia técnica.",
  ],
  wifi: [
    "Comprueba que el modo avión esté desactivado y que el Wi-Fi esté encendido.",
    "Verifica si otros dispositivos pueden conectarse a la misma red.",
    "Si tienes autorización, reinicia el router siguiendo sus indicaciones.",
    "Si continúa el problema, solicita soporte.",
  ],
  screen: [
    "Comprueba que el equipo esté encendido y revisa el brillo.",
    "En una PC, verifica que el monitor tenga alimentación y el cable externo esté conectado.",
    "Si el equipo parece iniciar pero no muestra imagen, solicita revisión técnica.",
  ],
  heat: [
    "Guarda tu trabajo y apaga el equipo si el calentamiento es excesivo.",
    "Colócalo sobre una superficie firme y despeja las rejillas externas.",
    "No lo utilices sobre telas ni superficies que bloqueen la ventilación.",
    "Si vuelve a calentarse o hace ruidos inusuales, solicita revisión técnica.",
  ],
  sound: [
    "Comprueba el volumen y que el sonido no esté silenciado.",
    "Revisa el dispositivo de salida seleccionado en el sistema.",
    "Comprueba la conexión de auriculares o altavoces.",
    "Si no se soluciona, solicita ayuda para revisar el controlador de audio.",
  ],
  usb: [
    "Prueba otro puerto disponible y compatible.",
    "Comprueba si el dispositivo funciona en otro equipo confiable.",
    "Si aparece en el sistema, utiliza la opción de expulsión segura antes de retirarlo.",
    "Si varios puertos fallan, solicita revisión técnica.",
  ],
  charge: [
    "Comprueba el tomacorriente y que el cargador esté conectado correctamente.",
    "Revisa visualmente que el cable y el adaptador no estén dañados.",
    "Verifica si el sistema reconoce el adaptador de corriente.",
    "Si la batería está hinchada, muy caliente o dañada, deja de usar el equipo y solicita asistencia.",
  ],
};

document.getElementById("symptom").addEventListener("change", (e) => {
  const box = document.getElementById("diagnosis");
  box.replaceChildren();

  const items = advice[e.target.value];

  if (!items) {
    box.textContent = "Aquí aparecerán las comprobaciones recomendadas.";
    return;
  }

  const ol = document.createElement("ol");

  items.forEach((text) => {
    const li = document.createElement("li");
    li.textContent = text;
    ol.appendChild(li);
  });

  box.append("Comprobaciones iniciales:", ol);
});

const sections = [...document.querySelectorAll("main section[id]")];
const links = [...navLinks.querySelectorAll("a")];

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((a) => {
            a.classList.toggle(
              "active",
              a.getAttribute("href") === "#" + entry.target.id,
            );
          });
        }
      });
    },
    {
      rootMargin: "-25% 0px -65% 0px",
    },
  );

  sections.forEach((section) => observer.observe(section));
}
