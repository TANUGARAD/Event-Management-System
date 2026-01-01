window.addEventListener("DOMContentLoaded", () => {
  const solutionsContainer = document.querySelector(".solutions-container");

  if (!solutionsContainer) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(solutionsContainer);
});
