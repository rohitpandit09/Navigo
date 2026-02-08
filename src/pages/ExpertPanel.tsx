import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { useAuth } from "../context/AuthContext";

import {
  doc,
  setDoc,
  updateDoc,
  getDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

interface BookingRequest {
  id: string;
  userId: string;
  userName: string;
  expertId: string;
  expertName: string;
  status: "pending" | "accepted" | "rejected";
}

const ExpertPanel = () => {
  const { isAuthenticated, role } = useAuth();

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [location, setLocation] = useState("");
  const [languages, setLanguages] = useState("");
  const [description, setDescription] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [toursCompleted, setToursCompleted] = useState<number>(0);

  const [isOnline, setIsOnline] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔥 Booking Requests
  const [requests, setRequests] = useState<BookingRequest[]>([]);

  // Load existing expert data if already saved
  useEffect(() => {
    const loadExpertData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(db, "experts", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        setName(data.name || "");
        setAvatar(data.avatar || "");
        setLocation(data.location || "");
        setLanguages((data.languages || []).join(", "));
        setDescription(data.description || "");
        setSpecialization(data.specialization || "");
        setToursCompleted(data.toursCompleted || 0);
        setIsOnline(data.isOnline || false);
      }
    };

    loadExpertData();
  }, []);

  // 🔥 Listen to Booking Requests in Real-Time
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, "bookingRequests"),
      where("expertId", "==", user.uid),
      where("status", "==", "pending")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const reqList: BookingRequest[] = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<BookingRequest, "id">),
      }));

      setRequests(reqList);
    });

    return () => unsub();
  }, []);

  if (!isAuthenticated) {
    return <h2 style={{ padding: "40px" }}>Please Login first</h2>;
  }

  if (role !== "expert") {
    return (
      <h2 style={{ padding: "40px" }}>
        Only Experts can access this panel
      </h2>
    );
  }

  const handleSaveProfile = async () => {
    const user = auth.currentUser;
    if (!user) return;

    setLoading(true);

    try {
      await setDoc(doc(db, "experts", user.uid), {
        name,
        avatar,
        location,
        rating: 4.5,
        languages: languages.split(",").map((lang) => lang.trim()),
        description,
        specialization,
        toursCompleted,
        status: "free",
        isOnline: false,
      });

      alert("Expert profile saved successfully!");
      setIsOnline(false);
    } catch (error: any) {
      alert(error.message);
    }

    setLoading(false);
  };

  const handleGoOnline = async () => {
    const user = auth.currentUser;
    if (!user) return;

    setLoading(true);

    try {
      await updateDoc(doc(db, "experts", user.uid), {
        isOnline: true,
        status: "free",
      });

      setIsOnline(true);
      alert("🟢 You are Online now!");
    } catch (error: any) {
      alert(error.message);
    }

    setLoading(false);
  };

  const handleGoOffline = async () => {
    const user = auth.currentUser;
    if (!user) return;

    setLoading(true);

    try {
      await updateDoc(doc(db, "experts", user.uid), {
        isOnline: false,
      });

      setIsOnline(false);
      alert("🔴 You are Offline now!");
    } catch (error: any) {
      alert(error.message);
    }

    setLoading(false);
  };

  // ✅ Accept Booking Request
  const acceptRequest = async (requestId: string) => {
    setLoading(true);

    try {
      await updateDoc(doc(db, "bookingRequests", requestId), {
        status: "accepted",
      });

      alert("✅ Booking Accepted!");
    } catch (error: any) {
      alert(error.message);
    }

    setLoading(false);
  };

  // ❌ Reject Booking Request
  const rejectRequest = async (requestId: string) => {
    setLoading(true);

    try {
      await updateDoc(doc(db, "bookingRequests", requestId), {
        status: "rejected",
      });

      alert("❌ Booking Rejected!");
    } catch (error: any) {
      alert(error.message);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "40px", maxWidth: "700px", margin: "auto" }}>
      <h2 style={{ marginBottom: "20px" }}>🎓 Expert Panel</h2>

      {/* Expert Profile Form */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Avatar Image URL"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />

        <input
          type="text"
          placeholder="Location (Example: Mumbai, Maharashtra)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          type="text"
          placeholder="Languages (Example: Hindi, English)"
          value={languages}
          onChange={(e) => setLanguages(e.target.value)}
        />

        <input
          type="text"
          placeholder="Specialization (Example: Forts, Temples)"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
        />

        <textarea
          placeholder="Description about yourself"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ height: "100px" }}
        />

        <input
          type="number"
          placeholder="Tours Completed"
          value={toursCompleted}
          onChange={(e) => setToursCompleted(Number(e.target.value))}
        />

        <button onClick={handleSaveProfile} disabled={loading}>
          {loading ? "Saving..." : "💾 Save Profile"}
        </button>

        {!isOnline ? (
          <button onClick={handleGoOnline} disabled={loading}>
            {loading ? "Please wait..." : "🟢 Go Online"}
          </button>
        ) : (
          <button onClick={handleGoOffline} disabled={loading}>
            {loading ? "Please wait..." : "🔴 Go Offline"}
          </button>
        )}
      </div>

      {/* 🔥 Booking Requests Section */}
      <div style={{ marginTop: "40px" }}>
        <h3>📩 Booking Requests</h3>

        {requests.length === 0 ? (
          <p style={{ color: "gray" }}>No pending booking requests</p>
        ) : (
          requests.map((req) => (
            <div
              key={req.id}
              style={{
                padding: "15px",
                border: "1px solid #ddd",
                borderRadius: "12px",
                marginTop: "12px",
                background: "#fff",
              }}
            >
              <p style={{ margin: "0 0 8px 0" }}>
                <b>Tourist:</b> {req.userName}
              </p>

              <p style={{ margin: "0 0 12px 0" }}>
                <b>Status:</b> {req.status}
              </p>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => acceptRequest(req.id)}
                  disabled={loading}
                  style={{
                    padding: "8px 14px",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    background: "green",
                    color: "white",
                  }}
                >
                  ✅ Accept
                </button>

                <button
                  onClick={() => rejectRequest(req.id)}
                  disabled={loading}
                  style={{
                    padding: "8px 14px",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    background: "red",
                    color: "white",
                  }}
                >
                  ❌ Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ExpertPanel;
