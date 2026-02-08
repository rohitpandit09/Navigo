import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

interface ArchiveType {
  id: string;
  name: string;
  state: string;
  city: string;
  type: string;
  description: string;
  imageUrl: string;
  mapUrl: string;
  audioUrl: string;
  view360Url: string;
}

const Archives = () => {
  const [archives, setArchives] = useState<ArchiveType[]>([]);

  useEffect(() => {
    const q = query(collection(db, "archives"), orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const list: ArchiveType[] = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<ArchiveType, "id">),
      }));

      setArchives(list);
    });

    return () => unsub();
  }, []);

  return (
    <section style={{ padding: "50px" }} id="archives">
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        🏛️ Archives
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {archives.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              overflow: "hidden",
              background: "#fff",
            }}
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              style={{ width: "100%", height: "180px", objectFit: "cover" }}
            />

            <div style={{ padding: "15px" }}>
              <h3>{item.name}</h3>
              <p style={{ color: "gray" }}>
                📍 {item.city}, {item.state}
              </p>

              <p style={{ fontSize: "14px", marginTop: "8px" }}>
                {item.description}
              </p>

              <p style={{ marginTop: "8px", fontWeight: "bold" }}>
                🏷️ {item.type}
              </p>

              <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
                {item.audioUrl && (
                  <a href={item.audioUrl} target="_blank">
                    🎧 Audio
                  </a>
                )}

                {item.mapUrl && (
                  <a href={item.mapUrl} target="_blank">
                    🗺️ Map
                  </a>
                )}

                {item.view360Url && (
                  <a href={item.view360Url} target="_blank">
                    🌐 360°
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {archives.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "30px", color: "gray" }}>
          No archives added yet.
        </p>
      )}
    </section>
  );
};

export default Archives;
