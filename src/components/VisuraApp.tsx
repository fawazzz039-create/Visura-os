"use client";

import { useState, useEffect } from "react";
import VisuraLogo from "./VisuraLogo";
import VisuraDock from "./VisuraDock";
import VisuraSidebar from "./VisuraSidebar";
import CameraModal from "./CameraModal";
import PhotoGalleryModal from "./PhotoGalleryModal";
import ArtGalleryModal from "./ArtGalleryModal";
import AIModal from "./AIModal";
import CanvasModal from "./CanvasModal";
import TrackingModal from "./TrackingModal";
import MusicPlayer from "./MusicPlayer";

export type ModalType = "camera" | "photoGallery" | "artGallery" | "ai" | "canvas" | "tracking" | null;

export default function VisuraApp() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      const h = String(d.getHours()).padStart(2, "0");
      const m = String(d.getMinutes()).padStart(2, "0");
      setCurrentTime(`${h}:${m}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const openModal = (modal: ModalType) => setActiveModal(modal);
  const closeModal = () => setActiveModal(null);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "var(--bg-black)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Background subtle grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.02) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.02) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />

      {/* Top Header */}
      <div
        style={{
          position: "absolute",
          top: 0,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          padding: "30px 50px",
          boxSizing: "border-box",
          zIndex: 1500,
        }}
      >
        <div
          style={{
            fontFamily: "monospace",
            fontSize: "11px",
            opacity: 0.5,
            letterSpacing: "1px",
            lineHeight: "1.8",
          }}
        >
          <div>SECURE_PROTOCOL: ACTIVE</div>
          <div>ENCRYPTION: AES-256-GCM</div>
          <div style={{ color: "rgba(255,255,255,0.3)" }}>VISURA OS v2.0</div>
        </div>
        <div
          style={{
            fontSize: "52px",
            fontWeight: 200,
            letterSpacing: "-2px",
            lineHeight: 1,
            opacity: 0.9,
          }}
        >
          {currentTime}
        </div>
      </div>

      {/* Sidebar */}
      <VisuraSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Center Logo */}
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 100,
        }}
      >
        <VisuraLogo onClick={() => setSidebarOpen(true)} />
      </div>

      {/* Dock */}
      <VisuraDock
        activeModal={activeModal}
        onOpenModal={openModal}
        onHome={() => {
          closeModal();
          setSidebarOpen(false);
        }}
      />

      {/* Music Player */}
      <MusicPlayer />

      {/* Modals */}
      <CameraModal isOpen={activeModal === "camera"} onClose={closeModal} />
      <PhotoGalleryModal isOpen={activeModal === "photoGallery"} onClose={closeModal} />
      <ArtGalleryModal isOpen={activeModal === "artGallery"} onClose={closeModal} />
      <AIModal isOpen={activeModal === "ai"} onClose={closeModal} />
      <CanvasModal isOpen={activeModal === "canvas"} onClose={closeModal} />
      <TrackingModal isOpen={activeModal === "tracking"} onClose={closeModal} />
    </div>
  );
}
