 export const cityOptions = {
    Luxor: [
      {
        key: "1",
        label: "Sound & Light Show at Karnak Temple 🎧",
        price: 1200,
      },
      {
        key: "2",
        label: "Horse carriage ride along the Nile at sunset 🐎",
        price: 600,
      },
      {
        key: "3",
        label: "Private felucca trip to Banana Island 🚤",
        price: 1200,
      },
      { key: "4", label: "Guided access to Tutankhamun’s tomb 🏛️", price: 600 },
    ],
    Aswan: [
      { key: "1", label: "Nubian village 🏘️", price: 50 },
      { key: "2", label: "Obelisk and High Dam 🗿", price: 60 },
      { key: "3", label: "Elephantine and Botanical Island 🌴", price: 50 },
      { key: "4", label: "Nubian Museum 🏛️", price: 40 },
      { key: "5", label: "Sound and light of the elephant 🎆", price: 60 },
    ],
    Giza: [
      { key: "1", label: "🐪 Camel ride around pyramids", price: 800 },
      { key: "2", label: "🎧 Sound & Light Show at Sphinx", price: 950 },
      { key: "3", label: "🏛️ Inside Great Pyramid", price: 800 },
      { key: "4", label: "📸 Photo session at Plateau", price: 950 },
    ],
    Hurghada: [
      { key: "1", label: "🐠 Snorkeling trip", price: 750 },
      { key: "2", label: "🐬 Dolphin House swim", price: 900 },
      { key: "3", label: "🏜️ Desert safari", price: 750 },
      { key: "4", label: "🚤 Private boat BBQ", price: 900 },
    ],
    Alexandria: [
      { key: "1", label: "🏰 Qaitbay Citadel tour", price: 750 },
      { key: "2", label: "📚 Library of Alexandria", price: 900 },
      { key: "3", label: "🍽️ Seafood tasting", price: 750 },
      { key: "4", label: "🛶 Boat ride in Montaza", price: 900 },
    ],
    Cairo: [
      { key: "1", label: "🏛 NMEC Museum", price: 750 },
      { key: "2", label: "🌅 Sunset Nile Cruise", price: 900 },
      { key: "3", label: "Islamic Cairo tour", price: 750 },
      { key: "4", label: "🎭 Opera House show", price: 900 },
    ],
  }

  export const trips = [
      {
        title: "Nile Cruise",
        city: "Cairo",
        category: "Cruise",
        price: 500,
        popular: true,
        img: "/HomePageImage/pexels-radwa-magdy-1718930-21668633.webp",
      },
      {
        title: "Desert Safari",
        city: "Siwa",
        category: "Adventure",
        price: 300,
        popular: false,
        img: "/HomePageImage/pexels-ozgomz-7566890.webp",
      },
      {
        title: "Red Sea Diving",
        city: "Hurghada",
        category: "Diving",
        price: 700,
        popular: true,
        img: "/HomePageImage/pexels-ozgomz-7566888.webp",
      },
      {
        title: "Nile Cruise",
        city: "Cairo",
        category: "Cruise",
        price: 500,
        popular: true,
        img: "/HomePageImage/pexels-oualid-soussi-2150533856-35050672.webp",
      },
      {
        title: "Desert Safari",
        city: "Siwa",
        category: "Adventure",
        price: 300,
        popular: false,
        img: "/HomePageImage/pexels-furknsaglam-1596977-21348185.webp",
      },
      {
        title: "Red Sea Diving",
        city: "Hurghada",
        category: "Diving",
        price: 700,
        popular: true,
        img: "/HomePageImage/pexels-yasmine-qasem-1054896-2034684.webp",
      },
      {
        title: "Luxor Temples",
        city: "Luxor",
        category: "Historical",
        price: 400,
        popular: true,
        img: "/HomePageImage/luxor-temple.webp",
      },
      {
        title: "Aswan Tour",
        city: "Aswan",
        category: "Historical",
        price: 350,
        popular: false,
        img: "/HomePageImage/aswan-tour.webp",
      },
      // 🔥 أضف المزيد من الرحلات هنا للتجربة (مثلاً 20 أو 30 رحلة)
    ];
  

    

const translations = {
  en: {
    title: "Inclusive Travel for Everyone",
    description:
      "Our trips are thoughtfully designed to welcome and support travelers with special needs, ensuring accessibility, comfort, and unforgettable experiences.",
    accessible: "Accessible",
    support: "Support",
    care: "Care",
  },
  ar: {
    title: "رحلات شاملة للجميع",
    description:
      "تم تصميم رحلاتنا بعناية لتشمل وتدعم أصحاب الهمم، مع ضمان الراحة وسهولة الوصول وتجارب لا تُنسى.",
    accessible: "سهولة الوصول",
    support: "دعم",
    care: "رعاية",
  },
  fr: {
    title: "Voyages inclusifs pour tous",
    description:
      "Nos voyages sont conçus pour accueillir et soutenir les voyageurs ayant des besoins particuliers, en garantissant confort, accessibilité et expériences inoubliables.",
    accessible: "Accessible",
    support: "Soutien",
    care: "Soin",
  },
  es: {
    title: "Viajes inclusivos para todos",
    description:
      "Nuestros viajes están diseñados para acoger y apoyar a los viajeros con necesidades especiales, garantizando comodidad, accesibilidad y experiencias inolvidables.",
    accessible: "Accesible",
    support: "Apoyo",
    care: "Cuidado",
  },
  de: {
    title: "Inklusive Reisen für alle",
    description:
      "Unsere Reisen sind sorgfältig gestaltet, um Reisende mit besonderen Bedürfnissen willkommen zu heißen und zu unterstützen, mit Komfort, Barrierefreiheit und unvergesslichen Erlebnissen.",
    accessible: "Barrierefrei",
    support: "Unterstützung",
    care: "Pflege",
  },
  it: {
    title: "Viaggi inclusivi per tutti",
    description:
      "I nostri viaggi sono pensati per accogliere e supportare i viaggiatori con esigenze speciali, garantendo comfort, accessibilità ed esperienze indimenticabili.",
    accessible: "Accessibile",
    support: "Supporto",
    care: "Cura",
  },
};

export default translations;