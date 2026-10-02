/* =========================================================
   GENESYS COIFFURE — interactions
   ========================================================= */
(function () {
  "use strict";

  /* ------------------------------------------------------
     CONFIG — édite ces valeurs / edit these values
     ------------------------------------------------------ */
  var CONFIG = {
    bookingUrl: "https://digablopos.fr/book/genesys",             // réservation en ligne / online booking
    whatsappNumber: "33623228831",           // format international sans "+" / international, no "+"
    instagramUrl: "https://www.instagram.com/genesys_coiffure",   // (laisser vide = masqué)
    tiktokUrl: "https://www.tiktok.com/@genesys.coiffure"   // (laisser vide = masqué)
  };

  var I18N = window.GENESYS_I18N || {};
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var html = document.documentElement;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ------------------------------------------------------
     LANGUAGE
     ------------------------------------------------------ */
  var currentLang = localStorage.getItem("genesys-lang") ||
    ((navigator.language || "fr").toLowerCase().indexOf("en") === 0 ? "en" : "fr");

  function t(key) {
    var dict = I18N[currentLang] || I18N.fr || {};
    return dict[key] != null ? dict[key] : key;
  }

  function applyLang(lang) {
    if (!I18N[lang]) lang = "fr";
    currentLang = lang;
    localStorage.setItem("genesys-lang", lang);
    html.setAttribute("lang", lang);

    $$("[data-i18n]").forEach(function (el) {
      var v = t(el.getAttribute("data-i18n"));
      if (v != null) el.textContent = v;
    });
    $$("[data-i18n-placeholder]").forEach(function (el) {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
    });

    $$(".lang__btn").forEach(function (b) {
      var on = b.getAttribute("data-lang") === lang;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });

    // WhatsApp quick-message buttons (header / mobile menu)
    var waText = encodeURIComponent(t("wa.greeting"));
    $$("[data-wa]").forEach(function (el) {
      el.setAttribute("href", "https://wa.me/" + CONFIG.whatsappNumber + "?text=" + waText);
    });
  }

  $$(".lang__btn").forEach(function (b) {
    b.addEventListener("click", function () { applyLang(b.getAttribute("data-lang")); });
  });
  applyLang(currentLang);

  /* ------------------------------------------------------
     SOCIAL LINKS
     ------------------------------------------------------ */
  function wireSocial(name, url) {
    var el = $('[data-social="' + name + '"]');
    if (!el) return;
    if (url) { el.setAttribute("href", url); }
    else { el.parentNode.removeChild(el); }   // masque le bouton si non renseigné
  }
  $('[data-social="whatsapp"]') && $('[data-social="whatsapp"]').setAttribute("href", "https://wa.me/" + CONFIG.whatsappNumber);
  wireSocial("instagram", CONFIG.instagramUrl);
  wireSocial("tiktok", CONFIG.tiktokUrl);

  // Booking buttons -> online booking (new tab)
  $$("[data-book]").forEach(function (el) {
    if (CONFIG.bookingUrl) {
      el.setAttribute("href", CONFIG.bookingUrl);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    }
  });
  $$('[data-social-inline="instagram"]').forEach(function (el) {
    if (CONFIG.instagramUrl) el.setAttribute("href", CONFIG.instagramUrl);
  });

  /* ------------------------------------------------------
     YEAR
     ------------------------------------------------------ */
  var yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ------------------------------------------------------
     NAV scroll state
     ------------------------------------------------------ */
  var nav = $("#nav");
  function onScroll() { nav.classList.toggle("is-scrolled", window.scrollY > 10); }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ------------------------------------------------------
     BURGER / mobile menu
     ------------------------------------------------------ */
  var burger = $("#burger");
  var mobileMenu = $("#mobileMenu");
  function closeMenu() {
    burger.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    mobileMenu.classList.remove("is-open");
    mobileMenu.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lenis) lenis.start();
  }
  burger && burger.addEventListener("click", function () {
    var open = burger.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    mobileMenu.classList.toggle("is-open", open);
    mobileMenu.setAttribute("aria-hidden", open ? "false" : "true");
    document.body.style.overflow = open ? "hidden" : "";
    if (lenis) { open ? lenis.stop() : lenis.start(); }
  });
  $$("#mobileMenu a").forEach(function (a) { a.addEventListener("click", closeMenu); });

  /* ------------------------------------------------------
     SMOOTH SCROLL (Lenis) + GSAP sync
     ------------------------------------------------------ */
  var lenis = null;
  var hasGSAP = window.gsap && window.ScrollTrigger;
  if (hasGSAP) gsap.registerPlugin(ScrollTrigger);

  if (!reduce && window.Lenis) {
    lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    if (hasGSAP) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
    } else {
      requestAnimationFrame(function raf(t) { lenis.raf(t); requestAnimationFrame(raf); });
    }
  }

  // Anchor links -> smooth scroll
  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: -70 });
      else target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    });
  });

  /* ------------------------------------------------------
     ANIMATIONS (GSAP)
     ------------------------------------------------------ */
  html.classList.add("is-ready");

  if (hasGSAP && !reduce) {
    // Hero entrance is handled purely in CSS (see .hero__title / .hero__* animations)
    // so it never depends on the JS animation loop.

    // Reveal on scroll (CSS handles the transition; we just stagger the class)
    ScrollTrigger.batch("[data-reveal]", {
      start: "top 88%",
      onEnter: function (els) {
        els.forEach(function (el, i) {
          setTimeout(function () { el.classList.add("is-in"); }, i * 80);
        });
      }
    });

    // Parallax images
    $$("[data-parallax]").forEach(function (img) {
      gsap.to(img, {
        yPercent: 12, ease: "none",
        scrollTrigger: { trigger: img.closest("section") || img, start: "top bottom", end: "bottom top", scrub: true }
      });
    });

    // Marquee loop
    var track = $(".marquee__track");
    if (track) {
      gsap.to(track, { xPercent: -50, ease: "none", duration: 26, repeat: -1 });
    }

    // Stat counters
    $$(".stat__num").forEach(function (el) {
      var end = parseInt(el.getAttribute("data-count"), 10) || 0;
      ScrollTrigger.create({
        trigger: el, start: "top 90%", once: true,
        onEnter: function () {
          var obj = { v: 0 };
          gsap.to(obj, {
            v: end, duration: 1.6, ease: "power2.out",
            onUpdate: function () { el.textContent = Math.round(obj.v); }
          });
        }
      });
    });
  } else {
    // Reduced motion / no GSAP: reveal everything (hero entrance stays CSS-driven)
    $$("[data-reveal]").forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ------------------------------------------------------
     HERO CAROUSEL
     ------------------------------------------------------ */
  var heroSlides = $$(".hero__slide");
  if (heroSlides.length > 1 && !reduce) {
    var hIdx = 0;
    setInterval(function () {
      heroSlides[hIdx].classList.remove("is-active");
      hIdx = (hIdx + 1) % heroSlides.length;
      heroSlides[hIdx].classList.add("is-active");
    }, 5000);
  }

  /* ------------------------------------------------------
     PRICING TABS
     ------------------------------------------------------ */
  var tabs = $$(".ptab");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var name = tab.getAttribute("data-tab");
      tabs.forEach(function (x) { x.classList.remove("is-active"); x.setAttribute("aria-selected", "false"); });
      tab.classList.add("is-active"); tab.setAttribute("aria-selected", "true");
      $$(".ppanel").forEach(function (p) {
        p.classList.toggle("is-active", p.getAttribute("data-panel") === name);
      });
    });
  });

  /* ------------------------------------------------------
     GALLERY LIGHTBOX
     ------------------------------------------------------ */
  var galBtns = $$("#galleryGrid .gal");
  var lb = $("#lightbox");
  var lbImg = $("#lbImg");
  var lbIndex = 0;
  var sources = galBtns.map(function (b) { var i = b.querySelector("img"); return { src: i.getAttribute("src"), alt: i.getAttribute("alt") }; });

  function openLb(i) {
    lbIndex = (i + sources.length) % sources.length;
    lbImg.setAttribute("src", sources[lbIndex].src);
    lbImg.setAttribute("alt", sources[lbIndex].alt);
    lb.classList.add("is-open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (lenis) lenis.stop();
  }
  function closeLb() {
    lb.classList.remove("is-open");
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lenis) lenis.start();
  }
  galBtns.forEach(function (b, i) { b.addEventListener("click", function () { openLb(i); }); });
  $("#lbClose") && $("#lbClose").addEventListener("click", closeLb);
  $("#lbPrev") && $("#lbPrev").addEventListener("click", function () { openLb(lbIndex - 1); });
  $("#lbNext") && $("#lbNext").addEventListener("click", function () { openLb(lbIndex + 1); });
  lb && lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", function (e) {
    if (!lb || !lb.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLb();
    else if (e.key === "ArrowLeft") openLb(lbIndex - 1);
    else if (e.key === "ArrowRight") openLb(lbIndex + 1);
  });

  /* ------------------------------------------------------
     BOOKING FORM -> WhatsApp
     ------------------------------------------------------ */
  var form = $("#bookingForm");
  form && form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = ($("#bk-name").value || "").trim();
    var service = $("#bk-service").value || "";
    var date = $("#bk-date").value || "";
    var msg = ($("#bk-msg").value || "").trim();

    if (!name) { $("#bk-name").focus(); return; }

    var lines = [t("wa.greeting"), ""];
    lines.push(t("wa.name") + " : " + name);
    lines.push(t("wa.service") + " : " + service);
    if (date) lines.push(t("wa.date") + " : " + date);
    if (msg) lines.push(t("wa.msg") + " : " + msg);

    var url = "https://wa.me/" + CONFIG.whatsappNumber + "?text=" + encodeURIComponent(lines.join("\n"));
    window.open(url, "_blank", "noopener");
  });

  // Book buttons already point to #contact (handled by anchor smooth scroll)
})();
