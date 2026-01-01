document.addEventListener("DOMContentLoaded", () => {
  const sectionOne = document.querySelector(".page-wrapper .section-one");
  const image = document.querySelector(".page-wrapper .image-content img");

  if (!sectionOne || !image) return;

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          image.classList.add("animate-once");
          observerInstance.unobserve(sectionOne); // run only once
        }
      });
    },
    {
      threshold: 0.4 // triggers when 40% visible
    }
  );

  observer.observe(sectionOne);
});
