/////////////////////////////
// General Parameter

// Slides
const sliderDom = document.querySelector(".slider");
const slidesDom = document.querySelectorAll(".slide");

// Prev , Next
const nextDom = document.querySelector(".next");
const prevDom = document.querySelector(".prev");

// Slide Lengt
const slidelength = slidesDom.length;
const maxSize = slidelength - 1;

// Dots
const dotsDom = document.querySelector(".dots");
const dotDom = document.querySelectorAll(".dot");

// Current Slide
let currentSlide = 0;

// General Parameter
/////////////////////////////

// Check Slide Size
const checkCurrentSlide = function () {
  if (currentSlide > maxSize) {
    currentSlide = 0;
  } else if (currentSlide < 0) {
    currentSlide = maxSize;
  } else {
    return;
  }
};

// Go to slide
const goToSlide = function (slideNo) {
  slidesDom.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - slideNo)}%)`;
    slide.classList.add("hidden");
    if (i == currentSlide) slide.classList.remove("hidden");
  });
};

goToSlide(currentSlide);

////////////////////////////
// Event Functions
const moveEventFunc = function () {
  currentSlide = currentSlide + this.moveNo;
  checkCurrentSlide();
  selectActiveDot();
  goToSlide(currentSlide);
};

const selectActiveDot = function () {
  dotDom.forEach((item, i) => {
    item.classList.remove("active-dot");
    if (i == currentSlide) item.classList.add("active-dot");
  });
};

nextDom.addEventListener("click", moveEventFunc.bind({ moveNo: 1 }));

prevDom.addEventListener("click", moveEventFunc.bind({ moveNo: -1 }));

dotsDom.addEventListener("click", function (e) {
  const clicked = e.target.closest(".dot");
  if (!clicked) return;
  currentSlide = clicked.dataset.slide - 1;
  selectActiveDot();
  goToSlide(currentSlide);
});
// Event Functions
////////////////////////////
