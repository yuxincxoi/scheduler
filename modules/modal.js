import closeModal from "./closeModal.js";

const modal = document.getElementById("modal");
const createBtn = document.getElementById("createBtn");
const scheduleContainer = document.getElementById("scheduleContainer");

// opne & close 이벤트
createBtn.addEventListener("click", () => {
  if (modal.style.display === "none") {
    modal.style.height = "600px";
    scheduleContainer.style.display = "flex";
  } else {
    // modal.style.height = "50px";
    // scheduleContainer.style.display = "none";
    closeModal();
  }
});
