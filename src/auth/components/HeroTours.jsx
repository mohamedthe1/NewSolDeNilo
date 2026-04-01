// "use client";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useInView } from "react-intersection-observer";
// import { useAnimation } from "framer-motion";
// import { useScreenSize } from "@/auth/hooks/screenSize";
// import { usePathname } from "next/navigation";
// import { useTranslations } from "next-intl";
// import Card from "./HeroToursComponets/CardDiv";
// import HeroSlider from "./HeroToursComponets/SliderDiv";
// import SelectTours from "./HeroToursComponets/SelectTours";
// import { toast } from "react-toastify";
// import { ToursPathEn } from "@/lib/constants/FixedTexts";
// import { Box } from "@mui/material";
// import { supabase } from "../../lib/supabaseClient";
// const HeroTours = () => {
//   const path = usePathname();
//   const t = useTranslations("ToursHeroPage");
//   const { width } = useScreenSize();
//   const [toursData, setToursData] = useState([]);
//   const [hoverIndex, setHoverIndex] = useState(null);
//   const [ref, inView] = useInView({ threshold: 0.4 });
//   const [search, setSearch] = useState("");

//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [categoriesFromDB, setCategoriesFromDB] = useState([]);

//   const controls = useAnimation();
//   const WidthCard = width === 540 ? 300 : 360;

//   useEffect(() => {
//     const fetchTours = async () => {
//       try {
//         const trimmedSearch = search.trim();

//         let query = {};

//         if (trimmedSearch !== "") {
//           query.categories = encodeURIComponent(trimmedSearch);
//         } else if (selectedCategories.length > 0) {
//           query.categories = selectedCategories
//             .map(encodeURIComponent)
//             .join(",");
//         }

//         const res = await axios.get("/api/tours", {
//           params: query,
//         });

//         const data = res.data;
//         setToursData(data.tours || []);
//       } catch (error) {
//         console.error("❌ خطأ في جلب الرحلات:", error);
//         toast.error("حدث خطأ أثناء تحميل الرحلات");
//       }
//     };

//     fetchTours();
//   }, [search, selectedCategories]);
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const { data, error } = await supabase
//           .from("category")
//           .select("*")
//           .order("created_at", { ascending: false });

//         if (error) {
//           console.error("❌ خطأ في جلب الكاتجري:", error.message);
//           toast.error("حدث خطأ أثناء تحميل الكاتجري");
//           return;
//         }

//         setCategoriesFromDB(data || []);
//       } catch (err) {
//         console.error("❌ فشل في الاتصال بـ Supabase:", err.message);
//         toast.error("فشل في تحميل الكاتجري");
//       }
//     };

//     fetchCategories();
//   }, []);
//   useEffect(() => {
//     if (inView) {
//       controls.start("visible");
//     }
//   }, [inView]);
//   useEffect(() => {
//     const trimmed = search.trim();
//     if (trimmed === "") {
//       setSelectedCategories([]); // ✅ تصفير الـ Checkboxes
//     }
//   }, [search]);

//   return (
//     <section
//       style={{ width: width <= 1023 ? "100%" : width * 0.9 }}
//       className="container flex flex-col items-start justify-center"
//     >
//       <h1
//         className={`titleSection ${
//           path === ToursPathEn || path === ToursPathEs ? "text-gray-400" : ""
//         }`}
//         style={{
//           color: "#FF9800",
//           fontFamily: "Geist_Mono, Arial, sans-serif",
//           fontWeight: "700",
//         }}
//       >
//         {t("titlePage")}
//       </h1>

//       <Box
//         sx={{
//           width: "100%",
//           height: "60%",
//           mx: "auto",
//           display: "flex",
//           flexDirection: "row",
//         }}
//         className="hidden lg:flex"
//       >
//         <HeroSlider
//           categoriesFromDB={categoriesFromDB}
//           setSelectedCategories={setSelectedCategories}
//           setSearch={setSearch}
//           width={width}
//           search={search}
//         />
//       </Box>

//       <SelectTours
//         setSelectedCategories={setSelectedCategories}
//         selectedCategories={selectedCategories}
//         categoriesFromDB={categoriesFromDB}
//       />

//       <Box
//         sx={{ marginTop: "40px", marginBottom: "40px" }}
//         className="w-full flex flex-wrap gap-6 items-center justify-center"
//       >
//         {toursData.length > 0 ? (
//           <Card
//             toursData={toursData}
//             hoverIndex={hoverIndex}
//             setHoverIndex={setHoverIndex}
//             controls={controls}
//             WidthCard={WidthCard}
//             ref={ref}
//           />
//         ) : (
//           <p className="text-gray-400 text-lg font-semibold">
//             لا توجد رحلات متاحة حاليًا.
//           </p>
//         )}
//       </Box>
//     </section>
//   );
// };

// export default HeroTours;
