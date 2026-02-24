"use client";

import { useState, useRef } from "react";

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
  investmentScore: number;
  priceGrowth: number;
  views?: number;
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
    investmentScore: 8.7,
    priceGrowth: 22,
    views: 3200,
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
    investmentScore: 7.9,
    priceGrowth: 18,
    views: 1890,
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
    investmentScore: 9.2,
    priceGrowth: 31,
    views: 4500,
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
    investmentScore: 9.5,
    priceGrowth: 28,
    views: 6700,
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
    investmentScore: 8.1,
    priceGrowth: 45,
    views: 2300,
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
    investmentScore: 8.4,
    priceGrowth: 19,
    views: 2800,
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
  const [artworks, setArtworks] = useState<Artwork[]>(artDatabase);
  const [sortBy, setSortBy] = useState<"price" | "investment" | "growth">("investment");
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const filtered = (() => {
    let list = filter === "all" ? artworks : artworks.filter((a) => a.style === filter);
    if (sortBy === "price") list = [...list].sort((a, b) => b.price - a.price);
    else if (sortBy === "investment") list = [...list].sort((a, b) => b.investmentScore - a.investmentScore);
    else list = [...list].sort((a, b) => b.priceGrowth - a.priceGrowth);
    return list;
  })();

  const handleBuy = (art: Artwork) => {
    if (!cart.includes(art.id)) {
      setCart((prev) => [...prev, art.id]);
    }
    alert(
      `✅ تم إضافة "${art.title}" إلى سلة المشتريات\n🔐 حقوق الملكية محمية بالبلوكتشين\n💰 السعر: ${art.price.toLocaleString()} ر.س\n📈 توقع النمو: +${art.priceGrowth}% خلال 12 شهراً\n\n📋 رقم المعاملة: TXN-DEF456UVW`
    );
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const src = ev.target?.result as string;
      const newArt: Artwork = {
        id: `ART-${Date.now()}`,
        title: file.name.replace(/\.[^.]+$/, ""),
        style: "abstract",
        price: 5000,
        encrypted: true,
        artist: "أنت",
        image: src,
        medium: "رقمي",
        dimensions: "متغير",
        year: new Date().getFullYear(),
        investmentScore: 7.5,
        priceGrowth: 15,
        views: 0,
      };
      setArtworks((prev) => [newArt, ...prev]);
      alert(`✅ تم رفع العمل الفني بنجاح!\n🔐 تم تشفيره تلقائياً بـ AES-256-GCM\n📋 المعرف: ${newArt.id}`);
    };
    reader.readAsDataURL(file);
  };

  const artFilters: { key: ArtFilter; label: string }[] = [
    { key: "all", label: "الكل" },
    { key: "abstract", label: "تجريدي" },
    { key: "portrait", label: "بورتريه" },
    { key: "landscape", label: "مناظر" },
    { key: "digital", label: "رقمي" },
    { key: "urban", label: "حضري" },
  ];

  const totalValue = artworks.reduce((s, a) => s + a.price, 0);
  const avgGrowth = Math.round(artworks.reduce((s, a) => s + a.priceGrowth, 0) / artworks.length);

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
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleUpload}
      />

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
            VISURA ART INVESTMENT GALLERY
          </div>
          <div style={{ fontSize: 26, fontWeight: 200 }}>🎨 معرض الرسم الفني</div>
          <div style={{ fontSize: 12, opacity: 0.4, marginTop: 4 }}>
            {artworks.length} عمل · قيمة إجمالية: {totalValue.toLocaleString()} ر.س
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
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
            <option value="investment" style={{ background: "#000b14" }}>أعلى استثمارية</option>
            <option value="price" style={{ background: "#000b14" }}>الأعلى سعراً</option>
            <option value="growth" style={{ background: "#000b14" }}>أسرع نمواً</option>
          </select>

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
            + رفع عمل فني
          </button>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 22, flexWrap: "wrap" }}>
        {artFilters.map((f) => (
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

      {/* Investment stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: 12,
          marginBottom: 24,
        }}
      >
        {[
          { label: "إجمالي الأعمال", value: artworks.length, icon: "🎨" },
          { label: "القيمة الإجمالية", value: `${totalValue.toLocaleString()} ر.س`, icon: "💰" },
          { label: "متوسط النمو", value: `+${avgGrowth}%`, icon: "📈" },
          { label: "أعمال مشفرة", value: artworks.filter((a) => a.encrypted).length, icon: "🔐" },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              background: "rgba(255,255,255,0.025)",
              borderRadius: 12,
              padding: "14px 16px",
              border: "1px solid rgba(255,255,255,0.07)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 22, marginBottom: 4 }}>{stat.icon}</div>
            <div style={{ fontSize: 18, fontWeight: 300, marginBottom: 2 }}>{stat.value}</div>
            <div style={{ fontSize: 10, opacity: 0.4, letterSpacing: "0.5px" }}>{stat.label}</div>
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
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 22,
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
      <div style={{ position: "relative", overflow: "hidden", height: 260 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={art.image}
          alt={art.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s ease",
            transform: hovered ? "scale(1.07)" : "scale(1)",
          }}
        />

        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%)",
            opacity: hovered ? 1 : 0.5,
            transition: "opacity 0.3s",
          }}
        />

        {/* Encryption badge */}
        {art.encrypted && (
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

        {/* Investment score badge */}
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            background: "rgba(0,0,0,0.65)",
            borderRadius: 8,
            padding: "4px 10px",
            fontSize: 11,
            color: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(4px)",
            border: "1px solid rgba(255,255,255,0.15)",
            fontFamily: "monospace",
          }}
        >
          ⭐ {art.investmentScore}
        </div>

        {/* Growth badge */}
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: 10,
            background: "rgba(0,0,0,0.65)",
            borderRadius: 6,
            padding: "3px 8px",
            fontSize: 11,
            color: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(4px)",
          }}
        >
          📈 +{art.priceGrowth}%
        </div>

        {/* Medium badge */}
        <div
          style={{
            position: "absolute",
            bottom: 10,
            right: 10,
            background: "rgba(0,0,0,0.65)",
            borderRadius: 6,
            padding: "3px 8px",
            fontSize: 10,
            color: "rgba(255,255,255,0.75)",
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
        <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 4 }}>{art.title}</div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 11,
            color: "rgba(255,255,255,0.45)",
            marginBottom: 4,
          }}
        >
          <span>{art.artist}</span>
          <span>{art.dimensions}</span>
        </div>
        <div
          style={{
            fontSize: 10,
            color: "rgba(255,255,255,0.3)",
            marginBottom: 12,
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
            marginBottom: 12,
          }}
        >
          <div style={{ fontSize: 20, fontWeight: 700, color: "white" }}>
            {art.price.toLocaleString()} ر.س
          </div>
          <div
            style={{
              fontSize: 10,
              color: art.encrypted ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.35)",
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
          maxWidth: 640,
          width: "92%",
          position: "relative",
          animation: "scale-in 0.2s ease",
          maxHeight: "90vh",
          overflowY: "auto",
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
            opacity: 0.5,
          }}
        >
          ×
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={art.image}
          alt={art.title}
          style={{ width: "100%", height: 280, objectFit: "cover", borderRadius: 12, marginBottom: 22 }}
        />
        <h3 style={{ fontSize: 22, fontWeight: 400, marginBottom: 16 }}>{art.title}</h3>

        {/* Investment metrics */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 10,
            marginBottom: 18,
          }}
        >
          {[
            { label: "درجة الاستثمار", value: `${art.investmentScore}/10`, icon: "⭐" },
            { label: "نمو السعر", value: `+${art.priceGrowth}%`, icon: "📈" },
            { label: "المشاهدات", value: art.views?.toLocaleString() || "0", icon: "👁" },
          ].map((m) => (
            <div
              key={m.label}
              style={{
                background: "rgba(255,255,255,0.04)",
                borderRadius: 10,
                padding: "12px",
                textAlign: "center",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div style={{ fontSize: 20, marginBottom: 4 }}>{m.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 300, marginBottom: 2 }}>{m.value}</div>
              <div style={{ fontSize: 10, opacity: 0.4 }}>{m.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
          {[
            { label: "الفنان", value: art.artist },
            { label: "الأسلوب", value: art.style },
            { label: "الوسيط", value: art.medium },
            { label: "الأبعاد", value: art.dimensions },
            { label: "السنة", value: String(art.year) },
            { label: "المعرف", value: art.id },
            { label: "التشفير", value: art.encrypted ? "AES-256-GCM ✓" : "غير مشفر" },
            { label: "الحالة", value: "متاح للبيع" },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                background: "rgba(255,255,255,0.03)",
                borderRadius: 8,
                padding: "10px 14px",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div style={{ fontSize: 10, opacity: 0.4, marginBottom: 3 }}>{item.label}</div>
              <div style={{ fontSize: 13, fontFamily: item.label === "المعرف" || item.label === "التشفير" ? "monospace" : "inherit" }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* Rights notice */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 10,
            padding: "12px 16px",
            fontSize: 12,
            color: "rgba(255,255,255,0.45)",
            marginBottom: 20,
            lineHeight: 1.6,
          }}
        >
          🛡️ هذا العمل محمي بموجب قوانين حقوق الملكية الفكرية وتقنية البلوكتشين. أي نسخ أو توزيع غير مصرح به يُعدّ جريمة قانونية.
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 24, fontWeight: 700 }}>{art.price.toLocaleString()} ر.س</div>
            <div style={{ fontSize: 11, opacity: 0.4, marginTop: 2 }}>
              توقع: {(art.price * (1 + art.priceGrowth / 100)).toLocaleString()} ر.س بعد سنة
            </div>
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
            اقتناء الآن
          </button>
        </div>
      </div>
    </div>
  );
}
