const DarkTheme = {
  name: "dark",

  // خلفية داكنة أنيقة مع لمسة زجاجية
  background: "bg-[#0D0D0D] backdrop-blur-[18px]",

  // النصوص الأساسية
  text: "text-[#E0E0E0]", // رمادي فاتح

  // النصوص الثانوية
  subText: "text-[#FFB74D]", // برتقالي أفتح

  // العناوين الرئيسية
  title: "text-[#FF9800] font-extrabold tracking-wide", // برتقالي أساسي

  // العناوين الثانوية
  heading: "text-[#FFB74D] font-semibold", // برتقالي أفتح

  // الكروت الزجاجية الداكنة
  card: "bg-[#1C1C1C] backdrop-blur-[14px] rounded-[18px]",

  // شعار
  logoGradientFrom: "#FFFFFF", 
  logoGradientTo: "#FF9800", 
  logoBorder: "#FF9800",

  // طبقة فوق الصور
  overlay: "bg-[rgba(0,0,0,0.3)]",

  // الحدود
  border: "border border-[#FF9800] rounded-[18px]",

  // الظلال
  shadow: "shadow-[0_6px_20px_rgba(255,152,0,0.25)]",
  inputBorder: "#FF9800",

  // الأزرار الأساسية
  buttonPrimary:
    "bg-[#FF9800] text-black font-semibold rounded-xl px-6 py-3 hover:bg-[#FFC107] transition-all shadow-md hover:shadow-lg",

  // الأزرار الثانوية
  buttonSecondary:
    "bg-[#1C1C1C] text-[#E0E0E0] font-medium rounded-xl px-6 py-3 hover:bg-[#424242] transition-all border border-[#FF9800]",

  // الأيقونات
  icon: "text-[#FF9800]",
  iconInactive: "text-[#9E9E9E]",
  iconHover: "text-[#FFC107] transition-colors",

  // ألوان إضافية للهوية
  night: "bg-[#0D0D0D]", 
  desertGold: "text-[#FF9800]", 
  sandIvory: "text-[#E0E0E0]", 
  deepBrown: "text-[#1C1C1C]", 
  crimsonAccent: "text-[#90CAF9]", // أزرق فاتح للتباين
};

export default DarkTheme;
