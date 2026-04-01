import { useState, useEffect } from "react";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
export function useScreenSize() {
  const [screenSize, setScreenSize] = useState({
    width: 0,
    height: 0,
  });
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  useEffect(() => {
    const updateSize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    updateSize(); // أول مرة
    window.addEventListener("resize", updateSize);
    // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return screenSize;
}
