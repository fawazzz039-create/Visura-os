"use client";

import { useState, useRef, useEffect } from "react";
import type { ModalType } from "./VisuraApp";
import { useAuth } from "@/lib/auth-context";

interface DockItem {
  id: ModalType | "home" | "explorer";
  label: string;
  labelAr: string;
  icon: React.ReactNode;
  isCamera?: boolean;
}

// Minimal thin line icon components with crystal glass material
function HomeIcon({ size = 22, active = false }: { size?: number; active?: boolean }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      width={size} 
      height={size} 
      fill="none" 
      stroke={active ? "currentColor" : "currentColor"} 
      strokeWidth="1.4" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      style={{
        filter: active ? "drop-shadow(0 0 6px rgba(255, 255, 255, 0.6))" : "none",
      }}
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function CompassIcon({ size = 22, active = false }: { size?: number; active?: boolean }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      width={size} 
      height={size} 
      fill="none" 
      stroke={active ? "currentColor" : "currentColor"} 
      strokeWidth="1.4" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      style={{
        filter: active ? "drop-shadow(0 0 6px rgba(255, 255, 255, 0.6))" : "none",
      }}
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

function CameraIcon({ size = 28, active = false }: { size?: number; active?: boolean }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      width={size} 
      height={size} 
      fill="none" 
      stroke={active ? "currentColor" : "currentColor"} 
      strokeWidth="1.3" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      style={{
        filter: active ? "drop-shadow(0 0 8px rgba(255, 255, 255, 0.7))" : "none",
      }}
    >
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function GalleryIcon({ size = 22, active = false }: { size?: number; active?: boolean }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      width={size} 
      height={size} 
      fill="none" 
      stroke={active ? "currentColor" : "currentColor"} 
      strokeWidth="1.4" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      style={{
        filter: active ? "drop-shadow(0 0 6px rgba(255, 255, 255, 0.6))" : "none",
      }}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

function ProfileIcon({ size = 22, active = false }: { size?: number; active?: boolean }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      width={size} 
      height={size} 
      fill="none" 
      stroke={active ? "currentColor" : "currentColor"} 
      strokeWidth="1.4" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      style={{
        filter: active ? "drop-shadow(0 0 6px rgba(255, 255, 255, 0.6))" : "none",
      }}
    >
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
  const [selectedIndex, setSelectedIndex] = useState(2); // Camera is default
  const [isPressed, setIsPressed] = useState<number | null>(null);
  const [streakPosition, setStreakPosition] = useState(0);
  const dockRef = useRef<HTMLDivElement>(null);
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

  // Ice crystal color constants - no gold
  const CRYSTAL_WHITE = "rgba(255, 255, 255, 0.95)";
  const ICE_BLUE = "#A5D8FF";
  const ICE_GLOW = "rgba(165, 216, 255, 0.6)";
  const INACTIVE_ICON = "rgba(255, 255, 255, 0.35)";
  const GLASS_BG = "rgba(10, 20, 40, 0.65)";
  const NAVY_DARK = "rgba(5, 15, 35, 0.85)";

  // 5 dock items - Ice Crystal Glassmorphism design
  const dockItems: DockItem[] = [
    { id: "home", label: "Home", labelAr: "الرئيسية", icon: <HomeIcon /> },
    { id: "ai", label: "Explorer", labelAr: "المستكشف", icon: <CompassIcon /> },
    { id: "camera", label: "Camera", labelAr: "الكاميرا", icon: <CameraIcon />, isCamera: true },
    { id: "photoGallery", label: "Gallery", labelAr: "المعرض", icon: <GalleryIcon /> },
    { id: "auth", label: "Profile", labelAr: "الملف", icon: <ProfileIcon /> },
  ];

  // Update streak position when active index changes
  useEffect(() => {
    setStreakPosition(activeIndex);
  }, [activeIndex]);

  const handleClick = (item: DockItem, index: number) => {
    setSelectedIndex(index);
    setStreakPosition(index);
    
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
    <div className="ice-crystal-dock">
      <div className="ice-crystal-dock-inner">
        {/* Light streak that slides across */}
        <div 
          className="ice-crystal-streak"
          style={{
            transform: `translateX(calc(${streakPosition * 100}% + ${streakPosition * 16}px))`,
          }}
        />
        
        {dockItems.map((item, index) => {
          const isActive = activeIndex === index || selectedIndex === index;
          const isCamera = item.isCamera;
          const iconSize = isCamera ? 28 : 22;
          
          return (
            <button
              key={item.id}
              className={`ice-crystal-item ${isActive ? "active" : ""} ${isCamera ? "camera" : ""} ${isPressed === index ? "pressed" : ""}`}
              onClick={() => handleClick(item, index)}
              onTouchStart={() => handleTouchStart(index)}
              onTouchEnd={handleTouchEnd}
              style={{
                ["--glow-color" as string]: isActive ? ICE_GLOW : "transparent",
              }}
            >
              {/* Ice blue glow when active */}
              {isActive && <div className="ice-glow" />}
              
              <div 
                className="ice-crystal-icon"
                style={{
                  color: isActive ? CRYSTAL_WHITE : INACTIVE_ICON,
                  transform: isActive ? "scale(1)" : "scale(0.88)",
                  opacity: isActive ? 1 : 0.5,
                }}
              >
                {item.isCamera ? <CameraIcon size={iconSize} active={isActive} /> : 
                  (index === 0 ? <HomeIcon size={iconSize} active={isActive} /> :
                   index === 1 ? <CompassIcon size={iconSize} active={isActive} /> :
                   index === 3 ? <GalleryIcon size={iconSize} active={isActive} /> :
                   <ProfileIcon size={iconSize} active={isActive} />)}
              </div>
              
              {/* Crystal indicator below active icon */}
              {isActive && (
                <div className="ice-crystal-dot" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
