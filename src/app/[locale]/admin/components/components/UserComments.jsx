import React from "react";
import { FaStar, FaCommentDots, FaUsers, FaSyncAlt } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";

const UserComments = ({ user }) => {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-4"
    >
      {Array.isArray(user.reviews) && user.reviews.length > 0 ? (
        user.reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={`p-4 rounded-lg shadow-lg border ${theme.cardSecondary} hover:scale-[1.02] transition-transform duration-300`}
          >
            {/* Rating */}
            <div className="flex items-center gap-2 mb-2">
              <FaStar className="text-yellow-500" />
              <p className={`font-semibold ${theme.textAccent}`}>
                Rating: {review.rating} / 5
              </p>
            </div>

            {/* Comment */}
            <div className="flex items-center gap-2 mb-2">
              <FaCommentDots className="text-blue-500" />
              <p className={`${theme.text} italic`}>
                “{review.comment}”
              </p>
            </div>

            {/* Trip title */}
            <div className="flex items-center gap-2 mb-2">
              <FaUsers className="text-green-500" />
              <p className={`${theme.text}`}>
                Trip: {review.trip_id?.title?.en || "Unknown Trip"}
              </p>
            </div>

            {/* Date */}
            <div className="flex items-center gap-2 text-xs opacity-70">
              <FaSyncAlt className="text-gray-400 animate-spin-slow" />
              <small>{new Date(review.created_at).toLocaleDateString()}</small>
            </div>
          </motion.div>
        ))
      ) : (
        <p className="opacity-70">No reviews available.</p>
      )}
    </motion.div>
  );
};

export default UserComments;
