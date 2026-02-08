import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { Expert } from "../types/expert";

import {
  collection,
  onSnapshot,
  query,
  where,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db, auth } from "../firebase/firebaseConfig";

interface ExpertsProps {
  onBookingRequest: (expert: Expert) => void;
}

const Experts: React.FC<ExpertsProps> = ({ onBookingRequest }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [experts, setExperts] = useState<Expert[]>([]);

  const { isAuthenticated, bookedExpertId, userName, bookExpert } = useAuth();

  const slidesPerView = 3;
  const maxSlide = Math.max(0, experts.length - slidesPerView);

  // 🔥 Fetch Experts from Firestore (Only Online Experts)
  useEffect(() => {
    const q = query(collection(db, "experts"), where("isOnline", "==", true));

    const unsub = onSnapshot(q, (snapshot) => {
      const expertsList: Expert[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Expert, "id">),
      }));

      setExperts(expertsList);
    });

    return () => unsub();
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
  }, [maxSlide]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  // ✅ Send Booking Request to Firestore
  const sendBookingRequest = async (expert: Expert) => {
    const user = auth.currentUser;

    if (!user) {
      alert("Please login first");
      return;
    }

    try {
      await addDoc(collection(db, "bookingRequests"), {
        userId: user.uid,
        userName: userName,
        expertId: expert.id,
        expertName: expert.name,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      // optional: mark locally booked
      bookExpert(expert.id);

      alert("✅ Booking request sent successfully!");
    } catch (error: any) {
      alert("❌ Failed to send booking request: " + error.message);
    }
  };

  const handleBook = (expert: Expert) => {
    if (!isAuthenticated) {
      alert("Please sign in to book an expert");
      return;
    }

    // If you still want to use your old booking popup logic
    // you can keep this:
    onBookingRequest(expert);

    // 🔥 This sends real booking request to Firestore
    sendBookingRequest(expert);
  };

  const renderStars = (rating: number) => {
    return "⭐".repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? "½" : "");
  };

  return (
    <section className="section section--cream" id="experts">
      <div className="container">
        <div className="section__header">
          <p className="section__subtitle">Expert Guides</p>
          <h2 className="section__title">Meet Our Heritage Experts</h2>
          <p className="section__description">
            Connect with knowledgeable local guides who bring history to life
          </p>
        </div>

        {experts.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            😔 No experts are online right now
          </p>
        ) : (
          <>
            <div className="carousel">
              <div
                className="carousel__track"
                style={{
                  transform: `translateX(-${
                    currentSlide * (100 / slidesPerView)
                  }%)`,
                }}
              >
                {experts.map((expert) => (
                  <div
                    key={expert.id}
                    className="carousel__slide carousel__slide--third"
                  >
                    <div className="card expert-card">
                      <img
                        src={expert.avatar}
                        alt={expert.name}
                        className="expert-card__avatar"
                        loading="lazy"
                      />

                      <div
                        className={`expert-card__status expert-card__status--${expert.status}`}
                      >
                        <span className="expert-card__status-dot"></span>
                        {expert.status === "free" ? "Available" : "Busy"}
                      </div>

                      <h4 className="card__title">{expert.name}</h4>

                      <p
                        className="card__subtitle"
                        style={{ justifyContent: "center" }}
                      >
                        📍 {expert.location}
                      </p>

                      <div className="expert-card__rating">
                        {renderStars(expert.rating)} {expert.rating}
                      </div>

                      <div className="expert-card__languages">
                        {expert.languages.map((lang) => (
                          <span key={lang} className="expert-card__language">
                            {lang}
                          </span>
                        ))}
                      </div>

                      <p className="expert-card__description">
                        {expert.description}
                      </p>

                      <p
                        style={{
                          fontSize: "0.85rem",
                          color: "var(--color-primary)",
                          fontWeight: 600,
                          marginBottom: "var(--spacing-md)",
                        }}
                      >
                        🎯 {expert.specialization} • {expert.toursCompleted}+ tours
                      </p>

                      <div className="expert-card__actions">
                        <button
                          className={`btn ${
                            expert.status === "free"
                              ? "btn--primary"
                              : "btn--outline-dark"
                          } btn--sm`}
                          onClick={() => handleBook(expert)}
                          disabled={expert.status === "busy"}
                        >
                          {bookedExpertId === expert.id
                            ? "✓ Requested"
                            : "Book Expert"}
                        </button>

                        <button
                          className="btn btn--ghost btn--sm"
                          disabled={bookedExpertId !== expert.id}
                          style={{
                            opacity: bookedExpertId === expert.id ? 1 : 0.5,
                          }}
                        >
                          💬 Chat
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="carousel__controls">
              <button
                className="carousel__btn"
                onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
                disabled={currentSlide === 0}
              >
                ←
              </button>

              <button
                className="carousel__btn"
                onClick={() =>
                  setCurrentSlide((prev) => Math.min(maxSlide, prev + 1))
                }
                disabled={currentSlide === maxSlide}
              >
                →
              </button>
            </div>

            <div className="carousel__indicators">
              {Array.from({ length: maxSlide + 1 }).map((_, index) => (
                <button
                  key={index}
                  className={`carousel__indicator ${
                    currentSlide === index ? "carousel__indicator--active" : ""
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Experts;
