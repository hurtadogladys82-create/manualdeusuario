document.addEventListener("DOMContentLoaded", () => {
  const deviceTabs = [...document.querySelectorAll(".device-tab")];

  deviceTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      deviceTabs.forEach(item => {
        const selected = item === tab;
        item.setAttribute("aria-selected", String(selected));
        const panel = document.getElementById(item.getAttribute("aria-controls"));
        panel.hidden = !selected;
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

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.textContent = "☰ Menú";
    });
  });

  const guidance = {
    slow: {
      title: "El equipo está lento",
      intro: "Empieza por las comprobaciones del sistema. No instales herramientas de optimización desconocidas.",
      laptop: [
        "Guarda los documentos y cierra las aplicaciones que no estés utilizando.",
        "Comprueba el espacio disponible desde la configuración de almacenamiento.",
        "Revisa las actualizaciones del sistema y permite que terminen sin interrumpirlas.",
        "Si el equipo responde, reinícialo desde el menú del sistema.",
        "Si continúa lento, anota cuándo ocurre y solicita una revisión."
      ],
      desktop: [
        "Guarda los documentos y cierra las aplicaciones que no estés utilizando.",
        "Comprueba el espacio disponible en la unidad donde está instalado el sistema.",
        "Revisa las actualizaciones desde la configuración oficial.",
        "Reinicia desde el menú del sistema si el equipo responde.",
        "Si la lentitud continúa, solicita una evaluación antes de borrar archivos o cambiar ajustes avanzados."
      ],
      warning: "No elimines carpetas del sistema ni formatees como primera medida."
    },
    power: {
      title: "El equipo no enciende",
      intro: "Comprueba la alimentación externa sin abrir el equipo.",
      laptop: [
        "Comprueba que el tomacorriente funcione.",
        "Verifica que el cargador sea el adecuado para el modelo y esté conectado correctamente.",
        "Observa si el cargador o el equipo muestran algún indicador luminoso.",
        "Si no hay respuesta, registra el modelo y solicita una revisión técnica."
      ],
      desktop: [
        "Comprueba que el tomacorriente funcione.",
        "Verifica que el cable de alimentación esté firme en el gabinete.",
        "Comprueba que el monitor tenga alimentación y esté encendido.",
        "Si no hay respuesta, solicita revisión técnica; no abras la fuente de alimentación."
      ],
      warning: "Si hay humo, chispas, olor a quemado o cables dañados, deja de usar el equipo."
    },
    wifi: {
      title: "No hay conexión a Internet",
      intro: "Determina si el problema afecta solo a tu equipo o a toda la red.",
      laptop: [
        "Comprueba que el modo avión esté desactivado.",
        "Verifica que el Wi-Fi esté encendido y que la red seleccionada sea la correcta.",
        "Comprueba si otros dispositivos pueden conectarse a esa misma red.",
        "Si otros dispositivos tampoco conectan, consulta el router o al proveedor."
      ],
      desktop: [
        "Si utilizas cable de red, comprueba que esté conectado en ambos extremos y sin daños.",
        "Si utilizas Wi-Fi, verifica que esté activado y que la red seleccionada sea la correcta.",
        "Comprueba si otros dispositivos pueden conectarse a la misma red.",
        "Si el problema continúa, registra el mensaje de error y solicita soporte."
      ],
      warning: "No restablezcas toda la configuración de red si no sabes cómo recuperar los ajustes."
    },
    screen: {
      title: "La pantalla no muestra imagen",
      intro: "Comprueba primero la alimentación, el brillo y las conexiones externas.",
      laptop: [
        "Comprueba que el equipo esté encendido y conectado a la alimentación si la batería está baja.",
        "Aumenta el brillo con las teclas destinadas a esa función.",
        "Desconecta temporalmente pantallas externas y comprueba si cambia el comportamiento.",
        "Si el equipo parece iniciar pero la pantalla sigue negra, solicita diagnóstico técnico."
      ],
      desktop: [
        "Comprueba que el monitor esté conectado a la corriente y encendido.",
        "Revisa que el cable de video esté firme en ambos extremos y sin daños.",
        "Selecciona en el monitor la entrada correcta, por ejemplo HDMI o DisplayPort.",
        "Si aparece 'Sin señal' y el gabinete parece encendido, solicita una revisión."
      ],
      warning: "No abras el monitor ni el gabinete para manipular componentes internos."
    },
    heat: {
      title: "El equipo se calienta demasiado",
      intro: "El calor anormal puede indicar un problema de ventilación o funcionamiento.",
      laptop: [
        "Coloca la laptop sobre una superficie firme y despejada.",
        "Comprueba que las rejillas de ventilación no estén cubiertas.",
        "Cierra tareas exigentes que no necesites y deja que el equipo se enfríe.",
        "Si se apaga por temperatura o continúa muy caliente, deja de usarlo y solicita asistencia."
      ],
      desktop: [
        "Comprueba que el gabinete tenga espacio libre alrededor.",
        "Verifica visualmente que las rejillas externas no estén obstruidas.",
        "Cierra tareas exigentes que no necesites y observa si vuelve a una temperatura habitual.",
        "Si persiste, solicita una revisión técnica de la ventilación interna."
      ],
      warning: "No introduzcas objetos en las rejillas ni abras el equipo para limpiar ventiladores si no tienes preparación técnica."
    },
    sound: {
      title: "No se escucha el audio",
      intro: "Revisa el volumen, la salida seleccionada y los dispositivos conectados.",
      laptop: [
        "Comprueba que el volumen no esté silenciado.",
        "Abre la configuración de sonido y verifica que estén seleccionados los altavoces correctos.",
        "Desconecta auriculares o dispositivos Bluetooth que no estés utilizando.",
        "Prueba el sonido con otra aplicación."
      ],
      desktop: [
        "Comprueba el volumen del sistema y del monitor o altavoces, si tienen control propio.",
        "Verifica que los altavoces estén conectados a la salida correcta y tengan alimentación.",
        "Revisa en la configuración cuál es el dispositivo de salida seleccionado.",
        "Si no funciona, solicita ayuda para revisar el controlador de audio."
      ],
      warning: "No descargues controladores desde páginas desconocidas."
    },
    usb: {
      title: "No reconoce un dispositivo USB",
      intro: "Comprueba el accesorio y el puerto sin forzar ninguna conexión.",
      laptop: [
        "Retira el dispositivo con la opción de expulsión segura si el sistema lo permite.",
        "Conéctalo de nuevo con cuidado en un puerto compatible.",
        "Comprueba si el dispositivo funciona en otro equipo confiable.",
        "Si varios puertos fallan, solicita revisión técnica."
      ],
      desktop: [
        "Retira el dispositivo con la opción de expulsión segura si el sistema lo permite.",
        "Prueba otro puerto USB compatible, sin forzar el conector.",
        "Comprueba si el dispositivo funciona en otro equipo confiable.",
        "Si varios puertos fallan, solicita revisión técnica."
      ],
      warning: "No introduzcas objetos metálicos en los puertos ni fuerces conectores doblados."
    },
    charge: {
      title: "La laptop no carga",
      intro: "Realiza únicamente comprobaciones externas del sistema de alimentación.",
      laptop: [
        "Comprueba que el tomacorriente funcione.",
        "Verifica que el cargador sea el indicado para tu modelo y esté conectado correctamente.",
        "Observa si el cable, el adaptador o el conector presentan cortes, deformaciones o calor inusual.",
        "Si el equipo reconoce el cargador pero no carga, consulta el soporte del fabricante."
      ],
      desktop: [
        "La carga de batería corresponde principalmente a laptops. Para una PC de escritorio, selecciona 'No enciende' y revisa la alimentación externa.",
        "No conectes adaptadores improvisados ni cambies componentes sin asistencia."
      ],
      warning: "Si la batería está hinchada, muy caliente o dañada, deja de utilizar el equipo y solicita asistencia."
    }
  };

  const symptom = document.getElementById("symptom");
  const diagnosticDevice = document.getElementById("diagnosticDevice");
  const result = document.getElementById("diagnosis");

  function showDiagnosis() {
    const selected = symptom.value;
    const device = diagnosticDevice.value;

    result.replaceChildren();
    if (!selected || !guidance[selected]) {
      result.textContent = "Selecciona tu equipo y el síntoma para consultar las comprobaciones recomendadas.";
      return;
    }

    const data = guidance[selected];
    const heading = document.createElement("h3");
    heading.textContent = data.title;
    const intro = document.createElement("p");
    intro.className = "diagnosis-intro";
    intro.textContent = data.intro;
    const list = document.createElement("ol");

    data[device].forEach(step => {
      const item = document.createElement("li");
      item.textContent = step;
      list.appendChild(item);
    });

    const warning = document.createElement("p");
    warning.className = "diagnosis-warning";
    const strong = document.createElement("strong");
    strong.textContent = "Importante: ";
    warning.append(strong, document.createTextNode(data.warning));

    result.append(heading, intro, list, warning);
  }

  symptom.addEventListener("change", showDiagnosis);
  diagnosticDevice.addEventListener("change", showDiagnosis);

  const sections = [...document.querySelectorAll("main section[id]")];
  const links = [...navLinks.querySelectorAll("a")];
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
          });
        }
      });
    }, { rootMargin: "-25% 0px -65% 0px" });
    sections.forEach(section => observer.observe(section));
  }
});
