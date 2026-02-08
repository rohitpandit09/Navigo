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

  const [selectedArchive, setSelectedArchive] = useState<ArchiveType | null>(
    null
  );

  const [modalType, setModalType] = useState<
    "map" | "audio" | "view360" | null
  >(null);

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

  const closeModal = () => {
    setSelectedArchive(null);
    setModalType(null);
  };

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
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
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
                {item.description.length > 60
                  ? item.description.slice(0, 60) + "..."
                  : item.description}
              </p>

              <p style={{ marginTop: "8px", fontWeight: "bold" }}>
                🏷️ {item.type}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "15px",
                  flexWrap: "wrap",
                }}
              >
                <button
                  style={{
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "none",
                    background: "#111",
                    color: "white",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setSelectedArchive(item);
                    setModalType("audio");
                  }}
                >
                  🎧 Audio
                </button>

                <button
                  style={{
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "none",
                    background: "#111",
                    color: "white",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setSelectedArchive(item);
                    setModalType("map");
                  }}
                >
                  🗺️ Map
                </button>

                <button
                  style={{
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "none",
                    background: "#111",
                    color: "white",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setSelectedArchive(item);
                    setModalType("view360");
                  }}
                >
                  🌐 360°
                </button>
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

      {/* ✅ MODAL POPUP */}
      {selectedArchive && modalType && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "100vw",
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "800px",
              background: "white",
              borderRadius: "12px",
              overflow: "hidden",
              padding: "20px",
              position: "relative",
            }}
          >
            <button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                border: "none",
                background: "red",
                color: "white",
                padding: "6px 12px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              ✖ Close
            </button>

            <h2 style={{ marginBottom: "10px" }}>{selectedArchive.name}</h2>

            {/* MAP MODAL */}
            {modalType === "map" && (
              <>
                <h3>🗺️ Location Map</h3>
                {selectedArchive.mapUrl ? (
                  <iframe
                    src={selectedArchive.mapUrl}
                    width="100%"
                    height="400"
                    style={{ border: "none", marginTop: "15px" }}
                    loading="lazy"
                  ></iframe>
                ) : (
                  <p>No Map URL available</p>
                )}
              </>
            )}

            {/* AUDIO MODAL */}
            {modalType === "audio" && (
              <>
                <h3>🎧 Audio Description</h3>
                {selectedArchive.audioUrl ? (
                  <audio
                    controls
                    style={{ width: "100%", marginTop: "20px" }}
                  >
                    <source src={selectedArchive.audioUrl} />
                    Your browser does not support audio.
                  </audio>
                ) : (
                  <p>No Audio available</p>
                )}
              </>
            )}

            {/* 360 VIEW MODAL */}
            {modalType === "view360" && (
              <>
                <h3>🌐 360 View</h3>
                {selectedArchive.view360Url ? (
                  <iframe
                    src={selectedArchive.view360Url}
                    width="100%"
                    height="400"
                    style={{ border: "none", marginTop: "15px" }}
                    loading="lazy"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <p>No 360 view available</p>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Archives;
