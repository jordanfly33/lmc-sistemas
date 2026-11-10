/* Personaliza el correo y el teléfono en este bloque antes de publicar. */
const CONTACT_EMAIL = "hola@aidescubierto.com";
const WHATSAPP_NUMBER = ""; // Formato internacional, solo números: 34600123456

const header = document.querySelector("[data-header]");
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

window.addEventListener("scroll", () => {
  header?.classList.toggle("scrolled", window.scrollY > 12);
}, { passive: true });

toggle?.addEventListener("click", () => {
  const isOpen = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!isOpen));
  toggle.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
  nav?.classList.toggle("open", !isOpen);
});

nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  toggle?.setAttribute("aria-expanded", "false");
  toggle?.setAttribute("aria-label", "Abrir menú");
}));

document.querySelectorAll("[data-year]").forEach(node => node.textContent = new Date().getFullYear());
document.querySelectorAll("[data-email]").forEach(node => {
  node.href = `mailto:${CONTACT_EMAIL}`;
  node.textContent = CONTACT_EMAIL;
});

const whatsapp = document.querySelector("[data-whatsapp]");
if (whatsapp && /^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
  whatsapp.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, me gustaría hablar sobre una web para mi negocio.")}`;
  whatsapp.target = "_blank";
  whatsapp.rel = "noopener noreferrer";
} else if (whatsapp) {
  whatsapp.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Consulta sobre una web para mi negocio")}`;
  whatsapp.addEventListener("click", event => {
    event.preventDefault();
    document.querySelector("[data-contact-form]")?.scrollIntoView({ behavior: "smooth", block: "center" });
    document.querySelector(".form-status")?.replaceChildren(document.createTextNode("Configura tu número de WhatsApp en main.js para activar este acceso directo."));
  });
}

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".section-label, .intro-grid, .benefit, .included-art, .included-copy, .work-card, .steps article, .price-card, .faq-list details, .voice-card, .contact-panel").forEach(node => {
    node.classList.add("reveal");
    observer.observe(node);
  });
}

const form = document.querySelector("[data-contact-form]");
form?.addEventListener("submit", event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const values = new FormData(form);
  const subject = `Consulta web · ${values.get("business")}`;
  const body = [
    `Nombre: ${values.get("name")}`,
    `Negocio: ${values.get("business")}`,
    `Contacto: ${values.get("reply")}`,
    "",
    values.get("message") || "Me gustaría hablar sobre una página web."
  ].join("\n");
  document.querySelector(".form-status").textContent = "Abriendo tu aplicación de correo con los datos preparados…";
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
