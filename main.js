/* =============================================================
   LMC SISTEMAS — main.js (IIFE, sin módulos, sin build)
   ============================================================= */
(function () {
  "use strict";

  /* ------------------------------------------------------------
     Helpers
     ------------------------------------------------------------ */
  var $  = function (sel, scope) { return (scope || document).querySelector(sel); };
  var $$ = function (sel, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(sel)); };
  var reduced    = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fineHover  = matchMedia("(hover: hover) and (pointer: fine)").matches;
  var touchOnly  = matchMedia("(hover: none)").matches;

  function safe(fn, name) {
    try { fn(); } catch (e) { console.warn("[" + name + "] failed:", e); }
  }

  /* ------------------------------------------------------------
     1. Splash hide (CSS 4.5s safety, JS earlier)
     ------------------------------------------------------------ */
  function initSplash() {
    var splash = $("[data-splash]");
    if (!splash) return;
    var hidden = false;
    function hide() {
      if (hidden) return;
      hidden = true;
      splash.classList.add("is-out");
      setTimeout(function () {
        if (splash.parentNode) splash.parentNode.removeChild(splash);
      }, 900);
    }
    if (document.readyState === "complete") {
      setTimeout(hide, 2400);
    } else {
      window.addEventListener("load", function () { setTimeout(hide, 2100); });
    }
    setTimeout(hide, 4000);
  }

  /* ------------------------------------------------------------
     2. Nav: scroll state + smooth anchors + burger
     ------------------------------------------------------------ */
  function initNav() {
    var nav     = $("[data-nav]");
    var burger  = $("[data-burger]");
    var drawer  = $("[data-drawer]");

    if (nav) {
      var onScroll = function () {
        if (window.scrollY > 24) nav.classList.add("is-scrolled");
        else nav.classList.remove("is-scrolled");
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    if (burger && drawer) {
      var toggle = function () {
        var open = drawer.classList.toggle("is-open");
        burger.classList.toggle("is-open", open);
        burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
        document.documentElement.style.overflow = open ? "hidden" : "";
      };
      burger.addEventListener("click", toggle);
      drawer.addEventListener("click", function (e) {
        if (e.target.closest("a")) {
          drawer.classList.remove("is-open");
          burger.classList.remove("is-open");
          document.documentElement.style.overflow = "";
        }
      });
    }

    // Smooth anchors with nav offset (native, no Lenis)
    document.addEventListener("click", function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute("href");
      if (!id || id === "#") return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      var top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({
        top: top,
        behavior: reduced ? "auto" : "smooth"
      });
    });
  }

  /* ------------------------------------------------------------
     3. Reveal on scroll (IO threshold ≤ 0.05 + 6s safety)
     ------------------------------------------------------------ */
  function initReveals() {
    var targets = $$("[data-reveal], .reveal:not([data-reveal])");
    if (!targets.length) return;
    if (typeof IntersectionObserver === "undefined") {
      targets.forEach(function (t) { t.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.04, rootMargin: "0px 0px -2% 0px" });
    targets.forEach(function (t) { io.observe(t); });

    // 6s safety net
    setTimeout(function () {
      $$("[data-reveal]:not(.is-visible), .reveal:not(.is-visible)").forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add("is-visible");
        }
      });
    }, 6000);
  }

  /* ------------------------------------------------------------
     4. Trace SVG icons on enter
     ------------------------------------------------------------ */
  function initSvgTrace() {
    var icons = $$(".svg-trace");
    if (!icons.length) return;
    if (typeof IntersectionObserver === "undefined") {
      icons.forEach(function (i) { i.classList.add("is-traced"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-traced");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    icons.forEach(function (i) { io.observe(i); });

    setTimeout(function () {
      $$(".svg-trace:not(.is-traced)").forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add("is-traced");
        }
      });
    }, 6000);
  }

  /* ------------------------------------------------------------
     5. Counters (count-up on enter)
     ------------------------------------------------------------ */
  function initCounters() {
    var nodes = $$("[data-count]");
    if (!nodes.length) return;

    function animate(node) {
      var target = parseInt(node.getAttribute("data-count"), 10) || 0;
      if (reduced) { node.textContent = target; return; }
      var start = performance.now();
      var duration = 1800;
      function tick(t) {
        var p = Math.min(1, (t - start) / duration);
        var eased = 1 - Math.pow(1 - p, 3);
        node.textContent = Math.round(target * eased);
        if (p < 1) requestAnimationFrame(tick);
        else node.textContent = target;
      }
      requestAnimationFrame(tick);
    }

    if (typeof IntersectionObserver === "undefined") {
      nodes.forEach(animate);
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    nodes.forEach(function (n) { io.observe(n); });
  }

  /* ------------------------------------------------------------
     6. Projects carousel (scroll-snap + prev/next + progress)
     ------------------------------------------------------------ */
  function initProjects() {
    var track = $("[data-projects]");
    if (!track) return;
    var prev    = $("[data-prev]");
    var next    = $("[data-next]");
    var progress = $("[data-progress]");

    function step() {
      var card = track.querySelector(".project-card");
      if (!card) return 480;
      var gap = parseFloat(getComputedStyle(track).gap) || 24;
      return card.getBoundingClientRect().width + gap;
    }
    function updateProgress() {
      if (!progress) return;
      var max = track.scrollWidth - track.clientWidth;
      var ratio = max > 0 ? track.scrollLeft / max : 0;
      var fill = 12 + ratio * 88;
      progress.style.width = fill + "%";
    }
    if (prev) prev.addEventListener("click", function () {
      track.scrollBy({ left: -step(), behavior: reduced ? "auto" : "smooth" });
    });
    if (next) next.addEventListener("click", function () {
      track.scrollBy({ left:  step(), behavior: reduced ? "auto" : "smooth" });
    });
    track.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();

    // Keyboard nav (desktop)
    track.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); track.scrollBy({ left: step(), behavior: "smooth" }); }
      if (e.key === "ArrowLeft")  { e.preventDefault(); track.scrollBy({ left: -step(), behavior: "smooth" }); }
    });
    track.setAttribute("tabindex", "0");
  }

  /* ------------------------------------------------------------
     7. Contact form (validation + simulated submit + mailto)
     ------------------------------------------------------------ */
  function initForm() {
    var form = $("[data-form]");
    if (!form) return;
    var success = $("[data-form-success]");
    var submitBtn = form.querySelector(".form-submit");

    function validate() {
      var ok = true;
      $$("input, textarea, select", form).forEach(function (field) {
        if (field.hasAttribute("required") && !field.value.trim()) {
          field.style.borderColor = "#FF4D6D";
          ok = false;
        } else {
          field.style.borderColor = "";
        }
      });
      var email = form.querySelector('input[type="email"]');
      if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.style.borderColor = "#FF4D6D";
        ok = false;
      }
      return ok;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validate()) return;

      form.classList.add("is-sending");
      if (submitBtn) submitBtn.querySelector("span").textContent = "Enviando…";

      // Simulate request (would be replaced by real endpoint or kept as mailto fallback)
      setTimeout(function () {
        form.classList.remove("is-sending");
        if (success) success.classList.add("is-visible");

        // Mailto fallback: open user's mail client with prefilled body so message
        // is delivered even if backend not configured.
        try {
          var fd = new FormData(form);
          var body = [
            "Empresa: " + (fd.get("company") || ""),
            "Contacto: " + (fd.get("contact") || ""),
            "Teléfono: " + (fd.get("phone") || ""),
            "Email: " + (fd.get("email") || ""),
            "Tipo de proyecto: " + (fd.get("projectType") || ""),
            "Presupuesto: " + (fd.get("budget") || ""),
            "",
            "Descripción:",
            (fd.get("description") || "")
          ].join("\n");
          var subject = "Solicitud de consultoría · " + (fd.get("company") || "Nuevo contacto");
          var href = "mailto:comercial@lmcsistemas.com" +
                     "?subject=" + encodeURIComponent(subject) +
                     "&body="    + encodeURIComponent(body);
          window.location.href = href;
        } catch (err) { /* swallow */ }
      }, 900);
    });

    // Live-clear red border on input
    $$("input, textarea, select", form).forEach(function (f) {
      f.addEventListener("input", function () { f.style.borderColor = ""; });
      f.addEventListener("change", function () { f.style.borderColor = ""; });
    });
  }

  /* ------------------------------------------------------------
     8. Custom cursor + contextual label
     ------------------------------------------------------------ */
  function initCursor() {
    if (!fineHover) return;
    var cursor = $(".cursor");
    var dot    = $(".cursor-dot");
    var ring   = $(".cursor-ring");
    var label  = $(".cursor-label");
    if (!cursor || !dot || !ring || !label) return;

    var mx = 0, my = 0, rx = -100, ry = -100;
    var firstMove = false;

    window.addEventListener("mousemove", function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = "translate3d(" + mx + "px, " + my + "px, 0) translate(-50%, -50%)";
      if (!firstMove) {
        firstMove = true;
        rx = mx; ry = my;
        ring.style.transform = "translate3d(" + rx + "px, " + ry + "px, 0) translate(-50%, -50%)";
        cursor.classList.add("is-ready");
      }
    });

    function loop() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = "translate3d(" + rx + "px, " + ry + "px, 0) translate(-50%, -50%)";
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

    // Hover label
    var hoverables = "[data-cursor], a, button, label, input, textarea, select";
    document.addEventListener("mouseover", function (e) {
      var t = e.target.closest(hoverables);
      if (!t) return;
      var msg = t.getAttribute("data-cursor");
      if (!msg) {
        if (t.tagName === "A")      msg = "ir";
        else if (t.tagName === "BUTTON") msg = "pulsar";
        else if (t.matches("input, textarea, select, label")) msg = "escribir";
      }
      label.textContent = msg || "";
      cursor.classList.add("is-hover");
    });
    document.addEventListener("mouseout", function (e) {
      var t = e.target.closest(hoverables);
      if (!t) return;
      if (e.relatedTarget && t.contains(e.relatedTarget)) return;
      cursor.classList.remove("is-hover");
    });

    // Hide near window edges (avoid stuck state)
    document.addEventListener("mouseleave", function () { cursor.classList.remove("is-ready"); });
    document.addEventListener("mouseenter", function () { cursor.classList.add("is-ready"); });
  }

  /* ------------------------------------------------------------
     9. Nav links — highlight current section
     ------------------------------------------------------------ */
  function initNavHighlight() {
    var sections = $$("section[id]");
    var links    = $$(".nav-links a");
    if (!sections.length || !links.length) return;
    if (typeof IntersectionObserver === "undefined") return;

    var map = {};
    links.forEach(function (l) {
      var id = l.getAttribute("href");
      if (id) map[id.replace("#", "")] = l;
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          links.forEach(function (l) { l.classList.remove("is-active"); });
          if (map[id]) map[id].classList.add("is-active");
        }
      });
    }, { rootMargin: "-30% 0px -60% 0px", threshold: 0 });
    sections.forEach(function (s) { io.observe(s); });
  }

  /* ------------------------------------------------------------
     10. GSAP enhancements (optional, only if loaded)
     ------------------------------------------------------------ */
  function initGsapAnimations() {
    if (!window.gsap || !window.ScrollTrigger) return;
    try { gsap.registerPlugin(ScrollTrigger); } catch (_) {}

    // Section numbers — subtle parallax
    $$(".section-num").forEach(function (n) {
      gsap.to(n, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: n.closest(".section"),
          start: "top bottom",
          end:   "bottom top",
          scrub: 0.6
        }
      });
    });

    // Hero title floats up slightly on scroll
    var heroTitle = $(".hero-title");
    if (heroTitle && !reduced) {
      gsap.to(heroTitle, {
        yPercent: -8,
        opacity: 0.6,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end:   "bottom top",
          scrub: 0.4
        }
      });
    }
  }

  /* ------------------------------------------------------------
     Boot
     ------------------------------------------------------------ */
  function boot() {
    safe(initSplash,        "initSplash");
    safe(initNav,           "initNav");
    safe(initReveals,       "initReveals");
    safe(initSvgTrace,      "initSvgTrace");
    safe(initCounters,      "initCounters");
    safe(initProjects,      "initProjects");
    safe(initForm,          "initForm");
    safe(initCursor,        "initCursor");
    safe(initNavHighlight,  "initNavHighlight");
    safe(initGsapAnimations,"initGsapAnimations");
    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
