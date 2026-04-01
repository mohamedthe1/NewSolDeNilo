import React from "react";
import { FaHeart, FaCommentDots, FaStar } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import { useReviews } from "@/context/ReviewsContext";

const UserActions = ({ user, handleToggle }) => {
  const { theme } = useTheme();
  const { getUserLikes } = useReviews();

  const averageRating =
    Array.isArray(user.reviews) && user.reviews.length > 0
      ? (
          user.reviews.reduce((sum, review) => sum + (review.rating || 0), 0) /
          user.reviews.length
        ).toFixed(1)
      : 0;

  return (
    <div className="flex gap-4 mt-3">
      <button onClick={() => handleToggle(user.id, "likes")} className={theme.buttonDanger}>
        <FaHeart /> {getUserLikes(user.id).reduce((sum, r) => sum + r.likes, 0)} Likes
      </button>
      <button onClick={() => handleToggle(user.id, "comments")} className={theme.buttonSuccess}>
        <FaCommentDots /> {user.reviews?.length || 0} Comments
      </button>
      <div className={theme.buttonWarning}>
        <FaStar className="text-yellow-500" /> {averageRating} / 5 ⭐
      </div>
    </div>
  );
};

export default UserActions;
