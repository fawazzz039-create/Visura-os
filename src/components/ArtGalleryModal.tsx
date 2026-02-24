"use client";

import { useState } from "react";

interface Artwork {
  id: string;
  title: string;
  style: string;
  price: number;
  encrypted: boolean;
  artist: string;
  image: string;
  medium: string;
  dimensions: string;
  year: number;
}

const artDatabase: Artwork[] = [
  {
    id: "ART-001",
    title: "رقصة الألوان",
    style: "abstract",
    price: 8500,
    encrypted: true,
    artist: "منى الشمري",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800",
    medium: "زيت على قماش",
    dimensions: "120×90 سم",
    year: 2024,
  },
  {
    id: "ART-002",
    title: "وجه الزمن",
    style: "portrait",
    price: 6200,
    encrypted: true,
    artist: "يوسف الغامدي",
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800",
    medium: "أكريليك",
    dimensions: "80×60 سم",
    year: 2025,
  },
  {
    id: "ART-003",
    title: "المدينة الصامتة",
    style: "urban",
    price: 9800,
    encrypted: true,
    artist: "هند العتيبي",
    image: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=800",
    medium: "مائي",
    dimensions: "100×70 سم",
    year: 2025,
  },
  {
    id: "ART-004",
    title: "طيف الصحراء",
    style: "landscape",
    price: 12000,
    encrypted: false,
    artist: "سلطان الدوسري",
    image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800",
    medium: "زيت على قماش",
    dimensions: "150×100 سم",
    year: 2024,
  },
  {
    id: "ART-005",
    title: "أحلام رقمية",
    style: "digital",
    price: 4500,
    encrypted: true,
    artist: "ريان الحسن",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    medium: "فن رقمي",
    dimensions: "8K Print",
    year: 2025,
  },
  {
    id: "ART-006",
    title: "جذور الأرض",
    style: "abstract",
    price: 7300,
    encrypted: true,
    artist: "نجلاء القحطاني",
    image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800",
    medium: "مختلط",
    dimensions: "110×80 سم",
    year: 2024,
  },
];

type ArtFilter = "all" | "abstract" | "portrait" | "landscape" | "digital" | "urban";

interface ArtGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ArtGalleryModal({ isOpen, onClose }: ArtGalleryModalProps) {
  const [filter, setFilter] = useState<ArtFilter>("all");
  const [selectedArt, setSelectedArt] = useState<Artwork | null>(null);
  const [cart, setCart] = useState<string[]>([]);

  if (!isOpen) return null;

  const filtered =
    filter === "all" ? artDatabase : artDatabase.filter((a) => a.style === filter);

  const handleBuy = (art: Artwork) => {
    if (!cart.includes(art.id)) {
      setCart((prev) => [...prev, art.id]);
    }
    alert(
      `✅ تم إضافة "${art.title}" إلى سلة المشتريات\n🔐 حقوق الملكية محمية بالبلوكتشين\n💰 السعر: ${art.price.toLocaleString()} ر.س`
    );
  };

  const artFilters: { key: ArtFilter; label: string }[] = [
    { key: "all", label: "الكل" },
    { key: "abstract", label: "تجريدي" },
    { key: "portrait", label: "بورتريه" },
    { key: "landscape", label: "مناظر" },
    { key: "digital", label: "رقمي" },
    { key: "urban", label: "حضري" },
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
            VISURA ART GALLERY
          </div>
          <div style={{ fontSize: 28, fontWeight: 200, letterSpacing: "1px" }}>
            🎨 معرض الرسم الفني
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {artFilters.map((f) => (
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

      {/* Masonry-style grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 24,
        }}
      >
        {filtered.map((art) => (
          <ArtCard
            key={art.id}
            art={art}
            inCart={cart.includes(art.id)}
            onView={() => setSelectedArt(art)}
            onBuy={() => handleBuy(art)}
          />
        ))}
      </div>

      {/* Detail Modal */}
      {selectedArt && (
        <ArtDetailModal
          art={selectedArt}
          onClose={() => setSelectedArt(null)}
          onBuy={() => {
            handleBuy(selectedArt);
            setSelectedArt(null);
          }}
        />
      )}
    </div>
  );
}

function ArtCard({
  art,
  inCart,
  onView,
  onBuy,
}: {
  art: Artwork;
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
      <div style={{ position: "relative", overflow: "hidden", height: 260 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={art.image}
          alt={art.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.4s ease",
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
        />
        {/* Encryption badge */}
        {art.encrypted && (
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
        {/* Medium badge */}
        <div
          style={{
            position: "absolute",
            bottom: 12,
            left: 12,
            background: "rgba(0,0,0,0.7)",
            borderRadius: 6,
            padding: "4px 10px",
            fontSize: 11,
            color: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(4px)",
          }}
        >
          {art.medium}
        </div>
        {/* Shimmer bar */}
        {art.encrypted && (
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
        <div style={{ fontSize: 17, fontWeight: 500, marginBottom: 6 }}>{art.title}</div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 12,
            color: "rgba(255,255,255,0.5)",
            marginBottom: 6,
          }}
        >
          <span>{art.artist}</span>
          <span>{art.dimensions}</span>
        </div>
        <div
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.35)",
            marginBottom: 14,
            fontFamily: "monospace",
          }}
        >
          {art.id} · {art.year}
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
            {art.price.toLocaleString()} ر.س
          </div>
          <div
            style={{
              fontSize: 11,
              color: art.encrypted ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.4)",
              fontFamily: "monospace",
            }}
          >
            {art.encrypted ? "🔐 محمي" : "⚪ عام"}
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
            {inCart ? "✓ في السلة" : "اقتناء الآن"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ArtDetailModal({
  art,
  onClose,
  onBuy,
}: {
  art: Artwork;
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
          src={art.image}
          alt={art.title}
          style={{ width: "100%", height: 280, objectFit: "cover", borderRadius: 12, marginBottom: 20 }}
        />
        <h3 style={{ fontSize: 22, fontWeight: 400, marginBottom: 16 }}>{art.title}</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
          {[
            { label: "الفنان", value: art.artist },
            { label: "الأسلوب", value: art.style },
            { label: "الوسيط", value: art.medium },
            { label: "الأبعاد", value: art.dimensions },
            { label: "المعرف", value: art.id },
            { label: "الحماية", value: art.encrypted ? "🔐 AES-256-GCM" : "⚪ غير محمي" },
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
          <div style={{ fontSize: 28, fontWeight: 700 }}>{art.price.toLocaleString()} ر.س</div>
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
            اقتناء الآن 🎨
          </button>
        </div>
      </div>
    </div>
  );
}
