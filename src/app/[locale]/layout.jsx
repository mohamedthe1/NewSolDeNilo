import "../../style/globals.css";
import { notFound } from "next/navigation";
import  Providers  from "../providers"; // استدعاء الـ Providers

export function generateStaticParams() {
  return ["en", "es", "de", "it", "ar", "zh"].map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  const locale = await params.locale;

  // لو اللغة مش مدعومة → notFound
  const supportedLocales = ["en", "es", "de", "it", "ar", "zh"];
  if (!supportedLocales.includes(locale)) {
    notFound();
  }

  return (
    <Providers>
      <main lang={locale}>{children}</main>{" "}
    </Providers>
  );
}
