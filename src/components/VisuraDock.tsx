"use client";

import { useState } from "react";
import type { ModalType } from "./VisuraApp";
import { useAuth } from "@/lib/auth-context";

interface DockItem {
  id: ModalType | "home";
  label: string;
  labelAr: string;
  icon: React.ReactNode;
  isCamera?: boolean;
  showMacro?: boolean;
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
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { user } = useAuth();

  // Simplified items for mobile - only most important ones
  const mobileItems: DockItem[] = user
    ? [
        { id: "home", label: "Home", labelAr: "الرئيسية", icon: <HomeIcon size={18} /> },
        { id: "photoGallery", label: "Photos", labelAr: "معرض التصوير", icon: <PhotoGalleryIcon size={18} /> },
        { id: "artGallery", label: "Art", labelAr: "معرض الفن", icon: <ArtGalleryIcon size={18} /> },
        { id: "camera", label: "Camera", labelAr: "الكاميرا", icon: <CameraIcon size={18} />, isCamera: true, showMacro: true },
        { id: "ai", label: "AI", labelAr: "مساعد الذكاء", icon: <AIIcon size={18} /> },
        { id: "auth", label: "Profile", labelAr: user.name || "الملف", icon: <UserIcon size={18} /> },
      ]
    : [
        { id: "home", label: "Home", labelAr: "الرئيسية", icon: <HomeIcon size={18} /> },
        { id: "photoGallery", label: "Photos", labelAr: "معرض التصوير", icon: <PhotoGalleryIcon size={18} /> },
        { id: "artGallery", label: "Art", labelAr: "معرض الفن", icon: <ArtGalleryIcon size={18} /> },
        { id: "camera", label: "Camera", labelAr: "الكاميرا", icon: <CameraIcon size={18} />, isCamera: true, showMacro: true },
        { id: "ai", label: "AI", labelAr: "مساعد الذكاء", icon: <AIIcon size={18} /> },
        { id: "auth", label: "Login", labelAr: "دخول", icon: <UserIcon size={18} /> },
      ];

  const desktopItems: DockItem[] = user
    ? [
        { id: "home", label: "Home", labelAr: "الرئيسية", icon: <HomeIcon /> },
        { id: "photoGallery", label: "Photography", labelAr: "معرض التصوير", icon: <PhotoGalleryIcon /> },
        { id: "camera", label: "Camera", labelAr: "الكاميرا", icon: <CameraIcon />, isCamera: true, showMacro: true },
        { id: "ai", label: "AI Assistant", labelAr: "مساعد الذكاء", icon: <AIIcon /> },
        { id: "artGallery", label: "Fine Art", labelAr: "معرض الفن", icon: <ArtGalleryIcon /> },
        { id: "canvas", label: "Canvas", labelAr: "لوحة الرسم", icon: <CanvasIcon /> },
        { id: "tracking", label: "Tracking", labelAr: "التتبع", icon: <TrackingIcon /> },
        { id: "auth", label: "Profile", labelAr: user.name || "الملف", icon: <UserIcon /> },
      ]
    : [
        { id: "home", label: "Home", labelAr: "الرئيسية", icon: <HomeIcon /> },
        { id: "photoGallery", label: "Photography", labelAr: "معرض التصوير", icon: <PhotoGalleryIcon /> },
        { id: "camera", label: "Camera", labelAr: "الكاميرا", icon: <CameraIcon />, isCamera: true, showMacro: true },
        { id: "ai", label: "AI Assistant", labelAr: "مساعد الذكاء", icon: <AIIcon /> },
        { id: "artGallery", label: "Fine Art", labelAr: "معرض الفن", icon: <ArtGalleryIcon /> },
        { id: "canvas", label: "Canvas", labelAr: "لوحة الرسم", icon: <CanvasIcon /> },
        { id: "tracking", label: "Tracking", labelAr: "التتبع", icon: <TrackingIcon /> },
        { id: "auth", label: "Login", labelAr: "دخول", icon: <UserIcon /> },
      ];

  const items = isMobile ? mobileItems : desktopItems;
  const iconSize = isMobile ? 18 : 20;
  const cameraIconSize = isMobile ? 20 : 24;

  const handleClick = (item: DockItem) => {
    if (item.id === "home") {
      onHome();
    } else if (item.id !== null) {
      onOpenModal(item.id as ModalType);
    }
  };

  // Find camera index for LED positioning
  const cameraIndex = items.findIndex(item => item.isCamera);
  const activeIndex = items.findIndex(item => item.id === activeModal);

  return (
    <div className="visura-dock-root">
      <div className="visura-dock-container">
        {/* Sliding Active LED Indicator */}
        {activeIndex !== -1 && (
          <div
            className="visura-dock-led"
            style={{
              transform: `translateX(calc(-50% + (${activeIndex} - ${Math.floor(items.length / 2)}) * ${isMobile ? 52 : 68}px))`,
            }}
          />
        )}

        {items.map((item, index) => (
          <div
            key={item.id}
            className={`visura-dock-item ${item.id === activeModal ? "active" : ""} ${item.isCamera ? "camera-item" : ""}`}
            onClick={() => handleClick(item)}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {/* Icon */}
            <div className={`visura-dock-icon ${item.id === activeModal ? "active" : ""}`}>
              {item.isCamera ? <CameraIcon size={cameraIconSize} /> : item.icon}
            </div>

            {/* Macro Badge */}
            {item.showMacro && (
              <div className="visura-macro-badge">M</div>
            )}

            {/* Tooltip - Desktop only */}
            {hoveredItem === item.id && !isMobile && (
              <div className="visura-dock-tooltip">
                {item.labelAr}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
