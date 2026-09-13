// =========================================================================
// UNICO PUNTO DE CONTROL: Añade o quita aquí las páginas deshabilitadas
// =========================================================================
const DISABLED_TOPICS = [
//  "tema2-enlace",
//  "tema3-termoquimica",
//  "tema4-cinetica",
//  "tema5-equilibrio",
//  "tema6-acido_base",
//  "tema7-redox",
//  "tema8-organica",
//  "tema9-polimeros"
];
// =========================================================================

function processDisabledLinks() {
  const currentPath = window.location.pathname;

  // 1. Redirigir al inicio si se intenta acceder por URL a una página deshabilitada
  const isBlockedPage = DISABLED_TOPICS.some(topic => currentPath.includes(topic));
  if (isBlockedPage) {
    const baseUrl = window.location.origin + window.location.pathname.split('/MI_WEB_QUIMICA')[0] + '/MI_WEB_QUIMICA/';
    window.location.href = baseUrl;
    return;
  }

  // 2. Deshabilitar los enlaces en index.md y en el menú lateral
  const allLinks = document.querySelectorAll("a");

  allLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (!href) return;

    const isLinkDisabled = DISABLED_TOPICS.some(topic => href.includes(topic));

    if (isLinkDisabled) {
      // Estilos: solo atenúa el color y bloquea el ratón (SIN tachado)
      link.classList.add("is-disabled-link");
      link.style.opacity = "0.45";
      link.style.pointerEvents = "none";
      link.style.cursor = "not-allowed";
      link.setAttribute("tabindex", "-1");
      link.setAttribute("aria-disabled", "true");

      // Bloquear el evento de clic
      link.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }, true);
    }
  });
}

// Ejecutar en la carga de página
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", processDisabledLinks);
} else {
  processDisabledLinks();
}

// Compatibilidad con la navegación instantánea de MkDocs
if (typeof location$ !== "undefined") {
  location$.subscribe(function () {
    setTimeout(processDisabledLinks, 100);
  });
}