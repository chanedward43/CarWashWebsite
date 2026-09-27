// Satisfied Car Wash — Concept 4 "Krama & Concrete"
// Mobile nav toggle and smooth-scroll active-state.

document.addEventListener("DOMContentLoaded", () => {
  initNavToggle();
  initScrollSpy();
  initSmoothScrollClose();
});

function initNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const panel = document.getElementById("primary-nav");
  if (!toggle || !panel) return;

  toggle.addEventListener("click", () => {
    const isOpen = panel.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

function initSmoothScrollClose() {
  // Close the mobile nav panel after choosing a link (smooth-scroll is
  // handled natively via CSS `scroll-behavior: smooth` on <html>).
  const toggle = document.querySelector(".nav-toggle");
  const panel = document.getElementById("primary-nav");
  const links = document.querySelectorAll('[data-nav]');

  links.forEach((link) => {
    link.addEventListener("click", () => {
      if (panel && panel.classList.contains("is-open")) {
        panel.classList.remove("is-open");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      }
    });
  });
}

function initScrollSpy() {
  const links = Array.from(document.querySelectorAll('[data-nav]'));
  if (!links.length) return;

  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!("IntersectionObserver" in window) || !sections.length) return;

  const setActive = (id) => {
    links.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}
