// Satisfied Car Wash — Design Concept v1 "Modern Sabai"
// Handles: sticky-offset measurement, mobile nav toggle, and smooth-scroll
// anchor nav.

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
})();
