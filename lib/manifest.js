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
      subtitle: "Especialistas en Seguridad e Integración de Sistemas",
      kicker: "Seguridad e Integración de Sistemas · Desde 2001",
      foundedYear: "2001",
      sideRail: "TÉCNICOS ESPECIALIZADOS · DESDE 2001 · LMCSISTEMAS.COM",
      ctaPrimary: "Solicitar Consultoría",
      ctaSecondary: "Ver Proyectos",
      url: "https://www.lmcsistemas.com/"
    },

    /* ----- Ticker corporativo (marquee) ----- */
    ticker: [
      "CCTV", "Intrusión", "Control de Accesos", "Perimetral",
      "Detección Fuego", "Integración", "IoT", "Consultoría",
      "Soporte Técnico 24/7", "LMC Sistemas"
    ],

    /* ----- Servicios principales (sección 01 · grid 3x2) ----- */
    services: [
      {
        id: "cctv",
        num: "S01",
        name: "CCTV & Vigilancia",
        accent: "blue",
        desc: "Sistemas de vigilancia de última generación con IA, almacenamiento escalable y análisis en tiempo real.",
        tech: ["Bosch", "Hikvision", "Axis"]
      },
      {
        id: "intrusion",
        num: "S02",
        name: "Sistemas de Intrusión",
        accent: "mint",
        desc: "Detección perimetral y volumétrica. Protección 24/7 con alertas instantáneas a centrales receptoras.",
        tech: ["Sieza", "Peridect", "Kapiris"]
      },
      {
        id: "accesos",
        num: "S03",
        name: "Control de Accesos",
        accent: "blue",
        desc: "Gestión centralizada de accesos. Tarjetas, biometría, móvil. Reportes en tiempo real auditables.",
        tech: ["Suprema", "Salto", "Pyramid"]
      },
      {
        id: "perimetral",
        num: "S04",
        name: "Protección Perimetral",
        accent: "mint",
        desc: "Cercas eléctricas, barreras infrarrojas, sensores perimetrales inteligentes. Doble línea de defensa.",
        tech: ["Sorhea", "GFence", "Maxiris"]
      },
      {
        id: "fuego",
        num: "S05",
        name: "Detección de Incendios",
        accent: "blue",
        desc: "Sistemas automáticos con integración a megafonía y evacuación. Normativa CE y certificación EN54.",
        tech: ["Bosch", "Desico"]
      },
      {
        id: "integracion",
        num: "S06",
        name: "Integración de Sistemas",
        accent: "mint",
        desc: "Un único panel para CCTV, intrusión, accesos, fuego, megafonía. Ecosistema unificado y centralizado.",
        tech: ["Pyramid", "Coliris", "MAP 5000"]
      }
    ],

    /* ----- Experticia (sección 02 · contadores) ----- */
    metrics: [
      { id: "years",    target: 20,  suffix: "+", label: "Años de experiencia",      sub: "En el sector de seguridad electrónica" },
      { id: "projects", target: 500, suffix: "+", label: "Proyectos realizados",     sub: "Desde automatización industrial hasta grandes infraestructuras" },
      { id: "clients",  target: 150, suffix: "+", label: "Clientes activos",         sub: "Empresas e instituciones que confían en LMC" }
    ],
    expertParagraph: "Somos un equipo de técnicos especialistas con más de dos décadas implantando soluciones de seguridad electrónica e integración en sectores críticos: industria, infraestructura, retail, sanidad y administración pública. Trabajamos con los principales fabricantes del mercado y ofrecemos un servicio extremo a extremo: consultoría, dirección técnica, puesta en marcha y soporte continuado.",

    /* ----- Casos de éxito (sección 03 · carrusel) ----- */
    projects: [
      {
        id: "p01",
        title: "Centro Logístico Nacional",
        type: "Integración Completa",
        image: "assets/img/proj-1-datacenter.jpg",
        challenge: "Monitorizar 24/7 una nave de 45.000 m² con accesos múltiples, riesgo de robo de mercancía y sin punto de control único.",
        solution: "Integración CCTV con IA + control de accesos biométrico + intrusión perimetral, unificados bajo plataforma Pyramid.",
        result: "Reducción del 92% en incidentes. Uptime 99,98% durante 18 meses operativos.",
        tech: ["Bosch", "Suprema", "Pyramid"]
      },
      {
        id: "p02",
        title: "Campus Corporativo Mediterráneo",
        type: "Vigilancia Escalada",
        image: "assets/img/proj-2-cctv.jpg",
        challenge: "Cobertura de seguridad en 12 edificios independientes con sala de control centralizada y operadores externos.",
        solution: "Despliegue de 340 cámaras IP con analítica de vídeo embarcada y centralización en VMS único.",
        result: "Detección automática de eventos. Tiempo de respuesta operador reducido de 4 min a 38 segundos.",
        tech: ["Axis", "Hikvision"]
      },
      {
        id: "p03",
        title: "Planta Farmacéutica · GMP",
        type: "Control de Accesos Biométrico",
        image: "assets/img/proj-3-access.jpg",
        challenge: "Trazabilidad GMP de personas en zonas estériles. Auditoría exigida por normativa, sin fricción para operarios.",
        solution: "Lectores biométricos Suprema con doble factor y registro inmutable. Integración con ERP de RR.HH.",
        result: "Auditoría AENOR superada sin observaciones. Cero accesos no autorizados en 24 meses.",
        tech: ["Suprema", "Salto"]
      },
      {
        id: "p04",
        title: "Subestación Eléctrica Crítica",
        type: "Protección Perimetral",
        image: "assets/img/proj-4-perimeter.jpg",
        challenge: "Proteger infraestructura crítica en entorno rural, sin vigilancia permanente y con falsas alarmas frecuentes.",
        solution: "Doble barrera infrarroja + analítica perimetral con cancelación de falsos positivos por IA.",
        result: "Falsas alarmas reducidas en 87%. Verificación remota de cualquier evento en menos de 90 s.",
        tech: ["Sorhea", "Maxiris"]
      },
      {
        id: "p05",
        title: "Hospital Comarcal · Fase II",
        type: "Detección de Incendios",
        image: "assets/img/proj-5-fire.jpg",
        challenge: "Renovar sistema de detección obsoleto en hospital de 380 camas, en explotación, sin interrumpir servicio.",
        solution: "Sistema analógico direccionable Bosch con integración a megafonía de evacuación dirigida y BMS.",
        result: "Migración por fases sin cortes. Certificación EN54 y simulacro superado a las 6 semanas.",
        tech: ["Bosch", "Desico"]
      },
      {
        id: "p06",
        title: "Sala 24/7 Operador Multinacional",
        type: "Centro de Control Integrado",
        image: "assets/img/proj-6-control.jpg",
        challenge: "Unificar 8 centros regionales en un único SOC corporativo con operadores en turnos y SLA exigente.",
        solution: "Plataforma de integración MAP 5000 con videowall, gestión de incidencias y workflow auditable.",
        result: "Capacidad operativa multiplicada por 3. SLA de respuesta cumplido al 99,4%.",
        tech: ["MAP 5000", "Coliris"]
      },
      {
        id: "p07",
        title: "Data Center Tier III",
        type: "Integración + IoT Industrial",
        image: "assets/img/proj-7-integration.jpg",
        challenge: "Integrar seguridad física, climatización, energía y detección temprana en una sala crítica con redundancia N+1.",
        solution: "Plataforma IoT propia conectando sensores ambientales, CCTV, accesos y BMS bajo un mismo dashboard.",
        result: "Cero incidencias críticas en 14 meses. Mantenimiento predictivo activado en 4 sistemas.",
        tech: ["Pyramid", "Bosch", "Suprema"]
      },
      {
        id: "p08",
        title: "Planta Automoción · Industria 4.0",
        type: "Seguridad + Sensórica IoT",
        image: "assets/img/proj-8-iot.jpg",
        challenge: "Combinar seguridad perimetral con sensórica de proceso industrial y reportes en tiempo real a planta.",
        solution: "Red de sensores IoT industriales integrada con la plataforma de seguridad, dashboards por línea.",
        result: "Paradas no planificadas reducidas en 41%. Visibilidad 360º operación + seguridad en una pantalla.",
        tech: ["Coliris", "Kapiris"]
      }
    ],

    /* ----- Valores (sección 04) ----- */
    values: [
      {
        id: "experiencia",
        num: "V01",
        title: "Experiencia",
        desc: "20+ años posicionándonos como referentes en el sector de seguridad electrónica.",
        quote: "«Sabían exactamente qué pedir al fabricante. Eso nos ahorró tres meses de proyecto.»",
        quoteFrom: "CTO · Operador logístico nacional"
      },
      {
        id: "profesionalidad",
        num: "V02",
        title: "Profesionalidad",
        desc: "Soluciones a medida, diseño y ejecución impecables. Documentación técnica completa.",
        quote: "«La memoria técnica que entregaron pasó la auditoría a la primera. Sin observaciones.»",
        quoteFrom: "Director Seguridad · Sector farmacéutico"
      },
      {
        id: "compromiso",
        num: "V03",
        title: "Compromiso",
        desc: "Respuesta rápida, soporte continuado 24/7 y mantenimiento preventivo programado.",
        quote: "«A las 2 de la madrugada, un técnico ya estaba en planta. Eso es compromiso real.»",
        quoteFrom: "Jefe Mantenimiento · Industria química"
      },
      {
        id: "innovacion",
        num: "V04",
        title: "Innovación",
        desc: "Tecnologías de punta en intrusión, IoT industrial y análisis con inteligencia artificial.",
        quote: "«Nos propusieron una analítica que ni habíamos imaginado. Cambió cómo operamos.»",
        quoteFrom: "Director Operaciones · Retail multinacional"
      }
    ],

    /* ----- Servicios secundarios (sección 05) ----- */
    secondaryServices: [
      {
        id: "consultoria",
        num: "C01",
        title: "Consultoría & Auditoría",
        desc: "Análisis de riesgos, diseño de soluciones a medida, cumplimiento normativo (ISO 27001, NEN 2647, EN 54)."
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
      email: "comercial@lmcsistemas.com",
      address: "Edificio Nodus · Oficina 202 · Pol. Ind. Can Salvatella · Carrer Mogoda, 1 · 08210 Barberá del Vallès (Barcelona)",
      addressShort: "Barberá del Vallès, Barcelona",
      schedule: "Lunes a viernes · 9:00 – 18:00",
      support24h: "Soporte técnico 24/7 para clientes con contrato",
      linkedin: "https://www.linkedin.com/company/lmcsistemas",
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
      copyright: "© 2001–2026 LMC Sistemas (Sigertec S.L.). Todos los derechos reservados.",
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
