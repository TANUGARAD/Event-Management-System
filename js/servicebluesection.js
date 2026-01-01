const blueSection = document.querySelector('.blue-section');
const items = document.querySelectorAll('.blue-section .item');

let animatedOnce = false;

blueSection.addEventListener('mouseenter', () => {
  if (animatedOnce) return; // run only once

  items.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add('animate-up');
    }, index * 150); // slight stagger effect
  });

  animatedOnce = true;
});
