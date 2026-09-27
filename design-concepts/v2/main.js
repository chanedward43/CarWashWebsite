/* Satisfied Car Wash — Design concept v2 "Auto Atelier"
   Handles: mobile nav toggle and smooth-scroll for anchor nav links.
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
})();
