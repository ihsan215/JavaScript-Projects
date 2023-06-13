///////////////////////
// Parameter Define

const showModelBtns = document.querySelectorAll(".modal-btn");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModalBtn = document.querySelector(".close-btn");

// Parameter Define
///////////////////////

//////////////////////
// Functions

function openModel() {
  overlay.classList.remove("hidden");
  modal.classList.remove("hidden");
}

function closeModel() {
  overlay.classList.add("hidden");
  modal.classList.add("hidden");
}

// Btns Event Functions
for (let i = 0; i < showModelBtns.length; i++) {
  showModelBtns[i].addEventListener("click", function () {
    openModel();
  });

  // Close Btn Event
  closeModalBtn.addEventListener("click", function () {
    closeModel();
  });

  // Overlay Click
  overlay.addEventListener("click", function () {
    if (!modal.classList.contains("hidden")) {
      closeModel();
    }
  });

  // Click ESC to close
  document.addEventListener("keydown", function (e) {
    if (!modal.classList.contains("hidden") && e.key === "Escape") {
      closeModel();
    }
  });
}

// Functiones
//////////////////////
