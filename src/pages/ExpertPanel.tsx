import React, { useEffect, useState } from "react";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";
import { useAuth } from "../context/AuthContext";

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

  if (!isAuthenticated) {
    return <h2 style={{ padding: "40px" }}>Please Login first</h2>;
  }

  if (role !== "expert") {
    return <h2 style={{ padding: "40px" }}>Only Experts can access this panel</h2>;
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
        rating: 4.5, // default rating
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
      alert("You are Online now!");
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
      alert("You are Offline now!");
    } catch (error: any) {
      alert(error.message);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "40px", maxWidth: "700px", margin: "auto" }}>
      <h2 style={{ marginBottom: "20px" }}>🎓 Expert Panel</h2>

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
    </div>
  );
};

export default ExpertPanel;
