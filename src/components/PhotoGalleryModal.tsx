"use client";

import { useState } from "react";

interface Photo {
  id: string;
  title: string;
  category: string;
  price: number;
  encrypted: boolean;
  artist: string;
  image: string;
  resolution: string;
  year: number;
}

const photoDatabase: Photo[] = [
  {
    id: "VIS-001",
    title: "غروب الرياض",
    category: "landscape",
    price: 3500,
    encrypted: true,
    artist: "أحمد العلي",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    resolution: "8K",
    year: 2024,
  },
  {
    id: "VIS-002",
    title: "بورتريه الضوء",
    category: "portrait",
    price: 2800,
    encrypted: true,
    artist: "سارة محمد",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800",
    resolution: "4K",
    year: 2024,
  },
  {
    id: "VIS-003",
    title: "تجريدي رقمي",
    category: "abstract",
    price: 4200,
    encrypted: true,
    artist: "خالد سامي",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800",
    resolution: "6K",
    year: 2025,
  },
  {
    id: "VIS-004",
    title: "صحراء الذهب",
    category: "landscape",
    price: 5500,
    encrypted: false,
    artist: "نورة عبدالله",
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800",
    resolution: "8K",
    year: 2025,
  },
  {
    id: "VIS-005",
    title: "عين المدينة",
    category: "portrait",
    price: 3200,
    encrypted: true,
    artist: "فهد الرشيد",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800",
    resolution: "4K",
    year: 2024,
  },
  {
    id: "VIS-006",
    title: "أمواج الضوء",
    category: "abstract",
    price: 4800,
    encrypted: true,
    artist: "لمى سعد",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800",
    resolution: "6K",
    year: 2025,
  },
  {
    id: "VIS-007",
    title: "ليل المدينة",
    category: "landscape",
    price: 6200,
    encrypted: true,
    artist: "عمر الزهراني",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800",
    resolution: "8K",
    year: 2025,
  },
  {
    id: "VIS-008",
    title: "صمت الطبيعة",
    category: "landscape",
    price: 4100,
    encrypted: false,
    artist: "ريم الحربي",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800",
    resolution: "4K",
    year: 2024,
  },
];

type FilterType = "all" | "encrypted" | "landscape" | "portrait" | "abstract";

interface PhotoGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PhotoGalleryModal({ isOpen, onClose }: PhotoGalleryModalProps) {
  const [filter, setFilter] = useState<FilterType>("all");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [cart, setCart] = useState<string[]>([]);

  if (!isOpen) return null;

  const filtered =
    filter === "all"
      ? photoDatabase
      : filter === "encrypted"
      ? photoDatabase.filter((p) => p.encrypted)
      : photoDatabase.filter((p) => p.category === filter);

  const handleBuy = (photo: Photo) => {
    if (!cart.includes(photo.id)) {
      setCart((prev) => [...prev, photo.id]);
    }
    alert(
      `✅ تم إضافة "${photo.title}" إلى سلة المشتريات\n🔐 المعاملة مشفرة بتقنية البلوكتشين\n💰 السعر: ${photo.price.toLocaleString()} ر.س`
    );
  };

  const filters: { key: FilterType; label: string }[] = [
    { key: "all", label: "الكل" },
    { key: "encrypted", label: "🔒 مشفرة" },
    { key: "landscape", label: "مناظر" },
    { key: "portrait", label: "بورتريه" },
    { key: "abstract", label: "تجريدي" },
  ];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,5,12,0.98)",
        zIndex: 3000,
        display: "flex",
        flexDirection: "column",
        padding: "40px 40px 120px",
        boxSizing: "border-box",
        overflowY: "auto",
      }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: "fixed",
          top: 20,
          right: 24,
          fontSize: 28,
          background: "none",
          border: "none",
          color: "white",
          cursor: "pointer",
          opacity: 0.7,
          zIndex: 10,
        }}
      >
        ×
      </button>

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 32,
          paddingBottom: 20,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div>
          <div style={{ fontSize: 11, letterSpacing: "3px", opacity: 0.4, marginBottom: 6 }}>
            VISURA GALLERY
          </div>
          <div style={{ fontSize: 28, fontWeight: 200, letterSpacing: "1px" }}>
            📸 معرض التصوير الفوتوغرافي
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              style={{
                padding: "7px 18px",
                background: filter === f.key ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${filter === f.key ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.12)"}`,
                color: "white",
                borderRadius: 20,
                cursor: "pointer",
                fontSize: 13,
                transition: "all 0.2s",
                letterSpacing: "0.5px",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cart indicator */}
      {cart.length > 0 && (
        <div
          style={{
            position: "fixed",
            top: 20,
            left: 60,
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 20,
            padding: "6px 16px",
            fontSize: 13,
            backdropFilter: "blur(10px)",
            zIndex: 10,
          }}
        >
          🛒 {cart.length} عمل في السلة
        </div>
      )}

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 24,
        }}
      >
        {filtered.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            inCart={cart.includes(photo.id)}
            onView={() => setSelectedPhoto(photo)}
            onBuy={() => handleBuy(photo)}
          />
        ))}
      </div>

      {/* Detail Modal */}
      {selectedPhoto && (
        <PhotoDetailModal
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          onBuy={() => {
            handleBuy(selectedPhoto);
            setSelectedPhoto(null);
          }}
        />
      )}
    </div>
  );
}

function PhotoCard({
  photo,
  inCart,
  onView,
  onBuy,
}: {
  photo: Photo;
  inCart: boolean;
  onView: () => void;
  onBuy: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "rgba(255,255,255,0.03)",
        borderRadius: 16,
        overflow: "hidden",
        border: `1px solid ${hovered ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.08)"}`,
        transition: "all 0.35s ease",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: hovered ? "0 20px 40px rgba(0,0,0,0.4)" : "none",
        cursor: "pointer",
        position: "relative",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", overflow: "hidden", height: 220 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.image}
          alt={photo.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.4s ease",
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
        />
        {/* Encryption overlay */}
        {photo.encrypted && (
          <div
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              background: "rgba(0,0,0,0.7)",
              borderRadius: "50%",
              width: 34,
              height: 34,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              backdropFilter: "blur(4px)",
            }}
          >
            🔒
          </div>
        )}
        {/* Resolution badge */}
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            background: "rgba(0,0,0,0.65)",
            borderRadius: 6,
            padding: "3px 8px",
            fontSize: 10,
            fontFamily: "monospace",
            color: "rgba(255,255,255,0.8)",
            letterSpacing: "1px",
          }}
        >
          {photo.resolution}
        </div>
        {/* Encryption bar */}
        {photo.encrypted && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 3,
              background: "linear-gradient(90deg, rgba(255,255,255,0.6), rgba(255,255,255,0.2), rgba(255,255,255,0.6))",
              backgroundSize: "200% 100%",
              animation: "encrypt-shimmer 2s linear infinite",
            }}
          />
        )}
      </div>

      {/* Info */}
      <div style={{ padding: "18px 20px" }}>
        <div style={{ fontSize: 17, fontWeight: 500, marginBottom: 6 }}>{photo.title}</div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 12,
            color: "rgba(255,255,255,0.5)",
            marginBottom: 14,
          }}
        >
          <span>بواسطة: {photo.artist}</span>
          <span>{photo.id}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <div style={{ fontSize: 22, fontWeight: 700, color: "white" }}>
            {photo.price.toLocaleString()} ر.س
          </div>
          <div
            style={{
              fontSize: 11,
              color: photo.encrypted ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.4)",
              fontFamily: "monospace",
            }}
          >
            {photo.encrypted ? "🔐 مشفرة" : "⚪ عامة"}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={onView}
            style={{
              flex: 1,
              padding: "9px",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "transparent",
              color: "white",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 13,
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            التفاصيل
          </button>
          <button
            onClick={onBuy}
            style={{
              flex: 1,
              padding: "9px",
              border: "1px solid rgba(255,255,255,0.6)",
              background: inCart ? "rgba(255,255,255,0.15)" : "white",
              color: inCart ? "white" : "black",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              transition: "all 0.2s",
            }}
          >
            {inCart ? "✓ في السلة" : "شراء الآن"}
          </button>
        </div>
      </div>
    </div>
  );
}

function PhotoDetailModal({
  photo,
  onClose,
  onBuy,
}: {
  photo: Photo;
  onClose: () => void;
  onBuy: () => void;
}) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.85)",
        zIndex: 4000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(8px)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "rgba(8,12,20,0.98)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 20,
          padding: 32,
          maxWidth: 600,
          width: "90%",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "none",
            border: "none",
            color: "white",
            fontSize: 22,
            cursor: "pointer",
            opacity: 0.6,
          }}
        >
          ×
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.image}
          alt={photo.title}
          style={{ width: "100%", height: 280, objectFit: "cover", borderRadius: 12, marginBottom: 20 }}
        />
        <h3 style={{ fontSize: 22, fontWeight: 400, marginBottom: 16 }}>{photo.title}</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
          {[
            { label: "الفنان", value: photo.artist },
            { label: "التصنيف", value: photo.category },
            { label: "الدقة", value: photo.resolution },
            { label: "السنة", value: String(photo.year) },
            { label: "المعرف", value: photo.id },
            { label: "التشفير", value: photo.encrypted ? "AES-256-GCM" : "غير مشفر" },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                background: "rgba(255,255,255,0.04)",
                borderRadius: 8,
                padding: "10px 14px",
                fontSize: 13,
              }}
            >
              <div style={{ opacity: 0.5, marginBottom: 4, fontSize: 11 }}>{item.label}</div>
              <div style={{ fontWeight: 500 }}>{item.value}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{photo.price.toLocaleString()} ر.س</div>
          <button
            onClick={onBuy}
            style={{
              padding: "12px 32px",
              background: "white",
              color: "black",
              border: "none",
              borderRadius: 10,
              cursor: "pointer",
              fontSize: 15,
              fontWeight: 700,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.85)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
          >
            شراء الآن 🔐
          </button>
        </div>
      </div>
    </div>
  );
}
