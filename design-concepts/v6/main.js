/* Car Wash & Car Care Center — Design Concept v6 "Riverside Bold"
   Combines Riverside Trust's structure/palette with Auto Atelier's
   display type and header treatment. Mobile nav toggle, smooth-scroll
   for anchor nav, and an English/Khmer language toggle for the whole
   page. */

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

  /* ---- Language toggle (English / Khmer) ----
     Elements carry the ALTERNATE-language text as a data attribute;
     their original textContent/alt (as authored in the HTML) is cached
     once at load, so toggling back to that language is a plain restore
     rather than a second translation lookup. Three kinds of element:
       [data-km]         normal text, authored in English, data-km holds Khmer
       [data-invert-en]  the small Khmer accent badges in the services list —
                          authored in Khmer, data-invert-en holds English
       [data-km-alt]     <img alt="..."> text, authored in English, data-km-alt holds Khmer
  */
  var STORAGE_KEY = "cwcc-v6-lang";
  var ENGLISH_TITLE = document.title;
  var KHMER_TITLE = "ហាងលាងរថយន្ត Car Wash & Car Care Center — គំនិតរចនាទី៦";

  var textEls = Array.prototype.slice.call(document.querySelectorAll("[data-km]"));
  var invertEls = Array.prototype.slice.call(document.querySelectorAll("[data-invert-en]"));
  var altEls = Array.prototype.slice.call(document.querySelectorAll("[data-km-alt]"));

  var originalText = new Map();
  textEls.forEach(function (el) {
    originalText.set(el, el.textContent);
  });
  invertEls.forEach(function (el) {
    originalText.set(el, el.textContent);
  });

  var originalAlt = new Map();
  altEls.forEach(function (el) {
    originalAlt.set(el, el.getAttribute("alt"));
  });

  var langEnBtn = document.getElementById("langEn");
  var langKmBtn = document.getElementById("langKm");

  function applyLanguage(lang) {
    var isKm = lang === "km";

    textEls.forEach(function (el) {
      el.textContent = isKm ? el.dataset.km : originalText.get(el);
      el.lang = isKm ? "km" : "en";
    });

    invertEls.forEach(function (el) {
      el.textContent = isKm ? el.dataset.invertEn : originalText.get(el);
      el.lang = isKm ? "en" : "km";
    });

    altEls.forEach(function (el) {
      el.setAttribute("alt", isKm ? el.dataset.kmAlt : originalAlt.get(el));
    });

    document.documentElement.lang = lang;
    document.title = isKm ? KHMER_TITLE : ENGLISH_TITLE;

    if (langEnBtn && langKmBtn) {
      langEnBtn.classList.toggle("is-active", !isKm);
      langEnBtn.setAttribute("aria-pressed", String(!isKm));
      langKmBtn.classList.toggle("is-active", isKm);
      langKmBtn.setAttribute("aria-pressed", String(isKm));
    }

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (err) {
      /* Storage may be unavailable (private browsing, blocked cookies);
         the toggle still works for the current page view either way. */
    }
  }

  if (langEnBtn && langKmBtn) {
    langEnBtn.addEventListener("click", function () {
      applyLanguage("en");
    });
    langKmBtn.addEventListener("click", function () {
      applyLanguage("km");
    });

    var savedLang = null;
    try {
      savedLang = localStorage.getItem(STORAGE_KEY);
    } catch (err) {
      /* ignore */
    }
    if (savedLang === "km") {
      applyLanguage("km");
    }
  }
})();
