"use client";

import { useState, useEffect } from "react";
import { AuthProvider } from "@/lib/auth-context";
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
import AuthModal from "./AuthModal";
import PaymentModal from "./PaymentModal";

export type ModalType = "camera" | "photoGallery" | "artGallery" | "ai" | "canvas" | "tracking" | "auth" | null;

export interface PaymentItem {
  id: string;
  title: string;
  artist: string;
  price: number;
  image: string;
  type: "photo" | "art";
}

function VisuraAppContent() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [paymentItem, setPaymentItem] = useState<PaymentItem | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

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

  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsTablet(width >= 640 && width < 1024);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const openModal = (modal: ModalType) => setActiveModal(modal);
  const closeModal = () => setActiveModal(null);

  const handleBuy = (item: PaymentItem) => {
    setPaymentItem(item);
    setActiveModal("auth");
  };

  const handlePaymentComplete = () => {
    console.log("Payment completed for:", paymentItem?.title);
  };

  // Dynamic styles based on device
  const headerPadding = isMobile ? "20px 20px" : isTablet ? "25px 35px" : "30px 50px";
  const clockSize = isMobile ? 36 : isTablet ? 44 : 52;
  const logoScale = isMobile ? 0.75 : isTablet ? 0.85 : 1;

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

      {/* Top Header - Responsive */}
      <div
        style={{
          position: "absolute",
          top: 0,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          padding: headerPadding,
          boxSizing: "border-box",
          zIndex: 1500,
        }}
      >
        <div
          style={{
            fontFamily: "monospace",
            fontSize: isMobile ? "9px" : "11px",
            opacity: 0.5,
            letterSpacing: "1px",
            lineHeight: "1.8",
          }}
        >
          <div>SECURE_PROTOCOL: ACTIVE</div>
          <div>ENCRYPTION: AES-256-GCM</div>
          {!isMobile && <div style={{ color: "rgba(255,255,255,0.3)" }}>VISURA OS v2.0</div>}
        </div>
        <div
          style={{
            fontSize: clockSize,
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

      {/* Center Logo - Responsive */}
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 100,
          padding: isMobile ? "0 20px" : "0",
        }}
      >
        <div style={{ transform: `scale(${logoScale})`, transformOrigin: "center" }}>
          <VisuraLogo onClick={() => setSidebarOpen(true)} />
        </div>
      </div>

      {/* Dock - Mobile optimized */}
      <VisuraDock
        activeModal={activeModal}
        onOpenModal={openModal}
        onHome={() => {
          closeModal();
          setSidebarOpen(false);
        }}
        isMobile={isMobile}
      />

      {/* Music Player - Hide on mobile to save space */}
      {!isMobile && <MusicPlayer />}

      {/* Modals - All responsive */}
      <CameraModal isOpen={activeModal === "camera"} onClose={closeModal} />
      <PhotoGalleryModal 
        isOpen={activeModal === "photoGallery"} 
        onClose={closeModal}
        onBuy={handleBuy}
      />
      <ArtGalleryModal 
        isOpen={activeModal === "artGallery"} 
        onClose={closeModal}
        onBuy={handleBuy}
      />
      <AIModal isOpen={activeModal === "ai"} onClose={closeModal} />
      <CanvasModal isOpen={activeModal === "canvas"} onClose={closeModal} />
      <TrackingModal isOpen={activeModal === "tracking"} onClose={closeModal} />
      <AuthModal isOpen={activeModal === "auth"} onClose={closeModal} />
      <PaymentModal 
        isOpen={!!paymentItem && activeModal !== "auth"} 
        onClose={() => setPaymentItem(null)}
        item={paymentItem}
        onPaymentComplete={handlePaymentComplete}
      />
    </div>
  );
}

export default function VisuraApp() {
  return (
    <AuthProvider>
      <VisuraAppContent />
    </AuthProvider>
  );
}
