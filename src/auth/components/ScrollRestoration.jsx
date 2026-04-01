"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    const savedScroll = sessionStorage.getItem(`scroll-${pathname}`);

    if (savedScroll) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedScroll, 10));
      }, 100); // تأخير بسيط لضمان أن المحتوى مرسوم
    }
  }, [pathname]);

  return null;
}
