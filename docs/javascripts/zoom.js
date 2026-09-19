document.addEventListener("DOMContentLoaded", function () {
  const modal = document.createElement("div");
  modal.className = "zoom-modal";
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML = `
    <div class="zoom-modal__content">
      <button class="zoom-modal__close" type="button" aria-label="Cerrar imagen ampliada">×</button>
      <img class="zoom-modal__image" src="" alt="" />
    </div>
  `;

  const modalImage = modal.querySelector(".zoom-modal__image");
  const closeButton = modal.querySelector(".zoom-modal__close");

  document.body.appendChild(modal);

  function closeZoom() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function openZoom(image) {
    const source = image.currentSrc || image.src;
    if (!source) return;

    modalImage.src = source;
    modalImage.alt = image.alt || "Imagen ampliada";
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  document.querySelectorAll("img").forEach((image) => {
    if (image.closest(".zoom-modal") || image.dataset.zoom === "disabled") {
      return;
    }

    image.classList.add("zoomable-image");
    image.addEventListener("click", () => openZoom(image));
  });

  closeButton.addEventListener("click", closeZoom);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeZoom();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeZoom();
    }
  });
});
