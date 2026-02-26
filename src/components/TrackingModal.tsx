"use client";

import { useState } from "react";

interface TrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TrackingStep {
  status: string;
  location: string;
  time: string;
  done: boolean;
}

const mockTracking: Record<string, { title: string; steps: TrackingStep[] }> = {
  "VIS-001": {
    title: "غروب الرياض - أحمد العلي",
    steps: [
      { status: "تم الشراء وتأكيد الدفع", location: "الرياض", time: "10:30 ص", done: true },
      { status: "جاري التحضير والتغليف", location: "مستودع VISURA", time: "12:00 م", done: true },
      { status: "تم التسليم للشحن", location: "مركز الشحن", time: "02:00 م", done: true },
      { status: "في الطريق إليك", location: "الرياض - حي النزهة", time: "04:30 م", done: false },
      { status: "تم التسليم", location: "عنوانك", time: "—", done: false },
    ],
  },
  "ART-001": {
    title: "رقصة الألوان - منى الشمري",
    steps: [
      { status: "تم الشراء وتأكيد الدفع", location: "جدة", time: "09:00 ص", done: true },
      { status: "جاري التحضير والتغليف", location: "مستودع VISURA", time: "11:00 ص", done: true },
      { status: "تم التسليم للشحن", location: "مركز الشحن", time: "—", done: false },
      { status: "في الطريق إليك", location: "—", time: "—", done: false },
      { status: "تم التسليم", location: "عنوانك", time: "—", done: false },
    ],
  },
};

export default function TrackingModal({ isOpen, onClose }: TrackingModalProps) {
  const [trackingId, setTrackingId] = useState("");
  const [result, setResult] = useState<(typeof mockTracking)[string] | null>(null);
  const [notFound, setNotFound] = useState(false);

  if (!isOpen) return null;

  const handleTrack = () => {
    const id = trackingId.trim().toUpperCase();
    if (mockTracking[id]) {
      setResult(mockTracking[id]);
      setNotFound(false);
    } else {
      setResult(null);
      setNotFound(true);
    }
  };

  const currentStep = result?.steps.findIndex((s) => !s.done) ?? -1;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,5,12,0.98)",
        zIndex: 3000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 40px 120px",
        boxSizing: "border-box",
        overflowY: "auto",
      }}
    >
      {/* Close */}
      <button
        className="global-visura-close"
        onClick={onClose}
        aria-label="Close"
      >
        <span className="close-icon">✕</span>
      </button>

      <div style={{ maxWidth: 700, width: "100%" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 11, letterSpacing: "3px", opacity: 0.4, marginBottom: 6 }}>
            VISURA LOGISTICS
          </div>
          <h2 style={{ fontWeight: 200, fontSize: 26 }}>🚚 نظام التتبع والشحن</h2>
        </div>

        {/* Search */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            padding: 28,
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.08)",
            marginBottom: 28,
          }}
        >
          <div style={{ fontSize: 13, opacity: 0.6, marginBottom: 12 }}>
            أدخل رقم الطلب (مثال: VIS-001 أو ART-001)
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleTrack()}
              placeholder="رقم التتبع..."
              style={{
                flex: 1,
                padding: "14px 20px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 10,
                color: "white",
                fontSize: 15,
                outline: "none",
                fontFamily: "monospace",
                letterSpacing: "1px",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")}
            />
            <button
              onClick={handleTrack}
              style={{
                padding: "14px 28px",
                background: "white",
                color: "black",
                border: "none",
                borderRadius: 10,
                cursor: "pointer",
                fontWeight: 700,
                fontSize: 15,
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.85)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
            >
              تتبع
            </button>
          </div>
        </div>

        {/* Not found */}
        {notFound && (
          <div
            style={{
              textAlign: "center",
              padding: 32,
              background: "rgba(255,255,255,0.03)",
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <div>لم يتم العثور على رقم التتبع</div>
            <div style={{ fontSize: 12, marginTop: 8, opacity: 0.5 }}>
              جرب: VIS-001 أو ART-001
            </div>
          </div>
        )}

        {/* Result */}
        {result && (
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.1)",
              overflow: "hidden",
            }}
          >
            {/* Order header */}
            <div
              style={{
                padding: "20px 24px",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontSize: 11, opacity: 0.4, marginBottom: 4, fontFamily: "monospace" }}>
                  {trackingId.toUpperCase()}
                </div>
                <div style={{ fontSize: 17, fontWeight: 500 }}>{result.title}</div>
              </div>
              <div
                style={{
                  padding: "6px 14px",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: 20,
                  fontSize: 12,
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                {currentStep === -1 ? "✅ تم التسليم" : "🚚 قيد الشحن"}
              </div>
            </div>

            {/* Steps */}
            <div style={{ padding: "24px" }}>
              {result.steps.map((step, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 16,
                    marginBottom: i < result.steps.length - 1 ? 0 : 0,
                    position: "relative",
                  }}
                >
                  {/* Line */}
                  {i < result.steps.length - 1 && (
                    <div
                      style={{
                        position: "absolute",
                        left: 11,
                        top: 24,
                        width: 2,
                        height: "calc(100% + 8px)",
                        background: step.done
                          ? "rgba(255,255,255,0.3)"
                          : "rgba(255,255,255,0.08)",
                      }}
                    />
                  )}

                  {/* Dot */}
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: step.done
                        ? "white"
                        : i === currentStep
                        ? "rgba(255,255,255,0.3)"
                        : "rgba(255,255,255,0.08)",
                      border: `2px solid ${step.done ? "white" : "rgba(255,255,255,0.2)"}`,
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 10,
                      zIndex: 1,
                      animation: i === currentStep ? "pulse-dot 1.5s infinite" : "none",
                    }}
                  >
                    {step.done ? "✓" : ""}
                  </div>

                  {/* Content */}
                  <div style={{ paddingBottom: 24, flex: 1 }}>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: step.done ? 500 : 400,
                        opacity: step.done ? 1 : i === currentStep ? 0.8 : 0.4,
                        marginBottom: 4,
                      }}
                    >
                      {step.status}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        opacity: 0.4,
                        display: "flex",
                        gap: 16,
                        fontFamily: "monospace",
                      }}
                    >
                      <span>📍 {step.location}</span>
                      <span>🕐 {step.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Security note */}
        <div
          style={{
            marginTop: 24,
            padding: "14px 20px",
            background: "rgba(255,255,255,0.02)",
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.06)",
            fontSize: 12,
            color: "rgba(255,255,255,0.4)",
            textAlign: "center",
          }}
        >
          🔐 جميع المعاملات مشفرة ومحمية | حقوق الملكية مسجلة على البلوكتشين
        </div>
      </div>
    </div>
  );
}
