// todo هنا نقوم بكتابة العناصر الثابته في الموقع لاستخدمها في اكثر من مكان
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$


// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
export const DOMAIN = "http://localhost:3000";
const img = "/assets/Copilot_20251011_220928.webp";
const img2 = "/assets/Copilot_20251011_221403.webp";
const img3 = "/assets/Copilot_20251011_221703.webp";
const img4 = "/assets/Copilot_20251011_221802.webp";
const img5 = "/assets/Copilot_20251011_222046.webp";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
export const getNavPath = (t) => [
  { label: t("Home"), path: "/" },
  { label: t("Tours"), path: "/tours" },
  { label: t("About"), path: "/about" },
  { label: t("Contact"), path: "/contact" },
];
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
export const getHeroText = (t) => [
  { titel: t("title1") },
  { titel: t("title2") },
];
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
export const getSliderToursDiv = (t) => [
  {
    image: "/assets/HomePage/Temple_of_the_Elephants.webp",
    title: t("TitleDivPic"),
    subtitle: t("PDivPic"),
  },
  {
    image: "/assets/HomePage/Abu_Simbel.webp",
    title: t("TitleDivPic"),
    subtitle: t("PDivPic"),
  },
  {
    image: "/assets/HomePage/Nile_River.webp",
    title: t("TitleDivPic"),
    subtitle: t("PDivPic"),
  },
];
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
export const getCityName = (t) => [
  { city: t("Aswan"), value: "10" },
  { city: t("Cairo"), value: "20" },
  { city: t("Hurghada"), value: "30" },
  { city: t("Luxor"), value: "40" },
  { city: t("Mersa"), value: "50" },
  { city: t("Marsa"), value: "60" },
  { city: t("Sharm"), value: "70" },
];
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// export const MideaIcon = [
//   {
//     titleIcon: "SoloNilo.facebook",
//     Icon: <BiLogoFacebook />,
//     path: "https://www.facebook.com/share/1bSxScbbn3/",
//   },
//   {
//     titleIcon: "SoloNilo.Whatsapp",
//     Icon: <FaWhatsapp />,
//     path: "https://wa.me/201010104875",
//   },
//   {
//     titleIcon: "SoloNilo.Instagram",
//     Icon: <FaInstagram />,
//     path: "https://www.instagram.com/egipto_milenario?igsh=MXF0azJzdzdyNTVibA==",
//   },
//   {
//     titleIcon: "SoloNilo.Tiktok",
//     Icon: <FaTiktok />,
//     path: "https://www.tiktok.com/@soldelnilo0?is_from_webapp=1&sender_device=pc",
//   },
//   {
//     titleIcon: "SoloNilo.Gmail",
//     Icon: <BiLogoGmail />,
//     path: "https://mail.google.com/mail/u/0/?hl=ar#inbox",
//   },
// ];
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
export const AdviceCard = [
  {
    id: "1",
    imageUrl: img,
    titleKey: "advice.1.title",
    descriptionKey: "advice.1.description",
  },
  {
    id: "2",
    imageUrl: img2,
    titleKey: "advice.2.title",
    descriptionKey: "advice.2.description",
  },
  {
    id: "3",
    imageUrl: img3,
    titleKey: "advice.3.title",
    descriptionKey: "advice.3.description",
  },
  {
    id: "4",
    imageUrl: img4,
    titleKey: "advice.4.title",
    descriptionKey: "advice.4.description",
  },
  {
    id: "8",
    imageUrl: img5,
    titleKey: "advice.8.title",
    descriptionKey: "advice.8.description",
  }
];
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

export const desktopImages = [
  "/assets/HomePage/pexels-axp-photography-500641970-18991537.webp",
  "/assets/HomePage/pexels-axp-photography-500641970-18934598.webp",
  "/assets/HomePage/pexels-axp-photography-500641970-18934596.webp",
  "/assets/HomePage/pexels-francesco-albanese-2150950215-31730178.webp",
  "/assets/HomePage/pexels-francesco-albanese-2150950215-31730178.webp",
];
export const desktopImagesMB = [
  "/assets/HomePage/bjns.webp",
  "/assets/HomePage/jasiioj.webp",
  "/assets/HomePage/ibjaskln.webp",
  "/assets/HomePage/usaoihjp.webp",
  "/assets/HomePage/usaoihjp.webp",
];
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

export const GetTours = (t) => [
  {
    title: "SEDAN",
    description: t("SCSD"),
    duration: "1 Day",
    image: "/assets/HomePage/Copilot_20251126_103743.webp",
  },
  {
    title: "VAN",
    description: t("SCSD2"),
    duration: "5 Days",
    image: "/assets/HomePage/BCO.e442b673-50cf-46ac-9d95-18c90ba23bfc.webp",
  },
  {
    title: "COASTER",
    description: t("SCSD3"),
    duration: "4 Days",
    image: "/assets/HomePage/Copilot_20251126_103242.webp",
  },
];
