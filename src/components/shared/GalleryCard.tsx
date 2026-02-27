"use client";

import { useState } from "react";
import Image from "next/image";
import type { Photo, Artwork } from "./types";

interface GalleryCardProps {
  item: Photo | Artwork;
  onBuy: (item: any) => void;
  type: "photo" | "art";
}

export default function GalleryCard({ item, onBuy, type }: GalleryCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const baseStyle: React.CSSProperties = {
    position: "relative",
    borderRadius: "16px",
    overflow: "hidden",
    background: "var(--glass-bg)",
    border: "1px solid var(--glass-border)",
    transition: "all 0.3s ease",
    cursor: "pointer",
  };

  const hoverStyle: React.CSSProperties = {
    ...baseStyle,
    transform: "translateY(-4px)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.4), 0 0 20px var(--gold-glow)",
    borderColor: "var(--gold-royal)",
  };

  return (
    <div
      style={isHovered ? hoverStyle : baseStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div style={{ position: "relative", paddingTop: "75%", overflow: "hidden" }}>
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{
            objectFit: "cover",
            transition: "transform 0.5s ease",
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
        />
        
        {/* Encrypted Badge */}
        {item.encrypted && (
          <div
            style={{
              opacity: 0,
              position: "absolute",
              top: "12px",
              left: "12px",
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(8px)",
              padding: "6px 12px",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              border: "1px solid var(--gold-royal)",
            }}
          >
            <span style={{ color: "var(--gold-royal)", fontSize: "12px" }}>🔒</span>
            <span style={{ color: "var(--gold-royal)", fontSize: "11px", fontWeight: 600 }}>
              AES-256
            </span>
          </div>
        )}

        {/* Price Tag */}
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            right: "12px",
            background: "var(--gold-royal)",
            color: "black",
            padding: "8px 14px",
            borderRadius: "20px",
            fontSize: "13px",
            fontWeight: 700,
          }}
        >
          {formatPrice(item.price)}
        </div>
      </div>

      {/* Info Section */}
      <div style={{ padding: "16px" }}>
        <h3
          style={{
            color: "var(--pure-white)",
            fontSize: "16px",
            fontWeight: 600,
            marginBottom: "6px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.title}
        </h3>
        
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "13px",
            marginBottom: "12px",
          }}
        >
          {item.artist}
        </p>

        {/* Stats Row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: "12px", color: "var(--text-dim)", fontSize: "12px" }}>
            <span>👁 {item.views?.toLocaleString() || 0}</span>
            {"likes" in item && <span>♥ {item.likes || 0}</span>}
          </div>
          
          <button
            onClick={() => onBuy(item)}
            style={{
              background: "transparent",
              border: "1px solid var(--gold-royal)",
              color: "var(--gold-royal)",
              padding: "8px 16px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--gold-royal)";
              e.currentTarget.style.color = "black";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--gold-royal)";
            }}
          >
            شراء
          </button>
        </div>
      </div>
    </div>
  );
}
