import React, { useState, useEffect, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { auth, db } from "../firebase/firebaseConfig";

import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";

const states = [
  "All States",
  "Maharashtra",
  "Delhi",
  "Rajasthan",
  "Goa",
  "Gujarat",
  "Karnataka",
  "Tamil Nadu",
  "Uttar Pradesh",
  "West Bengal",
  "Madhya Pradesh",
];

interface EventType {
  id: string;
  name: string;
  description: string;
  location: string;
  state: string;
  date: Date;
  images: string[];
  timeline: string;
  createdByName: string;
}

const Events: React.FC = () => {
  const { isAuthenticated, userName } = useAuth();

  const [events, setEvents] = useState<EventType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("All States");
  const [showAddForm, setShowAddForm] = useState(false);

  const [currentImageIndex, setCurrentImageIndex] = useState<{
    [key: string]: number;
  }>({});

  const [newEvent, setNewEvent] = useState({
    name: "",
    description: "",
    location: "",
    state: "Maharashtra",
    date: "",
    images: "",
    timeline: "",
  });

  // ✅ FETCH EVENTS FROM FIRESTORE (REAL DATA)
  useEffect(() => {
  const q = query(collection(db, "events"), orderBy("date", "desc"));

  const unsub = onSnapshot(q, (snapshot) => {
    const eventList: EventType[] = snapshot.docs.map((docSnap) => {
      const data = docSnap.data();

      return {
        id: docSnap.id,
        name: data.name || "",
        description: data.description || "",
        location: data.location || "",
        state: data.state || "",
        date: data.date instanceof Timestamp ? data.date.toDate() : new Date(),
        images: data.images || [],
        timeline: data.timeline || "",
        createdByName: data.createdByName || "Anonymous",
      };
    });

    setEvents(eventList);
  });

  return () => unsub();
}, []);


  // ✅ IMAGE SLIDESHOW FOR EVENTS
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => {
        const updated = { ...prev };

        events.forEach((event) => {
          if (event.images.length > 1) {
            updated[event.id] =
              ((prev[event.id] || 0) + 1) % event.images.length;
          }
        });

        return updated;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [events]);

  // ✅ FILTER EVENTS
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchState =
        selectedState === "All States" || event.state === selectedState;

      const matchSearch =
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase());

      return matchState && matchSearch;
    });
  }, [events, selectedState, searchQuery]);

  // ✅ ADD EVENT TO FIRESTORE
  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert("Please login to add an event!");
      return;
    }

    try {
      const eventDate = new Date(newEvent.date);

      const imageUrls = newEvent.images
        .split(",")
        .map((url) => url.trim())
        .filter(Boolean);

      if (imageUrls.length === 0) {
        imageUrls.push(
          "https://images.unsplash.com/photo-1545987796-200677ee1011?w=800&q=80"
        );
      }

      const user = auth.currentUser;

      await addDoc(collection(db, "events"), {
        name: newEvent.name,
        description: newEvent.description,
        location: newEvent.location,
        state: newEvent.state,
        date: Timestamp.fromDate(eventDate),
        images: imageUrls,
        timeline: newEvent.timeline,
        createdBy: user?.uid,
        createdByName: userName || "User",
        createdAt: serverTimestamp(),
      });

      alert("✅ Event Added Successfully!");

      setNewEvent({
        name: "",
        description: "",
        location: "",
        state: "Maharashtra",
        date: "",
        images: "",
        timeline: "",
      });

      setShowAddForm(false);
    } catch (error: any) {
      alert("❌ Failed to add event: " + error.message);
    }
  };

  return (
    <section className="section section--white" id="events">
      <div className="container">
        <div className="section__header">
          <p className="section__subtitle">Cultural Calendar</p>
          <h2 className="section__title">Events & Festivals</h2>
          <p className="section__description">
            Events posted by real users and guides in real-time.
          </p>
        </div>

        {/* SEARCH + FILTER + ADD BUTTON */}
        <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
            justifyContent: "space-between",
            marginBottom: "25px",
          }}
        >
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              flex: 1,
              minWidth: "200px",
            }}
          />

          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          >
            {states.map((state) => (
              <option key={state}>{state}</option>
            ))}
          </select>

          {isAuthenticated && (
            <button
              className="btn btn--primary"
              onClick={() => setShowAddForm(true)}
            >
              ➕ Add Event
            </button>
          )}
        </div>

        {/* ADD EVENT FORM MODAL */}
        {showAddForm && (
          <div
            className="modal-overlay modal-overlay--open"
            onClick={() => setShowAddForm(false)}
          >
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal__header">
                <h3 className="modal__title">Add New Event</h3>
                <button
                  className="modal__close"
                  onClick={() => setShowAddForm(false)}
                >
                  ×
                </button>
              </div>

              <div className="modal__body">
                <form onSubmit={handleAddEvent}>
                  <div className="form-group">
                    <label className="form-label">Event Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={newEvent.name}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-input form-textarea"
                      value={newEvent.description}
                      onChange={(e) =>
                        setNewEvent({
                          ...newEvent,
                          description: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Location</label>
                    <input
                      type="text"
                      className="form-input"
                      value={newEvent.location}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, location: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">State</label>
                    <select
                      className="form-input"
                      value={newEvent.state}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, state: e.target.value })
                      }
                    >
                      {states
                        .filter((s) => s !== "All States")
                        .map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Event Date</label>
                    <input
                      type="date"
                      className="form-input"
                      value={newEvent.date}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, date: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Images (comma separated URLs)
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="https://img1 , https://img2"
                      value={newEvent.images}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, images: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Event Timeline</label>
                    <textarea
                      className="form-input form-textarea"
                      placeholder="10AM - Entry, 2PM - Dance, 6PM - Closing"
                      value={newEvent.timeline}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, timeline: e.target.value })
                      }
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn--primary"
                    style={{ width: "100%" }}
                  >
                    Add Event
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* EVENTS CARDS */}
        <div className="grid grid--3">
          {filteredEvents.map((event) => (
            <div key={event.id} className="card event-card">
              <div style={{ position: "relative", height: "200px" }}>
                {event.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="event"
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      opacity:
                        (currentImageIndex[event.id] || 0) === idx ? 1 : 0,
                      transition: "opacity 0.8s ease",
                    }}
                  />
                ))}
              </div>

              <div className="card__content">
                <h4 className="card__title">{event.name}</h4>

                <p style={{ fontSize: "0.9rem", color: "gray" }}>
                  📍 {event.location}, {event.state}
                </p>

                <p style={{ marginTop: "10px" }}>
                  {event.description.slice(0, 100)}...
                </p>

                <p style={{ marginTop: "10px", fontSize: "0.85rem" }}>
                  🕒 {event.timeline.slice(0, 80)}...
                </p>

                <p style={{ marginTop: "10px", fontSize: "0.85rem", color: "gray" }}>
                  Posted by: <b>{event.createdByName}</b>
                </p>

                <p style={{ marginTop: "5px", fontSize: "0.85rem", color: "gray" }}>
                  Date: {event.date.toDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px", color: "gray" }}>
            <h3>No Events Found</h3>
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;
