const slider = document.querySelector('.items');

let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX;                  // FIX: use pageX for Cypress
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
});

slider.addEventListener('mouseup', () => {
  isDown = false;
});

slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;

  const x = e.pageX;
  const walk = x - startX;

  slider.scrollLeft = scrollLeft - walk;   // left drag => positive scroll
});
