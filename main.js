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
  var reduced   = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fineHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

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
    var nav    = $("[data-nav]");
    var burger = $("[data-burger]");
    var drawer = $("[data-drawer]");

    if (nav) {
      var onScroll = function () {
        nav.classList.toggle("is-scrolled", window.scrollY > 24);
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

    document.addEventListener("click", function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute("href");
      if (!id || id === "#") return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 72,
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

    setTimeout(function () {
      $$("[data-reveal]:not(.is-visible), .reveal:not(.is-visible)").forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-visible");
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
        if (entry.isIntersecting) { entry.target.classList.add("is-traced"); io.unobserve(entry.target); }
      });
    }, { threshold: 0.2 });
    icons.forEach(function (i) { io.observe(i); });
    setTimeout(function () {
      $$(".svg-trace:not(.is-traced)").forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-traced");
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
      var start    = performance.now();
      var duration = 1800;
      function tick(t) {
        var p     = Math.min(1, (t - start) / duration);
        var eased = 1 - Math.pow(1 - p, 3);
        node.textContent = Math.round(target * eased);
        if (p < 1) requestAnimationFrame(tick);
        else node.textContent = target;
      }
      requestAnimationFrame(tick);
    }

    if (typeof IntersectionObserver === "undefined") { nodes.forEach(animate); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animate(entry.target); io.unobserve(entry.target); }
      });
    }, { threshold: 0.3 });
    nodes.forEach(function (n) { io.observe(n); });
  }

  /* ------------------------------------------------------------
     6. Projects carousel (scroll-snap + prev/next + progress)
     ------------------------------------------------------------ */
  function initProjects() {
    var track    = $("[data-projects]");
    if (!track) return;
    var prev     = $("[data-prev]");
    var next     = $("[data-next]");
    var progress = $("[data-progress]");

    function step() {
      var card = track.querySelector(".project-card");
      if (!card) return 480;
      return card.getBoundingClientRect().width + (parseFloat(getComputedStyle(track).gap) || 24);
    }
    function updateProgress() {
      if (!progress) return;
      var max   = track.scrollWidth - track.clientWidth;
      var ratio = max > 0 ? track.scrollLeft / max : 0;
      progress.style.width = (12 + ratio * 88) + "%";
    }
    if (prev) prev.addEventListener("click", function () { track.scrollBy({ left: -step(), behavior: reduced ? "auto" : "smooth" }); });
    if (next) next.addEventListener("click", function () { track.scrollBy({ left:  step(), behavior: reduced ? "auto" : "smooth" }); });
    track.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();
    track.setAttribute("tabindex", "0");
    track.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); track.scrollBy({ left:  step(), behavior: "smooth" }); }
      if (e.key === "ArrowLeft")  { e.preventDefault(); track.scrollBy({ left: -step(), behavior: "smooth" }); }
    });
  }

  /* ------------------------------------------------------------
     7. Contact form — Formspree + rate limiting + honeypot
     ------------------------------------------------------------ */
  function initForm() {
    var form = $("[data-form]");
    if (!form) return;

    /* Rate limiting: máx 3 envíos en 5 minutos */
    var RATE_KEY = "lmc_rate";
    var RATE_MAX = 3;
    var RATE_WIN = 5 * 60 * 1000;

    function getRateData() {
      try { return JSON.parse(localStorage.getItem(RATE_KEY) || "{}"); } catch (_) { return {}; }
    }
    function isRateLimited() {
      var d = getRateData();
      if (!d.start || Date.now() - d.start > RATE_WIN) return false;
      return (d.count || 0) >= RATE_MAX;
    }
    function trackSend() {
      try {
        var d   = getRateData();
        var now = Date.now();
        if (!d.start || now - d.start > RATE_WIN) d = { start: now, count: 0 };
        d.count = (d.count || 0) + 1;
        localStorage.setItem(RATE_KEY, JSON.stringify(d));
      } catch (_) {}
    }

    /* Configura acción Formspree desde manifest */
    var cfg     = window.__LMC__ || {};
    var spreeId = (cfg.contact && cfg.contact.formspree_id) || "";
    if (spreeId) {
      form.setAttribute("action", "https://formspree.io/f/" + spreeId);
      form.setAttribute("method", "POST");
    }

    var submitBtn  = form.querySelector(".form-submit");
    var submitSpan = submitBtn ? submitBtn.querySelector("span") : null;
    var toastEl    = $("[data-toast]");
    var successEl  = $("[data-form-success]");
    var honeypot   = form.querySelector('[name="_gotcha"]');
    var origLabel  = ((cfg.contactForm || {}).submitLabel) || "Enviar solicitud";
    var privCheck  = form.querySelector('[name="privacy"]');

    /* Toast */
    function showToast(msg, type) {
      if (!toastEl) return;
      toastEl.textContent = msg;
      toastEl.className   = "form-toast is-" + type;
      clearTimeout(toastEl._tid);
      toastEl._tid = setTimeout(function () { toastEl.className = "form-toast"; }, 7000);
    }

    /* Validación por campo */
    function getFieldError(field) {
      var v    = field.value.trim();
      var name = field.name;
      if (field.required && !v) return "Campo obligatorio.";
      if (name === "email" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
        return "Introduce un email válido.";
      if (name === "phone" && v) {
        var clean = v.replace(/[\s.\-()]/g, "");
        if (!/^(\+34|0034)?[6789]\d{8}$/.test(clean))
          return "Teléfono no válido (ej: +34 600 000 000).";
      }
      if (name === "description" && v && v.length < 20)
        return "Mínimo 20 caracteres (" + v.length + "/20).";
      return "";
    }

    function setFieldError(field, msg) {
      var wrap  = field.closest("label, .form-textarea");
      var errEl = wrap && wrap.querySelector(".field-error");
      if (errEl) errEl.textContent = msg;
      field.classList.toggle("is-error", !!msg);
      field.setAttribute("aria-invalid", msg ? "true" : "false");
    }

    /* Validación en tiempo real */
    $$("input:not([name='_gotcha']):not([name='privacy']):not([type='checkbox']), textarea, select", form).forEach(function (f) {
      f.addEventListener("blur",   function () { setFieldError(f, getFieldError(f)); });
      f.addEventListener("input",  function () { if (f.classList.contains("is-error")) setFieldError(f, getFieldError(f)); });
      f.addEventListener("change", function () { setFieldError(f, getFieldError(f)); });
    });

    if (privCheck) {
      privCheck.addEventListener("change", function () {
        var lbl = privCheck.closest("label");
        if (lbl && privCheck.checked) {
          lbl.classList.remove("is-error");
          var errEl = lbl.querySelector(".field-error");
          if (errEl) errEl.textContent = "";
        }
      });
    }

    /* Submit */
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (honeypot && honeypot.value) return; /* bot */

      if (isRateLimited()) {
        showToast("Demasiados intentos. Espera unos minutos o llámanos al +34 93 139 42 24.", "error");
        return;
      }

      if (privCheck && !privCheck.checked) {
        var lbl = privCheck.closest("label");
        if (lbl) {
          lbl.classList.add("is-error");
          var errEl = lbl.querySelector(".field-error");
          if (errEl) errEl.textContent = "Debes aceptar la política de privacidad.";
        }
        showToast("Acepta la política de privacidad para continuar.", "error");
        return;
      }

      var allOk = true;
      $$("input:not([name='_gotcha']):not([name='privacy']):not([type='checkbox']), textarea, select", form).forEach(function (f) {
        var err = getFieldError(f);
        setFieldError(f, err);
        if (err) allOk = false;
      });
      if (!allOk) {
        showToast("Revisa los campos marcados en rojo.", "error");
        var firstErr = form.querySelector(".is-error");
        if (firstErr) firstErr.focus();
        return;
      }

      setSending(true);

      var action       = form.getAttribute("action") || "";
      var contactEmail = (cfg.contact && cfg.contact.email) || "lmcsistemas@lmcsistemas.com";

      if (action.indexOf("formspree.io") !== -1) {
        var fd = new FormData(form);
        fetch(action, { method: "POST", body: fd, headers: { "Accept": "application/json" } })
          .then(function (res) {
            trackSend();
            if (res.ok) {
              onSuccess();
            } else {
              res.json().then(function (data) {
                var msg = data.errors && data.errors[0] && data.errors[0].message;
                onError(msg || null);
              }).catch(function () { onError(null); });
            }
          })
          .catch(function () { trackSend(); onMailto(contactEmail); })
          .then(function () { setSending(false); });
      } else {
        setTimeout(function () {
          trackSend();
          onMailto(contactEmail);
          setSending(false);
        }, 600);
      }
    });

    function setSending(s) {
      form.classList.toggle("is-sending", s);
      if (submitBtn)  submitBtn.disabled       = s;
      if (submitSpan) submitSpan.textContent   = s ? "Enviando…" : origLabel;
    }

    function onSuccess() {
      if (successEl) { successEl.classList.add("is-visible"); successEl.removeAttribute("aria-hidden"); }
      showToast("Solicitud enviada. Te respondemos en 24 h laborables.", "success");
      form.reset();
      $$(".field-error", form).forEach(function (el) { el.textContent = ""; });
      $$(".is-error",    form).forEach(function (el) { el.classList.remove("is-error"); });
    }

    function onError(msg) {
      showToast(msg || "Error al enviar. Llámanos al +34 93 139 42 24.", "error");
    }

    function onMailto(email) {
      try {
        var fd2  = new FormData(form);
        var body = [
          "Empresa: "     + (fd2.get("company")    || ""),
          "Contacto: "    + (fd2.get("contact")     || ""),
          "Teléfono: "    + (fd2.get("phone")       || ""),
          "Email: "       + (fd2.get("email")        || ""),
          "Proyecto: "    + (fd2.get("projectType") || ""),
          "Presupuesto: " + (fd2.get("budget")       || ""),
          "",
          "Descripción:",
          (fd2.get("description") || "")
        ].join("\n");
        var subj = "Solicitud de consultoría · " + (fd2.get("company") || "Nuevo contacto");
        window.location.href = "mailto:" + email +
          "?subject=" + encodeURIComponent(subj) +
          "&body="    + encodeURIComponent(body);
        onSuccess();
      } catch (_) { onError(null); }
    }
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
      dot.style.transform = "translate3d(" + mx + "px," + my + "px,0) translate(-50%,-50%)";
      if (!firstMove) {
        firstMove = true; rx = mx; ry = my;
        ring.style.transform = "translate3d(" + rx + "px," + ry + "px,0) translate(-50%,-50%)";
        cursor.classList.add("is-ready");
      }
    });

    (function loop() {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      ring.style.transform = "translate3d(" + rx + "px," + ry + "px,0) translate(-50%,-50%)";
      requestAnimationFrame(loop);
    })();

    var HV = "[data-cursor], a, button, label, input, textarea, select";
    document.addEventListener("mouseover", function (e) {
      var t = e.target.closest(HV);
      if (!t) return;
      var msg = t.getAttribute("data-cursor") || "";
      if (!msg) {
        if (t.tagName === "A") msg = "ir";
        else if (t.tagName === "BUTTON") msg = "pulsar";
        else if (t.matches("input, textarea, select, label")) msg = "escribir";
      }
      label.textContent = msg;
      cursor.classList.add("is-hover");
    });
    document.addEventListener("mouseout", function (e) {
      var t = e.target.closest(HV);
      if (!t) return;
      if (e.relatedTarget && t.contains(e.relatedTarget)) return;
      cursor.classList.remove("is-hover");
    });
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
      var id = (l.getAttribute("href") || "").replace("#", "");
      if (id) map[id] = l;
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          links.forEach(function (l) { l.classList.remove("is-active"); });
          if (map[entry.target.id]) map[entry.target.id].classList.add("is-active");
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
    $$(".section-num").forEach(function (n) {
      gsap.to(n, {
        yPercent: -30, ease: "none",
        scrollTrigger: { trigger: n.closest(".section"), start: "top bottom", end: "bottom top", scrub: 0.6 }
      });
    });
    var heroTitle = $(".hero-title");
    if (heroTitle && !reduced) {
      gsap.to(heroTitle, {
        yPercent: -8, opacity: 0.6, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.4 }
      });
    }
  }

  /* ------------------------------------------------------------
     Boot
     ------------------------------------------------------------ */
  function boot() {
    safe(initSplash,         "initSplash");
    safe(initNav,            "initNav");
    safe(initReveals,        "initReveals");
    safe(initSvgTrace,       "initSvgTrace");
    safe(initCounters,       "initCounters");
    safe(initProjects,       "initProjects");
    safe(initForm,           "initForm");
    safe(initCursor,         "initCursor");
    safe(initNavHighlight,   "initNavHighlight");
    safe(initGsapAnimations, "initGsapAnimations");
    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
