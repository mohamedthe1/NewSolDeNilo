import React from "react";
import { useReviews } from "@/context/ReviewsContext";
import { useUsers } from "../../context/UserContext";
import { useTheme } from "@/context/ThemeContext";
import { FaStar, FaCommentDots, FaUsers, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";

const UserLikes = ({ user }) => {
  const { getUserLikes } = useReviews();
  const { users } = useUsers();
  const { theme } = useTheme();
  const likesData = getUserLikes(user.id);

  const getUserName = (userId) => {
    const found = users.find((u) => u.id === userId);
    return found ? found.name : userId;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
        👍 All likes for <span className="text-[#c9a34a] capitalize">{user.name}</span>
      </h3>

      {likesData.length > 0 ? (
        likesData.map((likeInfo, index) => (
          <motion.div
            key={likeInfo.reviewId}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={`p-5 mb-5 rounded-lg shadow-lg border ${theme.cardSecondary} hover:scale-[1.02] transition-transform duration-300`}
          >
            {/* Trip title */}
            <div className="flex items-center gap-2 mb-2">
              <FaUsers className="text-green-500" />
              <p className={`${theme.text} font-medium`}>
                Trip:{" "}
                {user.reviews.find((r) => r.id === likeInfo.reviewId)?.trip_id
                  ?.title?.en || "Unknown Trip"}
              </p>
            </div>

            {/* Review author */}
            <div className="flex items-center gap-2 mb-2 capitalize">
              <FaUsers className="text-purple-500" />
              <p className={`${theme.text}`}>Author: {likeInfo.authorName}</p>
            </div>

            {/* Comment content */}
            <div className="flex items-center gap-2 mb-2">
              <FaCommentDots className="text-blue-500" />
              <p className={`${theme.text} italic`}>
                “{likeInfo.comment}”
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-2">
              <FaStar className="text-yellow-500" />
              <p className={`${theme.textAccent}`}>
                Rating: {likeInfo.rating} / 5
              </p>
            </div>

            {/* Likes count */}
            <div className="flex items-center gap-2 mb-2">
              <FaHeart className="text-red-500 animate-pulse" />
              <p className={`${theme.textAccent}`}>Likes: {likeInfo.likes}</p>
            </div>

            {/* Users who liked */}
            {likeInfo.users.length > 0 ? (
              <div className="mt-3">
                <p className="font-semibold">Users who liked:</p>
                <ul className="ml-6 list-disc space-y-1">
                  {likeInfo.users.map((u) => (
                    <li
                      key={u}
                      className={`${theme.text} capitalize hover:text-[#c9a34a] transition-colors`}
                    >
                      {getUserName(u)}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="opacity-70">No likes yet.</p>
            )}
          </motion.div>
        ))
      ) : (
        <p className="opacity-70">No likes available for this user.</p>
      )}
    </motion.div>
  );
};

export default UserLikes;
