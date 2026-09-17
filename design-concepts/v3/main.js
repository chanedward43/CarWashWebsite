/* Satisfied Car Wash — Design Concept v3 "Riverside Trust"
   Mobile nav toggle, smooth-scroll for anchor nav, and a client-side
   booking form handler (no backend exists — this simulates submission). */

(function () {
  "use strict";

  /* Mobile nav toggle */
  var navToggle = document.getElementById("navToggle");
  var primaryNav = document.getElementById("primaryNav");

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = primaryNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    primaryNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        primaryNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Smooth-scroll for anchor nav links */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      var targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") {
        return;
      }
      var target = document.querySelector(targetId);
      if (!target) {
        return;
      }
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  /* Booking form: client-side validation + simulated submit */
  var form = document.getElementById("bookingForm");
  var success = document.getElementById("formSuccess");
  var resetButton = document.getElementById("formReset");

  function showFieldError(field, message) {
    field.classList.add("field--error");
    var errorEl = field.querySelector(".field__error");
    if (errorEl) {
      errorEl.textContent = message;
    }
  }

  function clearFieldError(field) {
    field.classList.remove("field--error");
    var errorEl = field.querySelector(".field__error");
    if (errorEl) {
      errorEl.textContent = "";
    }
  }

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var isValid = true;
      var firstInvalidInput = null;

      form.querySelectorAll("[data-field]").forEach(function (field) {
        var input = field.querySelector("input, select, textarea");
        if (!input) {
          return;
        }

        clearFieldError(field);

        if (input.hasAttribute("required") && !input.value.trim()) {
          showFieldError(field, "This field is required.");
          isValid = false;
          firstInvalidInput = firstInvalidInput || input;
          return;
        }

        if (input.type === "tel" && input.value.trim()) {
          var digitCount = input.value.replace(/[^0-9]/g, "").length;
          if (digitCount < 8) {
            var message = field.dataset.errorMessage || "Enter a valid phone number.";
            showFieldError(field, message);
            isValid = false;
            firstInvalidInput = firstInvalidInput || input;
          }
        }
      });

      if (!isValid) {
        if (firstInvalidInput) {
          firstInvalidInput.focus();
        }
        return;
      }

      form.hidden = true;
      if (success) {
        success.hidden = false;
        success.focus();
      }
    });
  }

  if (resetButton && form && success) {
    resetButton.addEventListener("click", function () {
      form.reset();
      form.querySelectorAll("[data-field]").forEach(clearFieldError);
      form.hidden = false;
      success.hidden = true;
      var firstInput = form.querySelector("input, select, textarea");
      if (firstInput) {
        firstInput.focus();
      }
    });
  }
})();
