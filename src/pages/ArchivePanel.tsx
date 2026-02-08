import React, { useState } from "react";
import { db, storage } from "../firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ArchivePanel = () => {
  const [name, setName] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("Monument");
  const [description, setDescription] = useState("");
  const [mapUrl, setMapUrl] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [view360Url, setView360Url] = useState("");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!imageFile) {
      alert("Please select an image");
      return;
    }

    if (!name || !state || !city) {
      alert("Please fill name, state and city");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Upload image to Firebase Storage
      const storageRef = ref(storage, `archives/${Date.now()}-${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);

      // 2️⃣ Get image URL
      const imageUrl = await getDownloadURL(storageRef);

      // 3️⃣ Save data in Firestore
      await addDoc(collection(db, "archives"), {
        name,
        state,
        city,
        type,
        description,
        imageUrl,
        mapUrl,
        audioUrl,
        view360Url,
        createdAt: serverTimestamp(),
      });

      alert("✅ Archive Added Successfully!");

      // Reset Form
      setName("");
      setState("");
      setCity("");
      setType("Monument");
      setDescription("");
      setMapUrl("");
      setAudioUrl("");
      setView360Url("");
      setImageFile(null);
    } catch (error: any) {
      alert("❌ Error: " + error.message);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "40px", maxWidth: "700px", margin: "auto" }}>
      <h2>🏛️ Archive Panel (Add Monument)</h2>

      <input
        type="text"
        placeholder="Monument Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%", padding: "10px", marginTop: "10px" }}
      />

      <input
        type="text"
        placeholder="State (Example: Maharashtra)"
        value={state}
        onChange={(e) => setState(e.target.value)}
        style={{ width: "100%", padding: "10px", marginTop: "10px" }}
      />

      <input
        type="text"
        placeholder="City (Example: Pune)"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ width: "100%", padding: "10px", marginTop: "10px" }}
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        style={{ width: "100%", padding: "10px", marginTop: "10px" }}
      >
        <option value="Monument">Monument</option>
        <option value="Temple">Temple</option>
        <option value="Fort">Fort</option>
        <option value="Heritage">Heritage</option>
      </select>

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ width: "100%", padding: "10px", marginTop: "10px", height: "80px" }}
      />

      <input
        type="text"
        placeholder="Google Map URL"
        value={mapUrl}
        onChange={(e) => setMapUrl(e.target.value)}
        style={{ width: "100%", padding: "10px", marginTop: "10px" }}
      />

      <input
        type="text"
        placeholder="Audio URL (optional)"
        value={audioUrl}
        onChange={(e) => setAudioUrl(e.target.value)}
        style={{ width: "100%", padding: "10px", marginTop: "10px" }}
      />

      <input
        type="text"
        placeholder="360 View URL (optional)"
        value={view360Url}
        onChange={(e) => setView360Url(e.target.value)}
        style={{ width: "100%", padding: "10px", marginTop: "10px" }}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        style={{ width: "100%", marginTop: "15px" }}
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "20px",
          background: "black",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        {loading ? "Uploading..." : "📤 Upload Archive"}
      </button>
    </div>
  );
};

export default ArchivePanel;
