// Satisfied Car Wash — Concept 4 "Krama & Concrete"
// Mobile nav toggle, smooth-scroll active-state, and booking form validation.

document.addEventListener("DOMContentLoaded", () => {
  initNavToggle();
  initScrollSpy();
  initSmoothScrollClose();
  initBookingForm();
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

function initBookingForm() {
  const form = document.getElementById("booking-form");
  if (!form) return;

  const successMessage = form.querySelector("[data-success]");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let isValid = true;

    form.querySelectorAll("input[required]").forEach((input) => {
      const field = input.closest(".form-field");
      const error = form.querySelector(`[data-error-for="${input.id}"]`);
      const filled = input.value.trim().length > 0;

      if (!filled) {
        isValid = false;
        if (field) field.classList.add("has-error");
        if (error) error.hidden = false;
      } else {
        if (field) field.classList.remove("has-error");
        if (error) error.hidden = true;
      }
    });

    if (!isValid) {
      const firstError = form.querySelector(".has-error input");
      if (firstError) firstError.focus();
      return;
    }

    form.querySelectorAll(".form-field").forEach((field) => field.classList.remove("has-error"));
    form.querySelectorAll(".form-error").forEach((error) => (error.hidden = true));

    form.reset();
    if (successMessage) {
      successMessage.hidden = false;
      successMessage.focus?.();
    }
  });

  // Clear an individual field's error as soon as the visitor fixes it.
  form.querySelectorAll("input[required]").forEach((input) => {
    input.addEventListener("input", () => {
      if (input.value.trim().length > 0) {
        const field = input.closest(".form-field");
        const error = form.querySelector(`[data-error-for="${input.id}"]`);
        if (field) field.classList.remove("has-error");
        if (error) error.hidden = true;
      }
    });
  });
}
