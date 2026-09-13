document.addEventListener("DOMContentLoaded", function () {
  // Busca el primer título H1 del tema
  const h1 = document.querySelector(".md-content__inner h1");

  if (h1) {
    // 1. Crea un contenedor con flexbox para alinear el título y el botón
    const wrapper = document.createElement("div");
    wrapper.className = "header-tema-container";

    // 2. Coloca el contenedor antes del H1 y mete el H1 dentro
    h1.parentNode.insertBefore(wrapper, h1);
    wrapper.appendChild(h1);

    // 3. Crea el botón de impresión
    const printBtn = document.createElement("button");
    printBtn.innerHTML = "🖨️ Imprimir tema";
    printBtn.className = "md-button md-button--primary btn-imprimir";
    printBtn.onclick = function () {
      window.print();
    };

    // 4. Añade el botón a la derecha del título dentro del contenedor
    wrapper.appendChild(printBtn);
  }
});