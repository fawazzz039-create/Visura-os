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
  const [windowWidth, setWindowWidth] = useState(1200);

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
      setWindowWidth(width);
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

  // Animated encryption counter - More visible and faster
  const [encryptCounter, setEncryptCounter] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setEncryptCounter(prev => (prev + 1) % 100);
    }, 30); // Faster for more visible animation
    return () => clearInterval(interval);
  }, []);

  // Generate encryption hash characters - updates faster
  const hashChars = "ABCDEF0123456789";
  const [encryptHash, setEncryptHash] = useState("8F3A2C1D");
  
  useEffect(() => {
    const interval = setInterval(() => {
      const newHash = Array(8).fill(0).map(() => hashChars[Math.floor(Math.random() * hashChars.length)]).join("");
      setEncryptHash(newHash);
    }, 80); // Faster updates
    return () => clearInterval(interval);
  }, []);

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
        {/* Mobile Menu Button (Hamburger) */}
        {isMobile && (
          <button
            onClick={() => setSidebarOpen(true)}
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "10px",
              padding: "8px 12px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        )}
        
        {/* ALL DEVICES: Animated Encryption Status with Lens Connection */}
        {true && (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {/* Lens-connected encryption indicator */}
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "12px",
              background: "rgba(0,0,0,0.4)",
              padding: "8px 16px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.1)"
            }}>
              {/* Animated lens indicator */}
              <div style={{ position: "relative", width: "24px", height: "24px" }}>
                <svg viewBox="0 0 24 24" fill="none" style={{ width: "100%", height: "100%" }}>
                  <circle cx="12" cy="12" r="10" stroke="#00d4ff" strokeWidth="1.5" />
                  <circle cx="12" cy="12" r="6" stroke="#00d4ff" strokeWidth="1" opacity="0.6" />
                  <circle cx="12" cy="12" r="3" fill="#00d4ff" opacity="0.8">
                    <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                </svg>
                {/* Pulse ring - fixed CSS */}
                <div style={{
                  position: "absolute",
                  top: "-4px",
                  left: "-4px",
                  right: "-4px",
                  bottom: "-4px",
                  border: "2px solid #00d4ff",
                  borderRadius: "50%",
                  opacity: 0.5,
                  animation: "lensPulse 2s infinite"
                }} />
              </div>
              
              {/* Encryption text with counter */}
              <div style={{ fontFamily: "monospace", fontSize: "12px", letterSpacing: "1px" }}>
                <span style={{ color: "#00d4ff" }}>ENCRYPTION:</span>{" "}
                <span style={{ color: "#fff", fontWeight: 600 }}>AES-256-GCM</span>
              </div>
              
              {/* Animated counter bar - LARGER AND MORE VISIBLE */}
              <div style={{ 
                width: "120px", 
                height: "8px", 
                background: "rgba(255,255,255,0.15)", 
                borderRadius: "4px",
                overflow: "hidden",
                border: "1px solid rgba(0,212,255,0.3)"
              }}>
                <div style={{
                  width: `${encryptCounter}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, #00d4ff, #00ff88, #00d4ff)",
                  backgroundSize: "200% 100%",
                  animation: "encrypt-shimmer 1s linear infinite",
                  transition: "width 0.03s linear"
                }} />
              </div>
              
              {/* Percentage text */}
              <div style={{ 
                fontFamily: "monospace", 
                fontSize: "12px", 
                color: "#00ff88",
                fontWeight: "bold",
                minWidth: "35px"
              }}>
                {encryptCounter}%
              </div>
              
              {/* Hash counter */}
              <div style={{ 
                fontFamily: "monospace", 
                fontSize: "10px", 
                color: "rgba(255,255,255,0.4)",
                direction: "ltr"
              }}>
                #{encryptHash.substring(0, 8)}
              </div>
            </div>
            
            {/* Second row - Protocol status */}
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "8px",
              fontFamily: "monospace",
              fontSize: "10px",
              opacity: 0.5,
              letterSpacing: "1px",
              paddingLeft: "36px"
            }}>
              <span style={{ color: "#00ff88" }}>●</span> SECURE_PROTOCOL: ACTIVE
              <span style={{ marginLeft: "12px", color: "rgba(255,255,255,0.3)" }}>|</span>
              VISURA OS v2.0
            </div>
          </div>
        )}
        
        {/* Clock */}
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

      {/* Sidebar - Pass windowWidth for responsive width */}
      <VisuraSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} windowWidth={windowWidth} isMobile={isMobile} />

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
