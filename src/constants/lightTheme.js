const LightTheme = {
  name: "light",

  // خلفية بيضاء نقية مع لمسة زجاجية
  background: "bg-[#F5F5F5] backdrop-blur-[16px]",

  // النصوص الأساسية
  text: "text-[#212121]", // أسود فاتح من MUI text.primary

  // النصوص الثانوية
  subText: "text-[#616161]", // رمادي من MUI text.secondary

  // العناوين الرئيسية
  title: "text-[#FF9800] font-extrabold tracking-wide", // برتقالي أساسي من primary.main

  // العناوين الثانوية
  heading: "text-[#1976D2] font-semibold", // أزرق أساسي من secondary.main

  // الكروت الزجاجية
  card: "bg-[#FFFFFF] backdrop-blur-[12px] rounded-[16px]",

  // طبقة فوق الصور
  overlay: "bg-[rgba(0,0,0,0.23)]",

  // الأزرار الأساسية
  buttonPrimary:
    "bg-[#FF9800] text-white font-semibold rounded-xl px-6 py-3 hover:bg-[#FFC107] transition-all shadow-sm hover:shadow-md tracking-wide uppercase",
  buttonSecondary:
    "bg-[#FFFFFF] text-[#212121] font-medium rounded-xl px-6 py-3 hover:bg-[#F5F5F5] transition-all border border-[#1976D2]",

  // الحدود
  border: "border border-[#FF9800] rounded-[16px]",

  // الظلال
  shadow: "shadow-[0_4px_12px_rgba(0,0,0,0.1)]",

  // شعار
  logoGradientFrom: "#FFFFFF", 
  logoGradientTo: "#FF9800",   
  logoBorder: "#1976D2",

  // الحقول
  inputText: "#212121",
  inputBorder: "#FF9800",
  inputFocus: "#F57C00",
  inputHoverBg: "#F5F5F5",
  inputLabel: "#616161",

  // الأيقونات
  icon: "text-[#FF9800]",
  iconInactive: "text-[#9E9E9E]",
  iconHover: "text-[#FFC107] transition-colors",

  // ألوان إضافية للهوية
  ivory: "bg-[#FFFFFF]",
  gold: "text-[#FF9800]",
  gray: "text-[#616161]",
};

export default LightTheme;
