export async function generateMetadata({ params }) {
  const lang = params?.locale || "en";

  const metaByLang = {
    en: {
      title: "Contact Us | Reach Out Anytime",
      description:
        "Send us your questions or feedback through our secure and responsive contact form.",
      keywords: [
        "contact",
        "support",
        "feedback",
        "form",
        "message",
        "help",
        "reach out",
      ],
    },
    de: {
      title: "Kontaktieren Sie uns | Jederzeit erreichbar",
      description:
        "Senden Sie uns Ihre Fragen oder Ihr Feedback über unser sicheres Kontaktformular.",
      keywords: [
        "kontakt",
        "unterstützung",
        "feedback",
        "formular",
        "nachricht",
        "hilfe",
        "kontaktieren",
      ],
    },
    fr: {
      title: "Contactez-nous | Disponible à tout moment",
      description:
        "Envoyez-nous vos questions ou suggestions via notre formulaire de contact sécurisé.",
      keywords: [
        "contact",
        "assistance",
        "retour",
        "formulaire",
        "message",
        "aide",
        "joindre",
      ],
    },
    it: {
      title: "Contattaci | Sempre disponibili",
      description:
        "Inviaci le tue domande o suggerimenti tramite il nostro modulo di contatto sicuro.",
      keywords: [
        "contatto",
        "supporto",
        "feedback",
        "modulo",
        "messaggio",
        "aiuto",
        "raggiungici",
      ],
    },
    es: {
      title: "Contáctanos | Siempre disponibles",
      description:
        "Envíanos tus preguntas o sugerencias a través de nuestro formulario de contacto seguro.",
      keywords: [
        "contacto",
        "soporte",
        "comentarios",
        "formulario",
        "mensaje",
        "ayuda",
        "comunícate",
      ],
    },
  };

  const meta = metaByLang[lang] || metaByLang.en;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://yourdomain.com/${lang}/contact`,
      siteName: "YourSiteName",
      images: [
        {
          url: "https://yourdomain.com/images/contact-og.jpg", // ✨ ضع صورة مناسبة هنا
          width: 1200,
          height: 630,
          alt: "Contact form illustration",
        },
      ],
      locale: lang === "en" ? "en_US" : `${lang}_${lang.toUpperCase()}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["https://yourdomain.com/images/contact-og.jpg"],
    },
    themeColor: "#ffb300",
    robots: {
      index: true,
      follow: true,
    },
  };
}
