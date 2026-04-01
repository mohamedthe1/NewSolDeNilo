"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ReviewsContext = createContext();

export function ReviewsProvider({ children }) {
  const [reviewsByTrip, setReviewsByTrip] = useState({});
  const [allReviews, setAllReviews] = useState([]);
  const [likes, setLikes] = useState({});
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // ✅ Fetch current user
  const fetchUser = async () => {
    try {
      const res = await axios.get("/api/auth/me", { withCredentials: true });
      setUser(res.data?.user || null);
    } catch (err) {
      console.error("❌ Error fetching user:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchAllReviews();
  }, []);

  // ✅ Fetch reviews for a specific trip
  const fetchReviewsByTrip = async (tripId) => {
    if (!tripId) return;
    setLoading(true);
    try {
      const res = await axios.get(`/api/reviews?tripId=${tripId}`, { withCredentials: true });
      const data = res.data?.reviews || [];
      setReviewsByTrip((prev) => ({ ...prev, [tripId]: data }));

      // Fetch likes for each review
      data.forEach((review) => review?.id && fetchLikes(review.id));
    } catch (err) {
      console.error("❌ Error fetching reviews:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch all reviews
  const fetchAllReviews = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/reviews`, { withCredentials: true });
      const data = res.data?.reviews || [];
      setAllReviews(data);

      const grouped = {};
      data.forEach((review) => {
        if (review.trip_id) {
          if (!grouped[review.trip_id]) grouped[review.trip_id] = [];
          grouped[review.trip_id].push(review);
          review?.id && fetchLikes(review.id);
        }
      });
      setReviewsByTrip(grouped);
    } catch (err) {
      console.error("❌ Error fetching all reviews:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add new review
  const addReview = async (review) => {
    if (!review.trip_id || !user?.id) return { success: false, error: "Missing trip_id or user.id" };

    try {
      const res = await axios.post(`/api/reviews`, {
        trip_id: review.trip_id,
        user_id: user.id,
        rating: review.rating,
        comment: review.comment,
        name: review.name,
        avatar_url: review.avatar_url,
      }, { withCredentials: true });

      const data = res.data;
      if (data.success) {
        setReviewsByTrip((prev) => ({
          ...prev,
          [review.trip_id]: [...(prev[review.trip_id] || []), data.review],
        }));
      }
      return data;
    } catch (err) {
      console.error("❌ Error adding review:", err.response?.data || err.message);
      return { success: false, error: err.message };
    }
  };

  // ✅ Fetch likes for a review
  const fetchLikes = async (reviewId) => {
    try {
      const res = await axios.get(`/api/reviews/${reviewId}/like`, { withCredentials: true });
      setLikes((prev) => ({
        ...prev,
        [reviewId]: {
          count: res.data?.count || 0,
          users: res.data?.users || [],
        },
      }));
    } catch (err) {
      console.error("❌ Error fetching likes:", err.response?.data || err.message);
    }
  };

  // ✅ Add like
  const addLike = async (reviewId) => {
    if (!reviewId || !user?.id) return;
    if (likes[reviewId]?.users?.includes(user.id)) return;

    try {
      await axios.post(`/api/reviews/${reviewId}/like`, null, { withCredentials: true });
      setLikes((prev) => ({
        ...prev,
        [reviewId]: {
          count: (prev[reviewId]?.count || 0) + 1,
          users: [...(prev[reviewId]?.users || []), user.id],
        },
      }));
    } catch (err) {
      console.error("❌ Error adding like:", err.response?.data || err.message);
    }
  };

  // ✅ Remove like
  const removeLike = async (reviewId) => {
    if (!user?.id) return;
    try {
      await axios.delete(`/api/reviews/${reviewId}/like`, { withCredentials: true });
      setLikes((prev) => ({
        ...prev,
        [reviewId]: {
          count: Math.max((prev[reviewId]?.count || 1) - 1, 0),
          users: (prev[reviewId]?.users || []).filter((id) => id !== user.id),
        },
      }));
    } catch (err) {
      console.error("❌ Error removing like:", err.response?.data || err.message);
    }
  };

  // ✅ Get likes for a specific user
  const getUserLikes = (userId) => {
    if (!userId) return [];
    const userReviews = allReviews.filter((review) => review.user_id === userId);

    return userReviews.map((review) => ({
      reviewId: review.id,
      tripTitle: review.trip?.title?.en || "Unknown Trip",
      comment: review.comment,
      rating: review.rating,
      authorName: review.name,
      likes: likes[review.id]?.count || 0,
      users: likes[review.id]?.users || [],
    }));
  };

  return (
    <ReviewsContext.Provider
      value={{
        reviewsByTrip,
        allReviews,
        likes,
        loading,
        user,
        fetchUser,
        fetchReviewsByTrip,
        fetchAllReviews,
        addReview,
        fetchLikes,
        addLike,
        removeLike,
        getUserLikes,
      }}
    >
      {children}
    </ReviewsContext.Provider>
  );
}

export function useReviews() {
  return useContext(ReviewsContext);
}
