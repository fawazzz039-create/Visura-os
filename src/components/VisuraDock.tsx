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

  // Apple Vision Pro style lighting constants
const VISION_PRO = {
  CRYSTAL_WHITE: "rgba(255, 255, 255, 0.98)",
  SOFT_WHITE: "rgba(255, 255, 255, 0.85)",
  ICE_BLUE: "#A5D8FF",
  AMBIENT_CYAN: "#89CFF0",
  FROST_GLASS: "rgba(255, 255, 255, 0.12)",
  INACTIVE_ICON: "rgba(255, 255, 255, 0.3)",
  INACTIVE_DIM: "rgba(255, 255, 255, 0.18)",
  GLASS_BG: "rgba(10, 20, 40, 0.65)",
  NAVY_DARK: "rgba(5, 15, 35, 0.85)",
  AMBIENT_GLOW: "rgba(137, 207, 240, 0.25)",
  AMBIENT_GLOW_STRONG: "rgba(165, 216, 255, 0.4)",
  EDGE_HIGHLIGHT: "rgba(255, 255, 255, 0.18)",
  REFLECTION: "rgba(255, 255, 255, 0.08)",
  DEPTH_SHADOW: "rgba(0, 0, 0, 0.6)",
};

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
    <div className="vision-dock">
      <div className="vision-dock-inner">
        {/* Vision Pro: Ambient light streak */}
        <div 
          className="vision-ambient-streak"
          style={{
            transform: `translateX(calc(${streakPosition * 100}% + ${streakPosition * 16}px))`,
          }}
        />
        
        {/* Vision Pro: Glass surface reflection overlay */}
        <div className="vision-glass-overlay" />
        
        {dockItems.map((item, index) => {
          const isActive = activeIndex === index || selectedIndex === index;
          const isCamera = item.isCamera;
          const iconSize = isCamera ? 28 : 22;
          
          return (
            <button
              key={item.id}
              className={`vision-dock-item ${isActive ? "active" : ""} ${isCamera ? "camera" : ""} ${isPressed === index ? "pressed" : ""}`}
              onClick={() => handleClick(item, index)}
              onTouchStart={() => handleTouchStart(index)}
              onTouchEnd={handleTouchEnd}
              style={{
                ["--ambient-glow" as string]: isActive ? VISION_PRO.AMBIENT_GLOW : "transparent",
                ["--ambient-glow-strong" as string]: isActive ? VISION_PRO.AMBIENT_GLOW_STRONG : "transparent",
              }}
            >
              {/* Vision Pro: Ambient light layer */}
              {isActive && <div className="vision-ambient-glow" />}
              
              {/* Vision Pro: Glass reflection layer */}
              <div className="vision-glass-reflection" />
              
              {/* Vision Pro: Edge highlight */}
              <div className="vision-edge-highlight" />
              
              <div 
                className="vision-icon"
                style={{
                  color: isActive ? VISION_PRO.CRYSTAL_WHITE : (isPressed === index ? VISION_PRO.SOFT_WHITE : VISION_PRO.INACTIVE_ICON),
                  transform: isActive ? "scale(1)" : "scale(0.88)",
                  opacity: isActive ? 1 : 0.55,
                  textShadow: isActive ? "0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(137,207,240,0.3)" : "none",
                }}
              >
                {item.isCamera ? <CameraIcon size={iconSize} active={isActive} /> : 
                  (index === 0 ? <HomeIcon size={iconSize} active={isActive} /> :
                   index === 1 ? <CompassIcon size={iconSize} active={isActive} /> :
                   index === 3 ? <GalleryIcon size={iconSize} active={isActive} /> :
                   <ProfileIcon size={iconSize} active={isActive} />)}
              </div>
              
              {/* Vision Pro: Cinematic depth indicator */}
              {isActive && (
                <div className="vision-depth-indicator" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
