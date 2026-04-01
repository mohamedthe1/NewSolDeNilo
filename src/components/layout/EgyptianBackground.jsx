"use client";
import React, { useState, useEffect } from "react";

export default function EgyptianBackground({ count = 90 }) {
  // مجموعة من الرموز الفرعونية
  const symbols = ["𓂀", "𓆣", "𓋹", "𓏏", "𓎛", "𓊽", "𓉔", "𓇋", "𓍯", "𓊃"];

  // ألوان ثابتة
  const colors = ["#000000", "#FFFFFF"];

  // حالة لتخزين العناصر بعد الـ mount
  const [items, setItems] = useState([]);

  useEffect(() => {
    const generated = [...Array(count)].map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      fontSize: `${18 + Math.random() * 32}px`,
      color: colors[Math.floor(Math.random() * colors.length)],
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
    }));
    setItems(generated);
  }, [count]);

  // لو لسه ما اتـmount → ما نعرضش حاجة
  if (items.length === 0) return null;

  return (
    <>
      {items.map((item) => (
        <span
          key={item.id}
          style={{
            position: "absolute",
            top: item.top,
            left: item.left,
            fontSize: item.fontSize,
            opacity: 0.2,
            color: item.color,
            pointerEvents: "none",
            userSelect: "none",
            transition: "opacity 0.3s ease",
          }}
        >
          {item.symbol}
        </span>
      ))}
    </>
  );
}
