"use client";
import { FaStar } from "react-icons/fa";

export default function StarRating({ rating, setRating, hover, setHover, themeName }) {
  return (
    <div className="flex gap-2 mb-4">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <FaStar
            key={starValue}
            size={28}
            className={`cursor-pointer transition ${
              starValue <= (hover || rating)
                ? themeName === "dark"
                  ? "text-yellow-400"
                  : "text-[#c9a34a]"
                : "text-gray-400"
            }`}
            onClick={() => setRating(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
          />
        );
      })}
    </div>
  );
}
