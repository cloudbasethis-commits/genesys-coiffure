/* =========================================================
   GENESYS COIFFURE — lightweight script for sub-pages
   (galerie, tarifs…). Language toggle + year + CTA wiring.
   ========================================================= */
(function () {
  "use strict";
  var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };
  var I18N = window.GENESYS_I18N || {};
  var html = document.documentElement;

  var lang = localStorage.getItem("genesys-lang") ||
    ((navigator.language || "fr").toLowerCase().indexOf("en") === 0 ? "en" : "fr");

  function t(k) { var d = I18N[lang] || I18N.fr || {}; return d[k] != null ? d[k] : k; }
  function applyLang(l) {
    if (!I18N[l]) l = "fr";
    lang = l; localStorage.setItem("genesys-lang", l); html.setAttribute("lang", l);
    $$("[data-i18n]").forEach(function (el) { el.textContent = t(el.getAttribute("data-i18n")); });
    $$("[data-i18n-placeholder]").forEach(function (el) { el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder"))); });
    $$(".lang__btn").forEach(function (b) {
      var on = b.getAttribute("data-lang") === l;
      b.classList.toggle("is-active", on); b.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }
  $$(".lang__btn").forEach(function (b) {
    b.addEventListener("click", function () { applyLang(b.getAttribute("data-lang")); });
  });
  applyLang(lang);

  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // If arriving on an anchor, briefly highlight the target category
  function highlight() {
    var id = location.hash.replace("#", "");
    if (!id) return;
    var el = document.getElementById(id);
    if (el && el.classList.contains("tarif-cat")) {
      $$(".tarif-cat").forEach(function (c) { c.classList.remove("is-target"); });
      el.classList.add("is-target");
    }
  }
  window.addEventListener("hashchange", highlight);
  highlight();
})();
