document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("new-note-modal");
    const openModalButton = document.getElementById("open-modal-btn");
    const closeModalButtons = modal.querySelectorAll("[data-modal-toggle]");
  
    // Ouvrir la modale
    openModalButton.addEventListener("click", () => {
      modal.classList.remove("hidden");
      modal.setAttribute("aria-hidden", "false");
    });
  
    // Fermer la modale au clic sur les boutons de fermeture
    closeModalButtons.forEach((button) => {
      button.addEventListener("click", () => {
        modal.classList.add("hidden");
        modal.setAttribute("aria-hidden", "true");
      });
    });
  
    // Fermer la modale en cliquant en dehors
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.classList.add("hidden");
        modal.setAttribute("aria-hidden", "true");
      }
    });
  });
  