(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------- Mobile nav toggle ---------- */

  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("primaryNav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.textContent = isOpen ? "Close" : "Menu";
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "Menu";
      });
    });
  }

  /* ---------- Smooth scroll for in-page anchor links ---------- */

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      var targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;
      var target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    });
  });

  /* ---------- Booking form ---------- */

  var form = document.getElementById("bookingForm");
  var successMessage = document.getElementById("formSuccess");

  if (form) {
    var fields = [
      {
        input: document.getElementById("name"),
        error: document.getElementById("nameError"),
        validate: function (value) {
          return value.trim().length > 0;
        },
      },
      {
        input: document.getElementById("phone"),
        error: document.getElementById("phoneError"),
        validate: function (value) {
          return value.trim().length > 0;
        },
      },
    ];

    function setFieldError(field, hasError) {
      var wrapper = field.input.closest(".form__field");
      if (hasError) {
        wrapper.classList.add("has-error");
        field.error.hidden = false;
        field.input.setAttribute("aria-invalid", "true");
      } else {
        wrapper.classList.remove("has-error");
        field.error.hidden = true;
        field.input.removeAttribute("aria-invalid");
      }
    }

    fields.forEach(function (field) {
      field.input.addEventListener("blur", function () {
        setFieldError(field, !field.validate(field.input.value));
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var isValid = true;
      fields.forEach(function (field) {
        var fieldValid = field.validate(field.input.value);
        setFieldError(field, !fieldValid);
        if (!fieldValid) isValid = false;
      });

      if (!isValid) {
        var firstInvalid = form.querySelector(".has-error input");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      successMessage.hidden = false;
      form.reset();
      fields.forEach(function (field) {
        setFieldError(field, false);
      });
      successMessage.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "nearest",
      });
    });
  }
})();
