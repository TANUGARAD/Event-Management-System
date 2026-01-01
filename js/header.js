window.addEventListener("load", () => {
  const header = document.querySelector(".header");
  const hero = document.querySelector(".hero");

  /* HEADER SLIDE DOWN */
  setTimeout(() => {
    header.classList.add("show");
  }, 400);

  /* HERO + BUTTON ANIMATION (ONCE) */
  setTimeout(() => {
    hero.classList.add("show");
  }, 900);
});
document.addEventListener("DOMContentLoaded", () => {
  const contactBtn = document.querySelector(".btn-secondary");
  const contactSection = document.querySelector("#contact");

  contactBtn.addEventListener("click", () => {
    contactSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

