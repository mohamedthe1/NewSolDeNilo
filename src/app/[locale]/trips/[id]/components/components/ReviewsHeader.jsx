"use client";
import { FaStar } from "react-icons/fa";

export default function ReviewsHeader({ title, averageRating, reviewsCount, themeName }) {
  return (
    <div className="flex items-center justify-between mb-6 border-b pb-2">
      <h2 className="text-2xl font-bold flex items-center gap-2">{title}</h2>
      {reviewsCount > 0 && (
        <div className="flex items-center gap-2">
          <span className="font-semibold">Average</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                size={20}
                className={
                  i < Math.round(averageRating)
                    ? themeName === "dark"
                      ? "text-yellow-400"
                      : "text-[#c9a34a]"
                    : "text-gray-400"
                }
              />
            ))}
          </div>
          <span className="ml-2">({averageRating})</span>
        </div>
      )}
    </div>
  );
}
