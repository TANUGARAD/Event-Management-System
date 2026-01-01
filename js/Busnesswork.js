
  document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     ONE-TIME SCROLL TITLE ANIMATION
     =============================== */
  const title = document.querySelector(".business-title");

  if (title) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            title.classList.add("animate");

            // Run only once
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3
      }
    );

    observer.observe(title);
  }

  /* ===============================
     CARD CLICK COLOR CHANGE
     =============================== */
  const cards = document.querySelectorAll(".business-card");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      // Remove active class from all cards
      cards.forEach(c => c.classList.remove("active"));

      // Add active class to clicked card
      card.classList.add("active");
    });
  });

});
