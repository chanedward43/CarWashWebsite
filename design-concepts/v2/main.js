/* Satisfied Car Wash — Design concept v2 "Auto Atelier"
   Handles: mobile nav toggle, smooth-scroll for anchor nav links,
   and the booking form's client-side validation + success state.
   The filmstrip gallery uses native CSS scroll-snap, no JS needed. */

(function () {
  "use strict";

  /* Mobile nav toggle ------------------------------------------------ */

  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("mainNav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    mainNav.addEventListener("click", function (event) {
      if (event.target.tagName === "A") {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* Smooth scroll for anchor nav links, offset for the sticky header - */

  var header = document.querySelector(".site-header");

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
      var headerHeight = header ? header.offsetHeight : 0;
      var top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 12;
      window.scrollTo({ top: top, behavior: "smooth" });
    });
  });

  /* Booking form ------------------------------------------------------ */

  var form = document.getElementById("bookingForm");
  var successMessage = document.getElementById("formSuccess");

  if (form) {
    var nameField = form.querySelector('[data-field="name"]');
    var phoneField = form.querySelector('[data-field="phone"]');
    var servicesField = form.querySelector('[data-field="services"]');

    function setError(fieldWrap, hasError) {
      if (!fieldWrap) {
        return;
      }
      fieldWrap.classList.toggle("has-error", hasError);
    }

    function validate() {
      var valid = true;

      var nameInput = document.getElementById("name");
      var nameOk = nameInput.value.trim().length > 0;
      setError(nameField, !nameOk);
      if (!nameOk) {
        valid = false;
      }

      var phoneInput = document.getElementById("phone");
      var phoneOk = phoneInput.value.trim().length > 0;
      setError(phoneField, !phoneOk);
      if (!phoneOk) {
        valid = false;
      }

      var serviceChecked = form.querySelectorAll('input[name="service"]:checked').length > 0;
      setError(servicesField, !serviceChecked);
      if (!serviceChecked) {
        valid = false;
      }

      return valid;
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!validate()) {
        var firstError = form.querySelector(".has-error input, .has-error select");
        if (firstError) {
          firstError.focus();
        }
        return;
      }

      var submitBtn = form.querySelector('button[type="submit"]');
      var originalLabel = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";

      // No backend exists yet — simulate a brief send, then show the
      // inline success state and reset the form.
      window.setTimeout(function () {
        form.hidden = true;
        if (successMessage) {
          successMessage.hidden = false;
        }
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
        form.reset();
      }, 500);
    });

    // Clear a field's error state as soon as the visitor fixes it.
    form.addEventListener("input", function (event) {
      var target = event.target;
      if (target.name === "name" && target.value.trim().length > 0) {
        setError(nameField, false);
      }
      if (target.name === "phone" && target.value.trim().length > 0) {
        setError(phoneField, false);
      }
      if (target.name === "service") {
        var anyChecked = form.querySelectorAll('input[name="service"]:checked').length > 0;
        setError(servicesField, !anyChecked);
      }
    });
  }
})();
