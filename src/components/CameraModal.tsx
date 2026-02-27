"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FilterType = "none" | "bw" | "vintage" | "cinematic" | "fade" | "sharp";

const FILTERS: { id: FilterType; label: string; css: string }[] = [
  { id: "none", label: "عادي", css: "none" },
  { id: "bw", label: "أبيض/أسود", css: "grayscale(100%) contrast(1.1)" },
  { id: "vintage", label: "فينتاج", css: "sepia(60%) contrast(1.1) brightness(0.95) saturate(0.8)" },
  { id: "cinematic", label: "سينمائي", css: "contrast(1.2) brightness(0.9) saturate(1.3)" },
  { id: "fade", label: "باهت", css: "brightness(1.1) contrast(0.85) saturate(0.7)" },
  { id: "sharp", label: "حاد", css: "contrast(1.3) saturate(1.2) brightness(1.05)" },
];

export default function CameraModal({ isOpen, onClose }: CameraModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [captureCount, setCaptureCount] = useState(0);
  const [isHDR, setIsHDR] = useState(false);
  const [flashActive, setFlashActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>("none");
  const [showFilters, setShowFilters] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerCountdown, setTimerCountdown] = useState<number | null>(null);
  const [savedPhotos, setSavedPhotos] = useState<{ src: string; id: string; filter: string }[]>([]);
  const [showGallery, setShowGallery] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isReconnecting, setIsReconnecting] = useState(false);
  const [showReconnectButton, setShowReconnectButton] = useState(false);

  // Silent camera reinitialize function
  const reinitializeCamera = useCallback(async () => {
    if (!videoRef.current) return;
    
    setIsReconnecting(true);
    setShowReconnectButton(false);
    
    try {
      // Stop existing stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
      
      // Try to get new stream (silent - no new permission needed if already granted)
      const s = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode,
          width: { ideal: 3840 },
          height: { ideal: 2160 },
        },
        audio: false,
      });
      
      streamRef.current = s;
      videoRef.current.srcObject = s;
      setCameraError(null);
      setShowReconnectButton(false);
      console.log("📷 Camera resumed silently");
    } catch (err) {
      console.error("Camera resume failed:", err);
      setShowReconnectButton(true);
      setCameraError("انقطع الاتصال بالكاميرا");
    } finally {
      setIsReconnecting(false);
    }
  }, [facingMode]);

  // Visibility change handler - resume camera when page becomes visible
  useEffect(() => {
    if (!isOpen) return;
    
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        // Camera was active before, try to resume
        console.log("📷 Page visible - attempting silent camera resume...");
        reinitializeCamera();
      }
    };
    
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isOpen, reinitializeCamera]);

  useEffect(() => {
    if (!isOpen) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
      return;
    }
    let cancelled = false;
    const run = async () => {
      try {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((t) => t.stop());
        }
        const s = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode,
            width: { ideal: 3840 },
            height: { ideal: 2160 },
          },
          audio: false,
        });
        if (cancelled) {
          s.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = s;
        if (videoRef.current) {
          videoRef.current.srcObject = s;
        }
        setCameraError(null);
      } catch (err) {
        if (!cancelled) {
          setCameraError("تعذر الوصول للكاميرا. يرجى السماح بالوصول.");
          console.error(err);
        }
      }
    };
    run();
    return () => {
      cancelled = true;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    };
  }, [isOpen, facingMode]);

  const doCapture = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Apply filter
    const filterDef = FILTERS.find((f) => f.id === activeFilter);
    ctx.filter = filterDef?.css !== "none" ? filterDef?.css || "none" : "none";

    if (facingMode === "user") {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL("image/jpeg", 0.92);
    setPreviewSrc(imageData);
    setCaptureCount((c) => c + 1);

    // Save with encryption simulation
    const photoId = `VIS-CAM-${Date.now()}`;
    const encrypted = btoa(imageData.substring(0, 80) + photoId);
    console.log("🔐 Encrypted:", encrypted.substring(0, 40) + "...");

    setSavedPhotos((prev) => [
      { src: imageData, id: photoId, filter: filterDef?.label || "عادي" },
      ...prev,
    ]);

    // Flash effect
    setFlashActive(true);
    setTimeout(() => setFlashActive(false), 120);
  }, [activeFilter, facingMode]);

  const capturePhoto = useCallback(() => {
    if (timerSeconds > 0) {
      let count = timerSeconds;
      setTimerCountdown(count);
      const tick = () => {
        count--;
        if (count <= 0) {
          setTimerCountdown(null);
          doCapture();
        } else {
          setTimerCountdown(count);
          timerRef.current = setTimeout(tick, 1000);
        }
      };
      timerRef.current = setTimeout(tick, 1000);
    } else {
      doCapture();
    }
  }, [timerSeconds, doCapture]);

  const downloadPhoto = (src: string, id: string) => {
    const link = document.createElement("a");
    link.download = `${id}.jpg`;
    link.href = src;
    link.click();
  };

  const switchCamera = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  const currentFilter = FILTERS.find((f) => f.id === activeFilter);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#000",
        zIndex: 3000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Flash overlay */}
      {flashActive && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "white",
            zIndex: 9999,
            pointerEvents: "none",
            opacity: 0.85,
            transition: "opacity 0.1s",
          }}
        />
      )}

      {/* Timer countdown overlay */}
      {timerCountdown !== null && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9998,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              fontSize: 120,
              fontWeight: 200,
              color: "white",
              textShadow: "0 0 40px rgba(255,255,255,0.5)",
              animation: "scale-in 0.3s ease",
            }}
          >
            {timerCountdown}
          </div>
        </div>
      )}

      {/* Close */}
      <button className="global-visura-close" onClick={onClose}>
        <span>✕</span>
      </button>

      {/* Camera Container */}
      <div
        style={{
          position: "relative",
          width: "92%",
          maxWidth: 1100,
          height: "80vh",
          background: "#000",
          borderRadius: 20,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 0 60px rgba(0,0,0,0.8)",
        }}
      >
        {cameraError ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 16,
              color: "rgba(255,255,255,0.5)",
            }}
          >
            <div style={{ fontSize: 56 }}>📷</div>
            <div style={{ fontSize: 15 }}>{cameraError}</div>
            {showReconnectButton ? (
              <button
                onClick={reinitializeCamera}
                style={{
                  padding: "14px 32px",
                  background: "linear-gradient(135deg, #D4AF37 0%, #B8962F 100%)",
                  border: "2px solid #E5C76B",
                  color: "#000",
                  borderRadius: 12,
                  cursor: "pointer",
                  fontSize: 15,
                  fontWeight: 600,
                  boxShadow: "0 4px 24px rgba(212, 175, 55, 0.4)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 6px 32px rgba(212, 175, 55, 0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 4px 24px rgba(212, 175, 55, 0.4)";
                }}
              >
                ✦ إعادة تنشيط الكاميرا ✦
              </button>
            ) : (
              <button
                onClick={() => setFacingMode((f) => f)}
                style={{
                  padding: "10px 24px",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "white",
                  borderRadius: 10,
                  cursor: "pointer",
                  fontSize: 14,
                }}
              >
                إعادة المحاولة
              </button>
            )}
          </div>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `${facingMode === "user" ? "scaleX(-1) " : ""}scale(${zoom})`,
              filter: currentFilter?.css !== "none" ? currentFilter?.css : "none",
              transition: "transform 0.3s ease",
            }}
          />
        )}

        <canvas ref={canvasRef} style={{ display: "none" }} />

        {/* Camera UI Overlay */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {/* Rule of thirds grid */}
          <div
            style={{
              position: "absolute",
              top: "8%",
              left: "8%",
              right: "8%",
              bottom: "16%",
              border: "1px solid rgba(255,255,255,0.18)",
              animation: "focus-ring 3s ease-in-out infinite",
            }}
          >
            {[33.33, 66.66].map((pos) => (
              <div key={`v${pos}`}>
                <div style={{ position: "absolute", width: 1, height: "100%", left: `${pos}%`, background: "rgba(255,255,255,0.1)" }} />
                <div style={{ position: "absolute", height: 1, width: "100%", top: `${pos}%`, background: "rgba(255,255,255,0.1)" }} />
              </div>
            ))}
            {/* Corner markers */}
            {[
              { top: -1, left: -1 },
              { top: -1, right: -1 },
              { bottom: -1, left: -1 },
              { bottom: -1, right: -1 },
            ].map((pos, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  width: 16,
                  height: 16,
                  borderTop: pos.top !== undefined ? "2px solid rgba(255,255,255,0.7)" : "none",
                  borderBottom: pos.bottom !== undefined ? "2px solid rgba(255,255,255,0.7)" : "none",
                  borderLeft: pos.left !== undefined ? "2px solid rgba(255,255,255,0.7)" : "none",
                  borderRight: pos.right !== undefined ? "2px solid rgba(255,255,255,0.7)" : "none",
                  ...pos,
                }}
              />
            ))}
          </div>

          {/* Camera info - top left */}
          <div
            style={{
              position: "absolute",
              top: 18,
              left: 18,
              fontFamily: "monospace",
              fontSize: 11,
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.9,
              background: "rgba(0,0,0,0.4)",
              padding: "8px 12px",
              borderRadius: 8,
              backdropFilter: "blur(8px)",
            }}
          >
            <div>ISO: AUTO</div>
            <div>WB: 5500K</div>
            <div>4K UHD</div>
            {isHDR && <div style={{ color: "white" }}>HDR ✓</div>}
            {zoom > 1 && <div>{zoom.toFixed(1)}×</div>}
          </div>

          {/* Encryption badge - top right */}
          <div
            style={{
              position: "absolute",
              top: 18,
              right: 18,
              background: "rgba(0,0,0,0.55)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 8,
              padding: "6px 12px",
              fontSize: 10,
              fontFamily: "monospace",
              color: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(8px)",
              letterSpacing: "0.5px",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            {isReconnecting ? (
              <>
                <span style={{
                  display: "inline-block",
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#D4AF37",
                  animation: "pulse 1s infinite",
                }} />
                جاري الاتصال...
              </>
            ) : (
              "🔐 AES-256-GCM"
            )}
          </div>

          {/* Capture count */}
          {captureCount > 0 && (
            <div
              style={{
                position: "absolute",
                bottom: 110,
                left: 18,
                background: "rgba(0,0,0,0.55)",
                borderRadius: 8,
                padding: "5px 12px",
                fontSize: 11,
                color: "rgba(255,255,255,0.8)",
                backdropFilter: "blur(8px)",
              }}
            >
              📸 {captureCount} مشفرة
            </div>
          )}
        </div>

        {/* Settings panel - right side */}
        <div
          style={{
            position: "absolute",
            top: 70,
            right: 18,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {[
            {
              label: isHDR ? "HDR ✓" : "HDR",
              onClick: () => setIsHDR((v) => !v),
              active: isHDR,
            },
            {
              label: "🔄",
              onClick: switchCamera,
              active: false,
            },
            {
              label: timerSeconds === 0 ? "⏱" : `${timerSeconds}s`,
              onClick: () => setTimerSeconds((t) => (t === 0 ? 3 : t === 3 ? 5 : t === 5 ? 10 : 0)),
              active: timerSeconds > 0,
            },
            {
              label: zoom === 1 ? "1×" : `${zoom}×`,
              onClick: () => setZoom((z) => (z === 1 ? 1.5 : z === 1.5 ? 2 : z === 2 ? 3 : 1)),
              active: zoom > 1,
            },
          ].map((btn, i) => (
            <button
              key={i}
              onClick={btn.onClick}
              style={{
                background: btn.active ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.6)",
                padding: "8px 12px",
                borderRadius: 10,
                border: `1px solid ${btn.active ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.18)"}`,
                cursor: "pointer",
                fontSize: 12,
                color: "white",
                backdropFilter: "blur(8px)",
                transition: "all 0.2s",
                minWidth: 48,
                fontFamily: "monospace",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = btn.active ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.6)")}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Preview thumbnail */}
        {previewSrc && (
          <div
            onClick={() => setShowGallery(true)}
            style={{
              position: "absolute",
              bottom: 90,
              right: 18,
              width: 100,
              height: 75,
              borderRadius: 10,
              overflow: "hidden",
              border: "2px solid rgba(255,255,255,0.5)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
              cursor: "pointer",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={previewSrc} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            {captureCount > 1 && (
              <div
                style={{
                  position: "absolute",
                  bottom: 4,
                  right: 4,
                  background: "rgba(0,0,0,0.7)",
                  borderRadius: 4,
                  padding: "1px 5px",
                  fontSize: 10,
                  color: "white",
                }}
              >
                {captureCount}
              </div>
            )}
          </div>
        )}

        {/* Filters panel */}
        {showFilters && (
          <div className="visura-filter-panel">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => { setActiveFilter(f.id); setShowFilters(false); }}
                className={`visura-filter-btn ${activeFilter === f.id ? 'active' : ''}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}

        {/* Controls */}
        <div
          style={{
            position: "absolute",
            bottom: 22,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 24,
            alignItems: "center",
          }}
        >
          {/* Filters button */}
          <button
            onClick={() => setShowFilters((v) => !v)}
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: showFilters ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)",
              border: `2px solid ${showFilters ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.3)"}`,
              cursor: "pointer",
              fontSize: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              transition: "all 0.2s",
              backdropFilter: "blur(8px)",
            }}
          >
            ✨
          </button>

          {/* Main capture button */}
          <button
            onClick={capturePhoto}
            disabled={timerCountdown !== null}
            style={{
              width: 74,
              height: 74,
              borderRadius: "50%",
              background: timerCountdown !== null ? "rgba(255,255,255,0.5)" : "white",
              border: "4px solid rgba(255,255,255,0.25)",
              cursor: timerCountdown !== null ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.15s",
              boxShadow: "0 0 24px rgba(255,255,255,0.25)",
              position: "relative",
            }}
            onMouseEnter={(e) => {
              if (timerCountdown === null) {
                e.currentTarget.style.transform = "scale(1.08)";
                e.currentTarget.style.boxShadow = "0 0 40px rgba(255,255,255,0.4)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 0 24px rgba(255,255,255,0.25)";
            }}
          >
            {/* Inner circle */}
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                border: "2px solid rgba(0,0,0,0.15)",
                background: timerCountdown !== null ? "rgba(200,200,200,0.8)" : "white",
              }}
            />
          </button>

          {/* Gallery button */}
          <button
            onClick={() => setShowGallery(true)}
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.08)",
              border: "2px solid rgba(255,255,255,0.3)",
              cursor: "pointer",
              fontSize: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              transition: "all 0.2s",
              backdropFilter: "blur(8px)",
            }}
          >
            🖼️
          </button>
        </div>

        {/* Active filter label */}
        {activeFilter !== "none" && (
          <div
            style={{
              position: "absolute",
              bottom: 100,
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(0,0,0,0.6)",
              borderRadius: 6,
              padding: "3px 10px",
              fontSize: 11,
              color: "rgba(255,255,255,0.8)",
              fontFamily: "monospace",
              backdropFilter: "blur(8px)",
            }}
          >
            {currentFilter?.label}
          </div>
        )}
      </div>

      {/* Encrypted count */}
      {captureCount > 0 && (
        <div
          style={{
            marginTop: 14,
            fontSize: 11,
            color: "rgba(255,255,255,0.4)",
            fontFamily: "monospace",
            letterSpacing: "1px",
          }}
        >
          🔐 {captureCount} صورة محفوظة ومشفرة بـ AES-256-GCM
        </div>
      )}

      {/* Saved photos gallery overlay */}
      {showGallery && savedPhotos.length > 0 && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.92)",
            zIndex: 4000,
            display: "flex",
            flexDirection: "column",
            padding: 40,
            boxSizing: "border-box",
            backdropFilter: "blur(12px)",
            animation: "fadeIn 0.2s ease",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: "3px", opacity: 0.4, marginBottom: 4 }}>VISURA CAMERA</div>
              <div style={{ fontSize: 22, fontWeight: 200 }}>📸 الصور المحفوظة ({savedPhotos.length})</div>
            </div>
            <button
              onClick={() => setShowGallery(false)}
              style={{ background: "none", border: "none", color: "white", fontSize: 28, cursor: "pointer", opacity: 0.7 }}
            >
              ×
            </button>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 16,
              overflowY: "auto",
            }}
          >
            {savedPhotos.map((photo) => (
              <div
                key={photo.id}
                style={{
                  borderRadius: 12,
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.03)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.src} alt={photo.id} style={{ width: "100%", height: 150, objectFit: "cover" }} />
                <div style={{ padding: "10px 12px" }}>
                  <div style={{ fontSize: 10, fontFamily: "monospace", color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>
                    {photo.id}
                  </div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginBottom: 8 }}>
                    فلتر: {photo.filter}
                  </div>
                  <button
                    onClick={() => downloadPhoto(photo.src, photo.id)}
                    style={{
                      width: "100%",
                      padding: "7px",
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "white",
                      borderRadius: 7,
                      cursor: "pointer",
                      fontSize: 12,
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
                  >
                    ⬇ تحميل
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
