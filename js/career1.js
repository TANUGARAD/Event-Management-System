// ================= HERO IMAGE ANIMATION =================
const imageWrap = document.querySelector('.hero-image-wrap-new');

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top < window.innerHeight && rect.bottom >= 0
  );
}

function animateOnScroll() {
  if (imageWrap && isInViewport(imageWrap)) {
    imageWrap.classList.add('animate');
    window.removeEventListener('scroll', animateOnScroll); // run only once
  }
}

window.addEventListener('scroll', animateOnScroll);
// also check on page load in case it's already in view
animateOnScroll();


// ================= CAREER SECTION SCROLL ANIMATION =================
document.addEventListener("DOMContentLoaded", function () {
  const section = document.querySelector(".career-section");

  if (section) {
    const observer = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            section.classList.add("scroll-hover");
            observer.unobserve(section); // ONLY ONCE
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
  }
});
