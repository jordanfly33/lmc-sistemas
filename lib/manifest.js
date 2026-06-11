/* =============================================================
   LMC SISTEMAS — Manifest editable por el admin.
   Abre este archivo con el Bloc de notas o cualquier editor y
   cambia los textos entre comillas. Guarda y refresca la web.
   ============================================================= */
(function () {
  "use strict";

  window.__LMC__ = {

    /* ----- Marca ----- */
    brand: {
      name: "LMC Sistemas",
      tagline: "20+ años asegurando lo que importa.",
      subtitle: "Proyectos de Seguridad e Integración. Servicio Técnico",
      kicker: "Proyectos de Seguridad e Integración · Servicio Técnico",
      sideRail: "TÉCNICOS ESPECIALIZADOS · 20+ AÑOS DE EXPERIENCIA · LMCSISTEMAS.COM",
      ctaPrimary: "Solicitar Consultoría",
      ctaSecondary: "Ver Proyectos",
      url: "https://www.lmcsistemas.com/"
    },

    /* ----- Ticker corporativo (marquee) ----- */
    ticker: [
      "CCTV", "Intrusión", "Control de Accesos", "Perimetral",
      "Detección Fuego", "Integración", "IoT", "Consultoría",
      "Soporte Técnico", "LMC Sistemas"
    ],

    /* ----- Servicios principales (sección 01 · grid 3x2) ----- */
    services: [
      {
        id: "cctv",
        num: "S01",
        name: "CCTV & Vigilancia",
        accent: "blue",
        desc: "Sistemas de vigilancia de última generación con IA, almacenamiento escalable y análisis en tiempo real.",
        tech: ["Bosch", "Análisis de vídeo"]
      },
      {
        id: "intrusion",
        num: "S02",
        name: "Sistemas de Intrusión",
        accent: "mint",
        desc: "Detección perimetral y volumétrica. Protección permanente con alertas instantáneas a centrales receptoras.",
        tech: ["Bosch", "MAP 5000"]
      },
      {
        id: "accesos",
        num: "S03",
        name: "Control de Accesos",
        accent: "blue",
        desc: "Gestión centralizada de accesos, visitas y acreditaciones. Control de acceso por lectura de matrículas.",
        tech: ["Arquero", "Vigiplus"]
      },
      {
        id: "perimetral",
        num: "S04",
        name: "Protección Perimetral",
        accent: "mint",
        desc: "Barreras de infrarrojos, sensores de valla y detectores de exterior de doble tecnología.",
        tech: ["Sorhea", "Sieza", "G-FENCE"]
      },
      {
        id: "fuego",
        num: "S05",
        name: "Detección de Incendios",
        accent: "blue",
        desc: "Sistemas automáticos de detección de incendio integrados en la plataforma de gestión de seguridad.",
        tech: ["Bosch", "DESICO"]
      },
      {
        id: "integracion",
        num: "S06",
        name: "Integración de Sistemas",
        accent: "mint",
        desc: "Plataforma unificada para operar y supervisar intrusión, incendio, CCTV, accesos y automatización.",
        tech: ["Vigiplus", "Arquero"]
      }
    ],

    /* ----- Experticia (sección 02 · contadores) ----- */
    metrics: [
      { id: "years",    target: 20,  suffix: "+", label: "Años de experiencia",      sub: "En el sector de seguridad electrónica" },
      { id: "countries", target: 3, suffix: "",  label: "Países con proyectos",      sub: "España, Egipto y Perú" },
      { id: "brands",    target: 5, suffix: "+", label: "Fabricantes integrados",    sub: "Bosch, Sorhea, Sieza, DESICO y SCI-SPAIN" }
    ],
    expertParagraph: "Somos un equipo de técnicos especialistas con más de dos décadas implantando soluciones de seguridad electrónica e integración en sectores críticos: industria, infraestructura, retail, sanidad y administración pública. Trabajamos con los principales fabricantes del mercado y ofrecemos un servicio extremo a extremo: consultoría, dirección técnica, puesta en marcha y soporte continuado.",

    /* ----- Casos de éxito (sección 03 · carrusel) ----- */
    projects: [
      { id: "p01", title: "Protección ZAL Andalucía", type: "Protección Perimetral", image: "assets/img/proj-1-datacenter.jpg",
        challenge: "Análisis, proyecto e implantación del sistema de protección perimetral.",
        solution: "Protección perimetral por detección y análisis de vídeo. Control de acceso por lectura de matrículas.",
        result: "Integración con software ARQUERO (SCI-SPAIN).",
        tech: ["Arquero", "SCI-SPAIN"] },
      { id: "p02", title: "Farmacéutica · Barcelona", type: "Perimetral + CCTV", image: "assets/img/proj-2-cctv.jpg",
        challenge: "Análisis, proyecto y dirección técnica.",
        solution: "Sistema de protección perimetral G-FENCE 3000 (Sorhea).",
        result: "Integración con Bosch Video Management Service.",
        tech: ["Sorhea", "Bosch"] },
      { id: "p03", title: "Refinería · Costa Mediterránea", type: "Protección Perimetral", image: "assets/img/proj-3-access.jpg",
        challenge: "Sistema de protección perimetral para refinería.",
        solution: "Sistemas I2004, I2005R e I2005E; central MAP 5000 y CCTV Bosch.",
        result: "Integración con software VIGIPLUS (DESICO) y red de comunicaciones COMNET.",
        tech: ["Vigiplus", "Bosch", "COMNET"] },
      { id: "p04", title: "Zonas Arqueológicas · Egipto", type: "Protección Perimetral", image: "assets/img/proj-4-perimeter.jpg",
        challenge: "Protección perimetral de zonas arqueológicas.",
        solution: "Sistemas KAPIRIS II/III y MAXIRIS 2000 DESERT (Sorhea); RDL 900 y WAVE GUARD.",
        result: "Central MAP 5000 y matrices CCTV Bosch.",
        tech: ["Sorhea", "Bosch"] },
      { id: "p05", title: "Hospital · Provincia de Barcelona", type: "CCTV", image: "assets/img/proj-5-fire.jpg",
        challenge: "Configuración del sistema de videovigilancia del hospital.",
        solution: "Sistema CCTV Bosch con análisis inteligente de vídeo.",
        result: "",
        tech: ["Bosch"] },
      { id: "p06", title: "Central de Ciclo Combinado · Perú", type: "Integración", image: "assets/img/proj-6-control.jpg",
        challenge: "Integración de los sistemas de seguridad de la central.",
        solution: "Sistema de control de accesos S-ETHER y KAPIRIS.",
        result: "Integración con software ARQUERO.",
        tech: ["Arquero", "Sorhea"] },
      { id: "p07", title: "Mercado Emblemático · Barcelona", type: "CCTV + Integración", image: "assets/img/proj-7-integration.jpg",
        challenge: "Sistemas de seguridad electrónica del mercado.",
        solution: "CCTV Bosch y central de intrusión MAP 5000.",
        result: "Integración con software ARQUERO.",
        tech: ["Bosch", "Arquero"] }
    ],

    /* ----- Valores (sección 04) ----- */
    values: [
      {
        id: "experiencia",
        num: "V01",
        title: "Experiencia",
        desc: "20+ años posicionándonos como referentes en el sector de seguridad electrónica."
      },
      {
        id: "profesionalidad",
        num: "V02",
        title: "Profesionalidad",
        desc: "Soluciones a medida, diseño y ejecución impecables. Documentación técnica completa."
      },
      {
        id: "compromiso",
        num: "V03",
        title: "Compromiso",
        desc: "Respuesta rápida, soporte técnico continuado y mantenimiento preventivo programado."
      },
      {
        id: "innovacion",
        num: "V04",
        title: "Innovación",
        desc: "Tecnologías de punta en intrusión, IoT industrial y análisis con inteligencia artificial."
      }
    ],

    /* ----- Servicios secundarios (sección 05) ----- */
    secondaryServices: [
      {
        id: "consultoria",
        num: "C01",
        title: "Estudio de Proyectos",
        desc: "Consultoría y asesoramiento: análisis de necesidades y diseño de soluciones de seguridad a medida."
      },
      {
        id: "direccion",
        num: "C02",
        title: "Dirección Técnica",
        desc: "Supervisión de proyectos, coordinación con instaladores, control de calidad y certificación final."
      },
      {
        id: "puesta",
        num: "C03",
        title: "Puestas en Marcha",
        desc: "Instalación, configuración, testing extremo a extremo y formación de los equipos técnicos del cliente."
      },
      {
        id: "soporte",
        num: "C04",
        title: "Soporte Técnico Continuado",
        desc: "Mantenimiento preventivo, respuesta ante incidencias y actualizaciones de software programadas."
      }
    ],

    /* ----- Formulario de contacto (sección 06) ----- */
    contactForm: {
      title: "Solicita tu consultoría.",
      subtitle: "Cuéntanos tu proyecto. Un técnico especialista te responderá en menos de 24 h laborables.",
      projectTypes: [
        "CCTV & Vigilancia",
        "Sistemas de Intrusión",
        "Control de Accesos",
        "Protección Perimetral",
        "Detección de Incendios",
        "Integración Integral",
        "Soporte / Mantenimiento",
        "Otro"
      ],
      budgetRanges: [
        "< 25.000 €",
        "25.000 – 75.000 €",
        "75.000 – 200.000 €",
        "> 200.000 €",
        "Prefiero comentarlo"
      ],
      privacyNotice: "Tus datos se utilizan únicamente para responder a tu solicitud. Cumplimos RGPD y nunca compartiremos tu información con terceros.",
      submitLabel: "Enviar solicitud"
    },

    /* ----- Datos de contacto ----- */
    contact: {
      phone: "+34 93 139 42 24",
      email: "lmcsistemas@lmcsistemas.com",
      address: "Edificio Nodus · Oficina 202 · Pol. Ind. Can Salvatella · Carrer Mogoda, 1 · 08210 Barberá del Vallès (Barcelona)",
      addressShort: "Barberá del Vallès, Barcelona",
      schedule: "L–J · 9:00 – 13:30 y 15:00 – 18:30 · V · 9:00 – 15:00",
      legalName: "LMC sistemas Sigertec S.L.",
      mapsLat: "41.5486",
      mapsLng: "2.1168",

      /* ─────────────────────────────────────────────────────────────
         FORMULARIO FUNCIONAL — elige una opción:

         OPCIÓN A (recomendada): Formspree
         1. Ve a https://formspree.io  →  crea cuenta gratis
         2. Nuevo formulario  →  añade tu email corporativo
         3. Copia el ID (ej: "xyzabcde")  →  pégalo abajo
         4. Guarda y sube el archivo. El formulario enviará a tu email.
         ───────────────────────────────────────────────────────────── */
      formspree_id: "xbdeadkn",   /* ID Formspree — formulario "Contacto LMC Sistemas" */

      /* OPCIÓN B: si dejas formspree_id vacío, el formulario abre el
         cliente de email del usuario con los datos rellenados (mailto). */
    },

    /* ----- Footer ----- */
    footer: {
      bigRepeat: "LMC · SISTEMAS · LMC · SISTEMAS · LMC · SISTEMAS",
      copyright: "© 2026 LMC sistemas · Sigertec S.L. Todos los derechos reservados.",
      columns: [
        { title: "Servicios", links: [
          { label: "CCTV & Vigilancia",       href: "#servicios" },
          { label: "Sistemas de Intrusión",   href: "#servicios" },
          { label: "Control de Accesos",      href: "#servicios" },
          { label: "Protección Perimetral",   href: "#servicios" },
          { label: "Detección de Incendios",  href: "#servicios" },
          { label: "Integración",             href: "#servicios" }
        ]},
        { title: "Empresa", links: [
          { label: "Proyectos",     href: "#proyectos" },
          { label: "Valores",       href: "#valores" },
          { label: "Consultoría",   href: "#contacto" },
          { label: "Contacto",      href: "#contacto" }
        ]},
        { title: "Legal", links: [
          { label: "Aviso legal",        href: "#" },
          { label: "Política privacidad",href: "#" },
          { label: "Cookies",            href: "#" }
        ]}
      ]
    }
  };
})();
