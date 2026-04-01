"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext"; // ✅ استدعاء المستخدم من useAuth
import { supabase } from "@/lib/supabaseClient"; // ملف تهيئة Supabase
import { toast } from "react-toastify";

const ReviewsContext = createContext();

export function ReviewsProvider({ children }) {
  const { user } = useAuth(); // ✅ جلب المستخدم من AuthContext
  const [reviewsByTrip, setReviewsByTrip] = useState({});
  const [allReviews, setAllReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [likes, setLikes] = useState({});

  // ✅ جلب التعليقات الخاصة برحلة معينة
  const fetchReviewsByTrip = async (tripId) => {
    console.log(tripId);
    if (!tripId) {
      console.log("⚠️ No tripId provided to fetchReviewsByTrip");
      return;
    }
    setLoading(true);
    try {
      console.log("➡️ Fetching reviews for trip:", tripId);
      const res = await axios.get(`/api/reviews?tripId=${tripId}`, {
        withCredentials: true,
      });
      console.log("📥 Raw response from API:", res.data);

      const data = res.data?.reviews || [];
      console.log("📦 Extracted reviews array:", data);

      const filtered = data.filter((review) => review.trip_id === tripId);
      console.log("✅ Filtered reviews for trip:", tripId, filtered);

      setReviewsByTrip((prev) => ({ ...prev, [tripId]: filtered }));

      filtered.forEach((review) => {
        if (review?.id) {
          console.log("➡️ Fetching likes for review:", review.id);
          fetchLikes(review.id);
        }
      });
    } catch (err) {
      console.error("❌ Error fetching reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ جلب جميع التعليقات
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

          if (review?.id) fetchLikes(review.id);
        }
      });
      setReviewsByTrip(grouped);
    } catch (err) {
      console.error("❌ Error fetching all reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllReviews();
  }, []);

  // ✅ إضافة تعليق جديد
  const addReview = async (review) => {
    if (!review.trip_id || !user?.id) {
      console.log("⚠️ Missing trip_id or user.id in addReview:", review, user);
      return { success: false, error: "No user or trip ID" };
    }

    try {
      const res = await axios.post(
        `/api/reviews`,
        {
          trip_id: review.trip_id,
          user_id: user.id, // ✅ من useAuth
          rating: review.rating,
          comment: review.comment,
          name: user.name || user.email, // ✅ fallback على الإيميل لو الاسم مش موجود
          avatar_url: user.avatar,
          time: review.time,
        },
        { withCredentials: true },
      );

      const data = res.data;
      if (data.success) {
        console.log("✅ Review successfully saved in DB:", data.review);
        setReviewsByTrip((prev) => ({
          ...prev,
          [review.trip_id]: [...(prev[review.trip_id] || []), data.review],
        }));
      } else {
        console.log("⚠️ API returned failure:", data);
      }
      return data;
    } catch (err) {
      console.error("❌ Error adding review:", err);
      return { success: false, error: err.message };
    }
  };

  // ✅ جلب اللايكات
  const fetchLikes = async (reviewId) => {
    try {
      const res = await axios.get(`/api/reviews/${reviewId}/like`, {
        withCredentials: true,
      });
      setLikes((prev) => ({
        ...prev,
        [reviewId]: {
          count: res.data?.count || 0,
          users: res.data?.users || [],
        },
      }));
    } catch (err) {
      console.error("❌ Error fetching likes:", err);
    }
  };

  // ✅ إضافة لايك
  const addLike = async ({ reviewId }) => {
    // ✅ تحقق من القيم الأساسية
    if (!reviewId || !user?.id) {
      console.log("⚠️ Missing reviewId, tripId or user.id");
      return;
    }

    try {
      // ✅ إرسال الطلب للـ API مع البيانات المطلوبة
      const res = await axios.post(`/api/reviews/${reviewId}/like`, {
        user_id: user.id, // يجي من الـ frontend (المستخدم الحالي)
        reviewId: reviewId,
      });

      console.log("📥 Raw response from API:", res.data);

      // ✅ تحديث الحالة في الـ frontend لو العملية نجحت
      if (!res.data?.error) {
        console.log("✅ Like added successfully in client state");
        setLikes((prev) => ({
          ...prev,
          [reviewId]: {
            count: (prev[reviewId]?.count || 0) + 1,
            users: [...(prev[reviewId]?.users || []), user.id],
          },
        }));
      }
    } catch (err) {
      console.error("❌ Error adding like:", err);
      toast.error("❌ Error adding like: " + err.message);
    }
  };

  // ✅ إزالة لايك
  const removeLike = async ({ reviewId }) => {
    if (!reviewId || !user?.id) {
      console.log("⚠️ Missing reviewId, tripId or user.id");
      return;
    }

    try {
      console.log(
        "➡️ Sending DELETE request to API:",
        `/api/reviews/${reviewId}/like`,
      );

      const res = await axios.delete(`/api/reviews/${reviewId}/like`, {
        data: {
          user_id: user.id,
          reviewId: reviewId,
        },
      });

      console.log("📥 Raw response from API:", res.data);

      if (!res.data?.error) {
        console.log("✅ Like removed successfully in client state");
        setLikes((prev) => ({
          ...prev,
          [reviewId]: {
            count: Math.max((prev[reviewId]?.count || 1) - 1, 0),
            users: (prev[reviewId]?.users || []).filter((id) => id !== user.id),
          },
        }));
      }
    } catch (err) {
      console.error("❌ Error removing like:", err);
      toast.error("❌ Error removing like: " + err.message);
    }
  };

  // ✅ جلب لايكات المستخدم
  const getUserLikes = (userId) => {
    if (!userId) return [];

    const userReviews = allReviews.filter(
      (review) => review.user_id === userId,
    );

    return userReviews.map((review) => ({
      reviewId: review.id,
      tripId: review.trip_id,
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
        loading,
        user,
        likes,
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
