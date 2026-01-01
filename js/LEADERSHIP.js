const leadershipSection = document.querySelector('.leadership-section');
const cards = document.querySelectorAll('.leader-card');

let animationPlayed = false;

// assign direction classes
cards.forEach((card, index) => {
  if (index < 3) {
    card.classList.add('from-top');
  } else {
    card.classList.add('from-bottom');
  }
});

leadershipSection.addEventListener('mouseenter', () => {
  if (animationPlayed) return;

  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('animate');
    }, index * 150); // smooth stagger
  });

  animationPlayed = true;
});
