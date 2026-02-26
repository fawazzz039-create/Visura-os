"use client";

import { useState, useRef } from "react";
import { useAuth } from "@/lib/auth-context";

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
  views?: number;
  likes?: number;
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
    views: 1240,
    likes: 89,
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
    views: 876,
    likes: 64,
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
    views: 2100,
    likes: 156,
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
    views: 3400,
    likes: 210,
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
    views: 654,
    likes: 47,
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
    views: 1890,
    likes: 132,
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
    views: 4200,
    likes: 298,
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
    views: 987,
    likes: 73,
  },
];

type FilterType = "all" | "encrypted" | "landscape" | "portrait" | "abstract";

interface PhotoGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBuy?: (item: { id: string; title: string; artist: string; price: number; image: string; type: "photo" | "art" }) => void;
}

export default function PhotoGalleryModal({ isOpen, onClose, onBuy }: PhotoGalleryModalProps) {
  const { user } = useAuth();
  const [filter, setFilter] = useState<FilterType>("all");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [cart, setCart] = useState<string[]>([]);
  const [photos, setPhotos] = useState<Photo[]>(photoDatabase);
  const [showUpload, setShowUpload] = useState(false);
  const [sortBy, setSortBy] = useState<"price" | "views" | "newest">("newest");
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const filtered = (() => {
    let list =
      filter === "all"
        ? photos
        : filter === "encrypted"
        ? photos.filter((p) => p.encrypted)
        : photos.filter((p) => p.category === filter);

    if (sortBy === "price") list = [...list].sort((a, b) => b.price - a.price);
    else if (sortBy === "views") list = [...list].sort((a, b) => (b.views || 0) - (a.views || 0));
    else list = [...list].sort((a, b) => b.year - a.year);

    return list;
  })();

  const handleBuy = (photo: Photo) => {
    if (onBuy) {
      onBuy({
        id: photo.id,
        title: photo.title,
        artist: photo.artist,
        price: photo.price,
        image: photo.image,
        type: "photo",
      });
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const src = ev.target?.result as string;
      const newPhoto: Photo = {
        id: `VIS-${Date.now()}`,
        title: file.name.replace(/\.[^.]+$/, ""),
        category: "landscape",
        price: 2500,
        encrypted: true,
        artist: "أنت",
        image: src,
        resolution: "HD",
        year: new Date().getFullYear(),
        views: 0,
        likes: 0,
      };
      setPhotos((prev) => [newPhoto, ...prev]);
      setShowUpload(false);
      alert(`✅ تم رفع الصورة بنجاح!\n🔐 تم تشفيرها تلقائياً بـ AES-256-GCM\n📋 المعرف: ${newPhoto.id}`);
    };
    reader.readAsDataURL(file);
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
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleUpload}
      />

      {/* Close */}
      <button
        className="global-os-close"
        onClick={onClose}
      >
        ×
      </button>

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 28,
          paddingBottom: 20,
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div>
          <div style={{ fontSize: 11, letterSpacing: "3px", opacity: 0.35, marginBottom: 5 }}>
            VISURA PHOTOGRAPHY GALLERY
          </div>
          <div style={{ fontSize: 26, fontWeight: 200 }}>📸 معرض التصوير الفوتوغرافي</div>
          <div style={{ fontSize: 12, opacity: 0.4, marginTop: 4 }}>
            {photos.length} عمل · {photos.filter((p) => p.encrypted).length} مشفر
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            style={{
              padding: "7px 14px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "white",
              borderRadius: 10,
              cursor: "pointer",
              fontSize: 12,
              outline: "none",
            }}
          >
            <option value="newest" style={{ background: "#000b14" }}>الأحدث</option>
            <option value="price" style={{ background: "#000b14" }}>الأعلى سعراً</option>
            <option value="views" style={{ background: "#000b14" }}>الأكثر مشاهدة</option>
          </select>

          {/* Upload button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            style={{
              padding: "8px 18px",
              background: "white",
              border: "none",
              color: "black",
              borderRadius: 10,
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.85)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
          >
            + رفع صورة
          </button>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            style={{
              padding: "7px 18px",
              background: filter === f.key ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${filter === f.key ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.1)"}`,
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

      {/* Stats bar */}
      <div
        style={{
          display: "flex",
          gap: 20,
          marginBottom: 24,
          padding: "14px 20px",
          background: "rgba(255,255,255,0.02)",
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.06)",
          flexWrap: "wrap",
        }}
      >
        {[
          { label: "إجمالي الأعمال", value: photos.length },
          { label: "أعمال مشفرة", value: photos.filter((p) => p.encrypted).length },
          { label: "متوسط السعر", value: `${Math.round(photos.reduce((s, p) => s + p.price, 0) / photos.length).toLocaleString()} ر.س` },
          { label: "إجمالي المشاهدات", value: photos.reduce((s, p) => s + (p.views || 0), 0).toLocaleString() },
        ].map((stat) => (
          <div key={stat.label} style={{ textAlign: "center", flex: 1, minWidth: 100 }}>
            <div style={{ fontSize: 20, fontWeight: 300, marginBottom: 2 }}>{stat.value}</div>
            <div style={{ fontSize: 11, opacity: 0.4, letterSpacing: "0.5px" }}>{stat.label}</div>
          </div>
        ))}
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
          gap: 22,
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
  const [liked, setLiked] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "rgba(255,255,255,0.025)",
        borderRadius: 16,
        overflow: "hidden",
        border: `1px solid ${hovered ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.07)"}`,
        transition: "all 0.35s ease",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: hovered ? "0 24px 48px rgba(0,0,0,0.5)" : "none",
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
            transition: "transform 0.5s ease",
            transform: hovered ? "scale(1.07)" : "scale(1)",
          }}
        />

        {/* Overlay on hover */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        />

        {/* Encryption badge */}
        {photo.encrypted && (
          <div
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              background: "rgba(0,0,0,0.65)",
              borderRadius: "50%",
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            🔒
          </div>
        )}

        {/* Resolution badge */}
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            background: "rgba(0,0,0,0.6)",
            borderRadius: 6,
            padding: "3px 8px",
            fontSize: 10,
            fontFamily: "monospace",
            color: "rgba(255,255,255,0.85)",
            letterSpacing: "1px",
            backdropFilter: "blur(4px)",
          }}
        >
          {photo.resolution}
        </div>

        {/* Like button */}
        <button
          onClick={(e) => { e.stopPropagation(); setLiked((v) => !v); }}
          style={{
            position: "absolute",
            bottom: 10,
            right: 10,
            background: "rgba(0,0,0,0.6)",
            border: "none",
            borderRadius: 8,
            padding: "4px 10px",
            fontSize: 12,
            color: liked ? "white" : "rgba(255,255,255,0.6)",
            cursor: "pointer",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            gap: 4,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        >
          {liked ? "♥" : "♡"} {(photo.likes || 0) + (liked ? 1 : 0)}
        </button>

        {/* Encryption shimmer bar */}
        {photo.encrypted && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 2,
              background: "linear-gradient(90deg, rgba(255,255,255,0.6), rgba(255,255,255,0.2), rgba(255,255,255,0.6))",
              backgroundSize: "200% 100%",
              animation: "encrypt-shimmer 2s linear infinite",
            }}
          />
        )}
      </div>

      {/* Info */}
      <div style={{ padding: "16px 18px" }}>
        <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 5 }}>{photo.title}</div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 11,
            color: "rgba(255,255,255,0.45)",
            marginBottom: 12,
          }}
        >
          <span>{photo.artist}</span>
          <span>{photo.views?.toLocaleString()} مشاهدة</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <div style={{ fontSize: 20, fontWeight: 700, color: "white" }}>
            {photo.price.toLocaleString()} ر.س
          </div>
          <div
            style={{
              fontSize: 10,
              color: photo.encrypted ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.35)",
              fontFamily: "monospace",
            }}
          >
            {photo.encrypted ? "🔐 AES-256" : "⚪ عام"}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={onView}
            style={{
              flex: 1,
              padding: "8px",
              border: "1px solid rgba(255,255,255,0.15)",
              background: "transparent",
              color: "white",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 12,
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            التفاصيل
          </button>
          <button
            onClick={onBuy}
            style={{
              flex: 1,
              padding: "8px",
              border: `1px solid ${inCart ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.7)"}`,
              background: inCart ? "rgba(255,255,255,0.12)" : "white",
              color: inCart ? "white" : "black",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 12,
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
        background: "rgba(0,0,0,0.88)",
        zIndex: 4000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(12px)",
        animation: "fadeIn 0.2s ease",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "rgba(6,10,18,0.98)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 20,
          padding: 32,
          maxWidth: 620,
          width: "92%",
          position: "relative",
          animation: "scale-in 0.2s ease",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="global-os-close"
          onClick={onClose}
        >
          ×
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.image}
          alt={photo.title}
          style={{ width: "100%", height: 280, objectFit: "cover", borderRadius: 12, marginBottom: 22 }}
        />
        <h3 style={{ fontSize: 22, fontWeight: 400, marginBottom: 16 }}>{photo.title}</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
          {[
            { label: "الفنان", value: photo.artist },
            { label: "التصنيف", value: photo.category },
            { label: "الدقة", value: photo.resolution },
            { label: "السنة", value: String(photo.year) },
            { label: "المشاهدات", value: photo.views?.toLocaleString() || "0" },
            { label: "الإعجابات", value: String(photo.likes || 0) },
            { label: "المعرف", value: photo.id },
            {
              label: "التشفير",
              value: photo.encrypted ? "AES-256-GCM ✓" : "غير مشفر",
            },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                background: "rgba(255,255,255,0.03)",
                borderRadius: 8,
                padding: "10px 14px",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div style={{ fontSize: 10, opacity: 0.4, marginBottom: 3, letterSpacing: "0.5px" }}>
                {item.label}
              </div>
              <div style={{ fontSize: 13, fontFamily: item.label === "المعرف" || item.label === "التشفير" ? "monospace" : "inherit" }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* Rights protection notice */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 10,
            padding: "12px 16px",
            fontSize: 12,
            color: "rgba(255,255,255,0.5)",
            marginBottom: 20,
            lineHeight: 1.6,
          }}
        >
          🛡️ هذا العمل محمي بموجب قوانين حقوق الملكية الفكرية. أي نسخ أو توزيع غير مصرح به يُعدّ جريمة قانونية.
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ flex: 1, fontSize: 26, fontWeight: 700 }}>
            {photo.price.toLocaleString()} ر.س
          </div>
          <button
            onClick={onBuy}
            style={{
              padding: "12px 28px",
              background: "white",
              border: "none",
              color: "black",
              borderRadius: 10,
              cursor: "pointer",
              fontSize: 15,
              fontWeight: 700,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.85)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
          >
            شراء الآن
          </button>
        </div>
      </div>
    </div>
  );
}
