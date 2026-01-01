document.addEventListener("DOMContentLoaded", function () {
  const section = document.querySelector(".testimonials-section");
  const cards = document.querySelectorAll(".testimonial-card");

  let played = false;

  section.addEventListener("mouseenter", () => {
    if (played) return;

    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("animate");
      }, index * 150);
    });

    played = true;
  });
});
