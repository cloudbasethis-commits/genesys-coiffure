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

    if (typeof renderShop === "function") renderShop();
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
     BOUTIQUE (catalogue + commande WhatsApp)
     ------------------------------------------------------ */
  var shopActiveCat = "all";

  function escapeHtml(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function fmtPrice(p) { return p.toFixed(2).replace(".", ",") + " €"; }
  function waIconSvg() {
    return '<svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.82 9.82 0 001.519 5.26l-.999 3.648 3.969-1.019zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>';
  }

  function applyShopFilter() {
    var grid = $("#shopGrid");
    if (!grid) return;
    $$(".product", grid).forEach(function (el) {
      var show = shopActiveCat === "all" || el.getAttribute("data-cat") === shopActiveCat;
      el.style.display = show ? "" : "none";
    });
  }

  function renderShop() {
    var data = window.GENESYS_SHOP;
    if (!data) return;
    var lang = currentLang;
    var num = CONFIG.whatsappNumber;
    var orderMsg = t("shop.waOrder");

    function catLabel(key) {
      var c = data.categories.filter(function (x) { return x.key === key; })[0] || {};
      return lang === "en" ? (c.en || c.fr || key) : (c.fr || key);
    }
    function card(p) {
      var desc = lang === "en" ? (p.descEn || p.desc) : p.desc;
      var price = fmtPrice(p.price);
      var wa = "https://wa.me/" + num + "?text=" + encodeURIComponent(orderMsg + " " + p.name + " — " + price + ".");
      return '<article class="product" data-cat="' + p.cat + '">'
        + '<div class="product__media"><img src="' + p.img + '" alt="' + escapeHtml(p.name) + '" loading="lazy" />'
        + '<span class="product__badge">' + t("shop.badge") + '</span></div>'
        + '<div class="product__body">'
        + '<span class="product__cat">' + escapeHtml(catLabel(p.cat)) + '</span>'
        + '<h3 class="product__name">' + escapeHtml(p.name) + '</h3>'
        + '<p class="product__desc">' + escapeHtml(desc) + '</p>'
        + '<div class="product__foot"><span class="product__price">' + price + '</span>'
        + '<a class="btn btn--wa product__order" href="' + wa + '" target="_blank" rel="noopener">'
        + waIconSvg() + '<span>' + t("shop.order") + '</span></a></div>'
        + '</div></article>';
    }

    var grid = $("#shopGrid");
    if (grid) {
      grid.innerHTML = data.products.map(card).join("");
      var filters = $("#shopFilters");
      if (filters) {
        filters.innerHTML = data.categories.map(function (c) {
          return '<button class="sfilter' + (c.key === shopActiveCat ? " is-active" : "")
            + '" data-cat="' + c.key + '">' + escapeHtml(catLabel(c.key)) + "</button>";
        }).join("");
        $$(".sfilter", filters).forEach(function (b) {
          b.addEventListener("click", function () {
            shopActiveCat = b.getAttribute("data-cat");
            $$(".sfilter", filters).forEach(function (x) { x.classList.toggle("is-active", x === b); });
            applyShopFilter();
          });
        });
      }
      applyShopFilter();
    }

    var feat = $("#shopFeatured");
    if (feat) {
      feat.innerHTML = data.products.filter(function (p) { return p.featured; }).slice(0, 3).map(card).join("");
    }
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
