"use client";

import { useState, useRef } from "react";
import type { ModalType } from "./VisuraApp";
import { useAuth } from "@/lib/auth-context";

interface DockItem {
  id: ModalType | "home" | "explorer";
  label: string;
  labelAr: string;
  icon: React.ReactNode;
  isCamera?: boolean;
}

// Icon Components
function HomeIcon({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function CompassIcon({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

function CameraIcon({ size = 28 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function GalleryIcon({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

function ProfileIcon({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

interface VisuraDockProps {
  activeModal: ModalType;
  onOpenModal: (modal: ModalType) => void;
  onHome: () => void;
  isMobile?: boolean;
}

export default function VisuraDock({ activeModal, onOpenModal, onHome, isMobile = false }: VisuraDockProps) {
  const [selectedIndex, setSelectedIndex] = useState(2); // Camera is default (heart)
  const [isPressed, setIsPressed] = useState<number | null>(null);
  const { user } = useAuth();
  
  // Map modal types to dock indices
  const getIndexFromModal = (modal: ModalType): number => {
    switch (modal) {
      case "photoGallery":
      case "artGallery":
        return 3; // Gallery
      case "camera":
        return 2; // Camera
      case "ai":
        return 1; // Explorer (AI)
      case "tracking":
        return 1; // Explorer
      case "auth":
        return 4; // Profile
      default:
        return 0; // Home
    }
  };

  // Determine selected index based on active modal
  const activeIndex = getIndexFromModal(activeModal);

  // Golden Velvet color constants
  const GOLD_COLOR = "#D9A60B";
  const VELVET_BLACK = "rgba(13, 13, 13, 0.95)";
  const GOLD_OPACITY = "rgba(217, 166, 11, 0.4)";

  // 5 dock items - Golden Velvet design
  const dockItems: DockItem[] = [
    { id: "home", label: "Home", labelAr: "الرئيسية", icon: <HomeIcon /> },
    { id: "ai", label: "Explorer", labelAr: "المستكشف", icon: <CompassIcon /> },
    { id: "camera", label: "Camera", labelAr: "الكاميرا", icon: <CameraIcon />, isCamera: true },
    { id: "photoGallery", label: "Gallery", labelAr: "المعرض", icon: <GalleryIcon /> },
    { id: "auth", label: "Profile", labelAr: "الملف", icon: <ProfileIcon /> },
  ];

  const handleClick = (item: DockItem, index: number) => {
    setSelectedIndex(index);
    
    if (item.id === "home") {
      onHome();
    } else if (item.id !== null) {
      onOpenModal(item.id as ModalType);
    }
  };

  const handleTouchStart = (index: number) => {
    setIsPressed(index);
  };

  const handleTouchEnd = () => {
    setIsPressed(null);
  };

  return (
    <div className="golden-velvet-dock">
      <div className="golden-velvet-dock-inner">
        {dockItems.map((item, index) => {
          const isActive = activeIndex === index || selectedIndex === index;
          const isCamera = item.isCamera;
          const iconSize = isCamera ? 28 : 22;
          
          return (
            <button
              key={item.id}
              className={`golden-velvet-item ${isActive ? "active" : ""} ${isCamera ? "camera" : ""} ${isPressed === index ? "pressed" : ""}`}
              onClick={() => handleClick(item, index)}
              onTouchStart={() => handleTouchStart(index)}
              onTouchEnd={handleTouchEnd}
              style={{
                // Dynamic styles for active state
                ["--glow-color" as string]: isActive ? GOLD_COLOR : "transparent",
              }}
            >
              <div 
                className="golden-velvet-icon"
                style={{
                  color: isActive ? GOLD_COLOR : GOLD_OPACITY,
                  transform: isActive ? "scale(1)" : "scale(0.9)",
                }}
              >
                {item.isCamera ? <CameraIcon size={iconSize} /> : item.icon}
              </div>
              
              {/* Gold dot indicator below active icon */}
              {isActive && (
                <div className="golden-velvet-dot" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
