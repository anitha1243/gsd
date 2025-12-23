document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const cookieBanner = document.querySelector(".cookie-banner");
  const cookieButtons = document.querySelectorAll("[data-cookie]");
  const consentKey = "gsdc-cookie-consent";

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  const savedConsent = localStorage.getItem(consentKey);
  if (!savedConsent && cookieBanner) {
    cookieBanner.style.display = "block";
  }

  cookieButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const choice = button.dataset.cookie;
      if (!choice) return;

      if (choice === "accept") {
        localStorage.setItem(consentKey, "accepted");
      } else if (choice === "reject") {
        localStorage.setItem(consentKey, "rejected");
      } else if (choice === "choose") {
        localStorage.setItem(consentKey, "customized");
      }

      if (cookieBanner) {
        cookieBanner.style.display = "none";
      }
    });
  });

  // Testimonial Carousel
  const track = document.querySelector(".testimonial-track");
  const testimonials = document.querySelectorAll(".testimonial");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");
  const dots = document.querySelectorAll(".dot");
  let currentIndex = 0;

  function updateCarousel() {
    testimonials.forEach((testimonial, index) => {
      testimonial.classList.toggle("active", index === currentIndex);
    });
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
      updateCarousel();
    });

    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      updateCarousel();
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentIndex = index;
      updateCarousel();
    });
  });

  // Auto-advance carousel every 5 seconds
  setInterval(() => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    updateCarousel();
  }, 5000);
});
