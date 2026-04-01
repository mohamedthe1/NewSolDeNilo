// src/app/[locale]/about/page.tsx أو layout.tsx

export async function generateMetadata({ params }) {
  const locale = params.locale;

  const metadataByLocale = {
    en: {
      title: "About SolDelNilo | Discover Egypt’s Soul",
      description:
        "Learn about SolDelNilo’s mission to bring Egypt’s wonders to life. Meet our team, explore our values, and discover why we’re passionate about crafting unforgettable journeys.",
    },
    es: {
      title: "Sobre SolDelNilo | Descubre el alma de Egipto",
      description:
        "Conoce la misión de SolDelNilo para mostrar las maravillas de Egipto. Descubre nuestro equipo y nuestros valores.",
    },
    de: {
      title: "Über SolDelNilo | Entdecke die Seele Ägyptens",
      description:
        "Erfahre mehr über die Mission von SolDelNilo, Ägyptens Wunder zum Leben zu erwecken. Lerne unser Team und unsere Werte kennen.",
    },
    fr: {
      title: "À propos de SolDelNilo | Découvrez l'âme de l'Égypte",
      description:
        "Découvrez la mission de SolDelNilo pour révéler les merveilles de l'Égypte. Rencontrez notre équipe et nos valeurs.",
    },
    it: {
      title: "Chi siamo | Scopri l'anima dell'Egitto con SolDelNilo",
      description:
        "Scopri la missione di SolDelNilo: portare alla luce le meraviglie dell'Egitto. Conosci il nostro team e i nostri valori.",
    },
  };

  const fallback = {
    title: "About SolDelNilo",
    description: "Discover Egypt with SolDelNilo.",
  };

  const selected = metadataByLocale[locale] || fallback;

  return {
    title: selected.title,
    description: selected.description,
    openGraph: {
      title: selected.title,
      description: selected.description,
      url: `https://yourdomain.com/${locale}/about`,
      images: [
        {
          url: "https://yourdomain.com/assets/Copilot_20250912_105907.png",
          width: 1200,
          height: 630,
          alt: "SolDelNilo Team and Mission",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: selected.title,
      description: selected.description,
      images: ["https://yourdomain.com/assets/Copilot_20250912_105907.png"],
    },
    alternates: {
      canonical: `https://yourdomain.com/${locale}/about`,
      languages: {
        en: "https://yourdomain.com/en/about",
        es: "https://yourdomain.com/es/about",
        de: "https://yourdomain.com/de/about",
        fr: "https://yourdomain.com/fr/about",
        it: "https://yourdomain.com/it/about",
      },
    },
  };
}
