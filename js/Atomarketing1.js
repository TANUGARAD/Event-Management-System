document.addEventListener("DOMContentLoaded", () => {
  const leftImage = document.querySelector(".image-content1 img");
  let animated = false;

  window.addEventListener("scroll", () => {
    if (animated) return;

    const rect = leftImage.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight - 150) {
      leftImage.classList.add("animate-once");
      animated = true; // 🔒 only once
    }
  });
});
