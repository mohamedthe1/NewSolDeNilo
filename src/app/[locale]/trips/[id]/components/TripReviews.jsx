"use client";
import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import { useReviews } from "@/context/ReviewsContext";
import { useAuth } from "@/context/AuthContext";
import EgyptianBackground from "@/components/layout/EgyptianBackground";
import ReviewsHeader from "./components/ReviewsHeader";
import StarRating from "./components/StarRating";
import ReviewForm from "./components/ReviewForm";
import ReviewCard from "./components/ReviewCard";

export default function TripReviews({ trip, lang }) {
  const { themeName } = useTheme();
  const {
    reviewsByTrip,
    addReview,
    deleteReview,
    updateReview,
    likes,
    addLike,
    fetchReviewsByTrip,
    removeLike,
  } = useReviews();
  const { user } = useAuth();
  const { t } = useTranslation("tripsId");
  // ✅ استدعاء التعليقات الخاصة بالرحلة عند تحميل الكومبوننت
  useEffect(() => {
    const loadReviews = async () => {
      if (trip?.id) {
        await fetchReviewsByTrip(trip.id);
      }
    };
    loadReviews();
  }, [trip?.id]);

  const translations = {
    en: {
      title: "Reviews & Ratings",
      average: "Average",
      placeholder: "Write your review...",
      submit: "Submit Review",
    },
    de: {
      title: "Bewertungen",
      average: "Durchschnitt",
      placeholder: "Schreibe deine Bewertung...",
      submit: "Bewertung abschicken",
    },
    it: {
      title: "Recensioni e valutazioni",
      average: "Media",
      placeholder: "Scrivi la tua recensione...",
      submit: "Invia recensione",
    },
    es: {
      title: "Reseñas y calificaciones",
      average: "Promedio",
      placeholder: "Escribe tu reseña...",
      submit: "Enviar reseña",
    },
    zh: {
      title: "评论与评分",
      average: "平均",
      placeholder: "写下你的评论...",
      submit: "提交评论",
    },
    fr: {
      title: "Avis et notes",
      average: "Moyenne",
      placeholder: "Écrivez votre avis...",
      submit: "Soumettre l'avis",
    },
  };

  const tr = translations[lang] || translations.en;

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // ✅ الباجينيشن
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 4;

  // ✅ التعليقات الخاصة بالرحلة الحالية فقط
  const tripReviews = reviewsByTrip[trip.id] || [];

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = [...tripReviews]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(indexOfFirstComment, indexOfLastComment);

  const totalPages = Math.ceil(tripReviews.length / commentsPerPage);

  // ✅ دالة إضافة تعليق
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim() || rating === 0 || !user) return;

    await addReview({
      trip_id: trip.id,
      rating,
      comment,
      name: user?.user_metadata?.name || user.email,
      avatar_url: user?.user_metadata?.avatar || null,
      time: new Date().toLocaleTimeString(),
    });

    setComment("");
    setRating(0);
  };

  const averageRating =
    tripReviews.length > 0
      ? (
          tripReviews.reduce((acc, r) => acc + r.rating, 0) / tripReviews.length
        ).toFixed(1)
      : 0;

  const onEmojiClick = (emojiData) => {
    setComment(comment + emojiData.emoji);
  };

  return (
    <section
      className={`p-6 rounded-xl shadow-lg transition ${
        themeName === "dark"
          ? "bg-black/40 text-gold"
          : "bg-white/90 text-[#3a2c0a]"
      }`}
    >
      <EgyptianBackground />

      {/* العنوان + المتوسط */}
      <ReviewsHeader
        title={tr.title}
        averageRating={averageRating}
        reviewsCount={tripReviews.length}
        themeName={themeName}
      />

      {user && (
        <>
          {/* تقييم النجوم */}
          <StarRating
            rating={rating}
            setRating={setRating}
            hover={hover}
            setHover={setHover}
            themeName={themeName}
          />

          {/* نموذج إضافة تعليق */}
          <ReviewForm
            comment={comment}
            setComment={setComment}
            showEmojiPicker={showEmojiPicker}
            setShowEmojiPicker={setShowEmojiPicker}
            onEmojiClick={onEmojiClick}
            onSubmit={handleSubmit}
            placeholder={tr.placeholder}
            submitLabel={tr.submit}
            themeName={themeName}
          />
        </>
      )}

      {/* عرض التعليقات */}
      <div className="flex flex-row flex-wrap mt-6 gap-6 space-y-4">
        <EgyptianBackground />
        {currentComments.map((rev, idx) => (
          <ReviewCard
            key={rev.id || idx}
            tripId={trip.id}
            rev={rev}
            idx={idx}
            user={user}
            deleteReview={deleteReview}
            updateReview={updateReview}
            themeName={themeName}
            likes={likes}
            addLike={addLike}
            removeLike={removeLike}
          />
        ))}
        {tripReviews.length === 0 && (
          <p className="text-center w-full opacity-70">
            {!user
              ? "Please log in to write your review"
              : "Be the first to review this trip ✨"}
          </p>
        )}
      </div>

      {/* الباجينيشن */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            style={{ cursor: "pointer" }}
            className={`px-3 py-1 rounded-lg font-semibold transition ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : themeName === "dark"
                  ? "bg-[#c9a34a] text-black hover:bg-yellow-300"
                  : "bg-[#c9a34a] text-white hover:bg-[#a67c00]"
            }`}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              style={{ cursor: "pointer" }}
              className={`px-3 py-1 rounded-lg font-semibold transition text-black ${
                currentPage === i + 1
                  ? themeName === "dark"
                    ? "bg-[#c9a34a] text-black"
                    : "bg-[#c9a34a] text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            style={{ cursor: "pointer" }}
            className={`px-3 py-1 rounded-lg font-semibold transition ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : themeName === "dark"
                  ? "bg-[#c9a34a] text-black hover:bg-yellow-300"
                  : "bg-[#c9a34a] text-white hover:bg-[#a67c00]"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}
