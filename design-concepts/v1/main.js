// Satisfied Car Wash — Design Concept v1 "Modern Sabai"
// Handles: sticky-offset measurement, mobile nav toggle, smooth-scroll
// anchor nav, and the booking form's client-side validation + success state.

(function () {
  "use strict";

  /* ---- Measure the switcher bar + header so sticky offsets and hero
     height stay accurate at every breakpoint, instead of hard-coded
     guesses in CSS custom properties. ---- */
  function syncStickyOffsets() {
    var root = document.documentElement;
    var switcher = document.querySelector(".theme-switcher");
    var header = document.getElementById("site-header");

    if (switcher) {
      root.style.setProperty("--switcher-h", switcher.offsetHeight + "px");
    }
    if (header) {
      root.style.setProperty("--header-h", header.offsetHeight + "px");
    }
  }

  syncStickyOffsets();
  window.addEventListener("resize", syncStickyOffsets);
  window.addEventListener("load", syncStickyOffsets);

  /* ---- Mobile nav toggle ---- */
  var navToggle = document.getElementById("nav-toggle");
  var siteNav = document.getElementById("site-nav");

  function closeNav() {
    siteNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  function openNav() {
    siteNav.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = siteNav.classList.contains("is-open");
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });

    siteNav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        closeNav();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && siteNav.classList.contains("is-open")) {
        closeNav();
        navToggle.focus();
      }
    });
  }

  /* ---- Smooth-scroll for anchor nav links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      var targetId = link.getAttribute("href").slice(1);
      var target = document.getElementById(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });

      if (history.pushState) {
        history.pushState(null, "", "#" + targetId);
      }
    });
  });

  /* ---- Booking form validation + inline success state ---- */
  var form = document.getElementById("booking-form");
  if (!form) return;

  var successMessage = document.getElementById("form-success");

  var validators = {
    name: function (value) {
      return value.trim().length > 0 ? "" : "Please enter your name.";
    },
    phone: function (value) {
      return value.trim().length > 0 ? "" : "Please enter a phone number we can reach you on.";
    },
    vehicle: function (value) {
      return value ? "" : "Please select your vehicle type.";
    },
  };

  function showError(fieldName, message) {
    var errorEl = document.getElementById("error-" + fieldName);
    if (errorEl) {
      errorEl.textContent = message;
    }
  }

  function clearErrors() {
    form.querySelectorAll(".field-error").forEach(function (el) {
      el.textContent = "";
    });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    clearErrors();
    successMessage.hidden = true;

    var isValid = true;
    var firstInvalid = null;

    Object.keys(validators).forEach(function (fieldName) {
      var field = form.elements[fieldName];
      var message = validators[fieldName](field.value);
      if (message) {
        isValid = false;
        showError(fieldName, message);
        if (!firstInvalid) firstInvalid = field;
      }
    });

    if (!isValid) {
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // No backend exists yet — show an inline confirmation and reset.
    form.reset();
    successMessage.hidden = false;
    successMessage.focus && successMessage.focus();
  });
})();
