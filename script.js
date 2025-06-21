// Hamburger Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
let scrollPosition = 0; // Store scroll position when menu opens

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    const isOpening = !navLinks.classList.contains("active");
    if (isOpening) {
      // Store current scroll position and lock scrolling
      scrollPosition = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.width = "100%";
    } else {
      // Restore scroll position and unlock scrolling
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollPosition);
    }
    navLinks.classList.toggle("active");
    hamburger.setAttribute(
      "aria-expanded",
      navLinks.classList.contains("active")
    );
  });
}

// Smooth Scrolling for Navigation Links
document
  .querySelectorAll('a[href^="#"]:not(.enlarge-link)')
  .forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const href = this.getAttribute("href");
      const target = document.querySelector(href);
      if (target) {
        const navbar = document.querySelector(".navbar");
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const extraPadding = 10; // Additional padding for visual spacing
        const targetPosition =
          target.getBoundingClientRect().top +
          window.scrollY -
          (navbarHeight + extraPadding);

        // Close mobile menu before scrolling
        if (navLinks && hamburger && navLinks.classList.contains("active")) {
          navLinks.classList.remove("active");
          hamburger.setAttribute("aria-expanded", "false");
          // Unlock scrolling
          if (document.body.style.position === "fixed") {
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.width = "";
            window.scrollTo(0, scrollPosition);
          }
        }

        // Smooth scroll with offset
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });

        // Focus target section for accessibility
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }
    });
  });

// Image Modal for Enlarged Images
const modal = document.createElement("div");
modal.classList.add("modal");
modal.innerHTML = `
  <img src="" alt="">
`;
document.body.appendChild(modal);

const modalImg = modal.querySelector("img");
const enlargeLinks = document.querySelectorAll(".enlarge-link");

if (enlargeLinks.length > 0) {
  enlargeLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const img = link.querySelector("img");
      if (img) {
        modalImg.src = link.getAttribute("data-src");
        modalImg.alt = img.alt;
        modal.classList.add("show");
        document.body.style.overflow = "hidden";
        modalImg.focus();
      }
    });
  });

  // Close modal on click outside image
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
      document.body.style.overflow = "";
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) {
      modal.classList.remove("show");
      document.body.style.overflow = "";
    }
  });
}