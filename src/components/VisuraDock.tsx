"use client";

import { useState } from "react";
import type { ModalType } from "./VisuraApp";
import { useAuth } from "@/lib/auth-context";

interface DockItem {
  id: ModalType | "home";
  label: string;
  labelAr: string;
  icon: React.ReactNode;
}

interface VisuraDockProps {
  activeModal: ModalType;
  onOpenModal: (modal: ModalType) => void;
  onHome: () => void;
  isMobile?: boolean;
}

function HomeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function PhotoGalleryIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

function CameraIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function AIIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <line x1="9" y1="10" x2="9" y2="10" strokeWidth="2.5" />
      <line x1="12" y1="10" x2="12" y2="10" strokeWidth="2.5" />
      <line x1="15" y1="10" x2="15" y2="10" strokeWidth="2.5" />
    </svg>
  );
}

function ArtGalleryIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  );
}

function CanvasIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 13.5V19a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.5" />
      <path d="M12 3v12" />
      <path d="M8 7l4-4 4 4" />
      <path d="M6 17h12" />
    </svg>
  );
}

function TrackingIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" rx="1" />
      <path d="M16 8h4l3 3v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

function UserIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export default function VisuraDock({ activeModal, onOpenModal, onHome, isMobile = false }: VisuraDockProps) {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [clickedItem, setClickedItem] = useState<number | null>(null);
  const { user, logout } = useAuth();

  // Simplified items for mobile - only most important ones
  const mobileItems: DockItem[] = user
    ? [
        { id: "home", label: "Home", labelAr: "🏠", icon: <HomeIcon size={18} /> },
        { id: "photoGallery", label: "Photos", labelAr: "📷", icon: <PhotoGalleryIcon size={18} /> },
        { id: "artGallery", label: "Art", labelAr: "🎨", icon: <ArtGalleryIcon size={18} /> },
        { id: "camera", label: "Camera", labelAr: "📸", icon: <CameraIcon size={18} /> },
        { id: "ai", label: "AI", labelAr: "🤖", icon: <AIIcon size={18} /> },
        { id: "auth", label: "Profile", labelAr: "👤", icon: <UserIcon size={18} /> },
      ]
    : [
        { id: "home", label: "Home", labelAr: "🏠", icon: <HomeIcon size={18} /> },
        { id: "photoGallery", label: "Photos", labelAr: "📷", icon: <PhotoGalleryIcon size={18} /> },
        { id: "artGallery", label: "Art", labelAr: "🎨", icon: <ArtGalleryIcon size={18} /> },
        { id: "camera", label: "Camera", labelAr: "📸", icon: <CameraIcon size={18} /> },
        { id: "ai", label: "AI", labelAr: "🤖", icon: <AIIcon size={18} /> },
        { id: "auth", label: "Login", labelAr: "👤", icon: <UserIcon size={18} /> },
      ];

  const desktopItems: DockItem[] = user
    ? [
        { id: "home", label: "Home", labelAr: "الرئيسية", icon: <HomeIcon /> },
        { id: "photoGallery", label: "Photography", labelAr: "معرض التصوير", icon: <PhotoGalleryIcon /> },
        { id: "camera", label: "Camera", labelAr: "الكاميرا", icon: <CameraIcon /> },
        { id: "ai", label: "AI Assistant", labelAr: "مساعد الذكاء", icon: <AIIcon /> },
        { id: "artGallery", label: "Fine Art", labelAr: "معرض الفن", icon: <ArtGalleryIcon /> },
        { id: "canvas", label: "Canvas", labelAr: "لوحة الرسم", icon: <CanvasIcon /> },
        { id: "tracking", label: "Tracking", labelAr: "التتبع", icon: <TrackingIcon /> },
        { id: "auth", label: "Profile", labelAr: user.name, icon: <UserIcon /> },
      ]
    : [
        { id: "home", label: "Home", labelAr: "الرئيسية", icon: <HomeIcon /> },
        { id: "photoGallery", label: "Photography", labelAr: "معرض التصوير", icon: <PhotoGalleryIcon /> },
        { id: "camera", label: "Camera", labelAr: "الكاميرا", icon: <CameraIcon /> },
        { id: "ai", label: "AI Assistant", labelAr: "مساعد الذكاء", icon: <AIIcon /> },
        { id: "artGallery", label: "Fine Art", labelAr: "معرض الفن", icon: <ArtGalleryIcon /> },
        { id: "canvas", label: "Canvas", labelAr: "لوحة الرسم", icon: <CanvasIcon /> },
        { id: "tracking", label: "Tracking", labelAr: "التتبع", icon: <TrackingIcon /> },
        { id: "auth", label: "Login", labelAr: "دخول", icon: <UserIcon /> },
      ];

  const items = isMobile ? mobileItems : desktopItems;

  const handleClick = (item: DockItem, index: number) => {
    // Trigger bounce animation
    setClickedItem(index);
    setTimeout(() => setClickedItem(null), 400);
    
    if (item.id === "home") {
      onHome();
    } else if (item.id !== null) {
      onOpenModal(item.id as ModalType);
    }
  };

  // Mobile-specific styles - lifted more for floating effect
  const iconSize = isMobile ? 40 : 52;
  const iconInnerSize = isMobile ? 16 : 20;
  const dockPadding = isMobile ? "10px 12px" : "12px 16px";
  const dockGap = isMobile ? 6 : 8;
  const dockBottom = isMobile ? 20 : 40; // More floating from bottom
  const dockBorderRadius = isMobile ? 22 : 28;

  return (
    <div
      style={{
        position: "fixed",
        bottom: dockBottom,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        width: isMobile ? "auto" : undefined,
        maxWidth: isMobile ? "calc(100% - 32px)" : undefined,
      }}
    >
      {/* Dock container */}
      <div
        style={{
          display: "flex",
          gap: dockGap,
          padding: dockPadding,
          background: "rgba(255, 255, 255, 0.06)",
          borderRadius: dockBorderRadius,
          border: "1px solid rgba(255, 255, 255, 0.12)",
          backdropFilter: "blur(40px) saturate(220%)",
          WebkitBackdropFilter: "blur(40px) saturate(220%)",
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.6), 0 4px 0 rgba(255,255,255,0.06) inset, 0 -2px 0 rgba(0,0,0,0.4) inset",
          position: "relative",
          justifyContent: "center",
        }}
      >
        {/* Top highlight line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 20,
            right: 20,
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
          }}
        />

        {items.map((item, index) => (
          <div
            key={item.id}
            onClick={() => handleClick(item, index)}
            onMouseEnter={() => setHoveredItem(index)}
            onMouseLeave={() => setHoveredItem(null)}
            style={{
              width: iconSize,
              height: iconSize,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: isMobile ? 12 : 14,
              cursor: "pointer",
              transition: "all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
              background:
                activeModal === item.id
                  ? "rgba(255,255,255,0.15)"
                  : hoveredItem === index
                  ? "rgba(255,255,255,0.1)"
                  : "transparent",
              // Magnification effect - scale up prominently on hover
              transform:
                clickedItem === index
                  ? `translateY(-4px) scale(0.95)`
                  : hoveredItem === index
                  ? `translateY(${isMobile ? -6 : -8}px) scale(${isMobile ? 1.18 : 1.22})`
                  : activeModal === item.id
                  ? `translateY(${isMobile ? -2 : -3}px) scale(1.05)`
                  : "translateY(0) scale(1)",
              boxShadow:
                hoveredItem === index
                  ? "0 12px 32px rgba(0,0,0,0.5), 0 0 20px rgba(255,255,255,0.08)"
                  : "none",
              border:
                activeModal === item.id
                  ? "1px solid rgba(255,255,255,0.3)"
                  : "1px solid transparent",
              position: "relative",
              // Bounce animation on click
              animation: clickedItem === index ? "dock-bounce 0.4s ease-out" : "none",
            }}
          >
            {/* Icon color */}
            <div
              style={{
                color:
                  activeModal === item.id
                    ? "rgba(255,255,255,0.95)"
                    : "rgba(255,255,255,0.65)",
                transition: "color 0.3s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {item.icon}
            </div>

            {/* AI Pulse indicator */}
            {item.id === "ai" && activeModal === "ai" && (
              <div
                style={{
                  position: "absolute",
                  top: isMobile ? -3 : -4,
                  right: isMobile ? -3 : -4,
                  width: isMobile ? 10 : 12,
                  height: isMobile ? 10 : 12,
                  background: "rgba(255,255,255,0.95)",
                  borderRadius: "50%",
                  animation: "pulse-dot 1.2s infinite",
                  boxShadow: "0 0 10px rgba(255,255,255,0.5)",
                }}
              />
            )}

            {/* Hover tooltip - hidden on mobile */}
            {hoveredItem === index && !isMobile && (
              <div
                style={{
                  position: "absolute",
                  bottom: "calc(100% + 12px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "rgba(0,0,0,0.85)",
                  padding: "6px 12px",
                  borderRadius: 8,
                  fontSize: 12,
                  whiteSpace: "nowrap",
                  border: "1px solid rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                }}
              >
                {item.labelAr}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
