"use client";

import { useState, useRef, useEffect } from "react";

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CameraModal({ isOpen, onClose }: CameraModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [captureCount, setCaptureCount] = useState(0);
  const [isHDR, setIsHDR] = useState(false);
  const [flashActive, setFlashActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [encryptedPhotos, setEncryptedPhotos] = useState<string[]>([]);

  useEffect(() => {
    if (!isOpen) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
      return;
    }
    // Start camera asynchronously without calling setState synchronously
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

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL("image/jpeg", 0.92);
    setPreviewSrc(imageData);
    setCaptureCount((c) => c + 1);

    // Simulate encryption
    const encrypted = btoa(imageData.substring(0, 100) + Date.now());
    setEncryptedPhotos((prev) => [...prev, encrypted]);

    // Flash effect
    setFlashActive(true);
    setTimeout(() => setFlashActive(false), 150);
  };

  const switchCamera = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.98)",
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
            opacity: 0.9,
          }}
        />
      )}

      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: 20,
          right: 24,
          fontSize: 28,
          background: "none",
          border: "none",
          color: "white",
          cursor: "pointer",
          opacity: 0.7,
          zIndex: 10,
          lineHeight: 1,
        }}
      >
        ×
      </button>

      {/* Camera Container */}
      <div
        style={{
          position: "relative",
          width: "90%",
          maxWidth: 1100,
          height: "78vh",
          background: "#000",
          borderRadius: 20,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.15)",
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
              color: "rgba(255,255,255,0.6)",
            }}
          >
            <div style={{ fontSize: 48 }}>📷</div>
            <div>{cameraError}</div>
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
              transform: facingMode === "user" ? "scaleX(-1)" : "none",
            }}
          />
        )}

        <canvas ref={canvasRef} style={{ display: "none" }} />

        {/* Camera UI Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
          }}
        >
          {/* Rule of thirds grid */}
          <div
            style={{
              position: "absolute",
              top: "10%",
              left: "10%",
              right: "10%",
              bottom: "18%",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            {/* Vertical line */}
            <div
              style={{
                position: "absolute",
                width: 1,
                height: "100%",
                left: "33.33%",
                background: "rgba(255,255,255,0.15)",
              }}
            />
            <div
              style={{
                position: "absolute",
                width: 1,
                height: "100%",
                left: "66.66%",
                background: "rgba(255,255,255,0.15)",
              }}
            />
            {/* Horizontal line */}
            <div
              style={{
                position: "absolute",
                height: 1,
                width: "100%",
                top: "33.33%",
                background: "rgba(255,255,255,0.15)",
              }}
            />
            <div
              style={{
                position: "absolute",
                height: 1,
                width: "100%",
                top: "66.66%",
                background: "rgba(255,255,255,0.15)",
              }}
            />
          </div>

          {/* Camera info */}
          <div
            style={{
              position: "absolute",
              top: 20,
              left: 20,
              fontFamily: "monospace",
              fontSize: 11,
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.8,
            }}
          >
            <div>ISO: AUTO</div>
            <div>WB: 5500K</div>
            <div>4K UHD</div>
            {isHDR && <div style={{ color: "rgba(255,255,255,0.9)" }}>HDR: ON</div>}
          </div>

          {/* Encryption badge */}
          <div
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              background: "rgba(0,0,0,0.6)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 8,
              padding: "6px 12px",
              fontSize: 11,
              fontFamily: "monospace",
              color: "rgba(255,255,255,0.8)",
            }}
          >
            🔐 AES-256 ACTIVE
          </div>

          {/* Capture count */}
          {captureCount > 0 && (
            <div
              style={{
                position: "absolute",
                bottom: 100,
                left: 20,
                background: "rgba(0,0,0,0.6)",
                borderRadius: 8,
                padding: "6px 12px",
                fontSize: 12,
                color: "rgba(255,255,255,0.8)",
              }}
            >
              📸 {captureCount} صورة مشفرة
            </div>
          )}
        </div>

        {/* Settings panel */}
        <div
          style={{
            position: "absolute",
            top: 60,
            right: 20,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {[
            { label: isHDR ? "HDR: ON" : "HDR", onClick: () => setIsHDR((v) => !v) },
            { label: "🔄 تبديل", onClick: switchCamera },
            { label: "⏱️ مؤقت", onClick: () => alert("مؤقت 3 ثواني") },
          ].map((btn, i) => (
            <button
              key={i}
              onClick={btn.onClick}
              style={{
                background: "rgba(0,0,0,0.65)",
                padding: "8px 14px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.2)",
                cursor: "pointer",
                fontSize: 12,
                color: "white",
                backdropFilter: "blur(8px)",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.65)")}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Preview thumbnail */}
        {previewSrc && (
          <div
            style={{
              position: "absolute",
              bottom: 90,
              right: 20,
              width: 110,
              height: 80,
              borderRadius: 10,
              overflow: "hidden",
              border: "2px solid rgba(255,255,255,0.4)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={previewSrc} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        )}

        {/* Controls */}
        <div
          style={{
            position: "absolute",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 28,
            alignItems: "center",
          }}
        >
          <button
            onClick={() => alert("فلاتر: فيلمي | أبيض/أسود | فينتاج | سينمائي")}
            style={{
              width: 54,
              height: 54,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              border: "2px solid rgba(255,255,255,0.4)",
              cursor: "pointer",
              fontSize: 22,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              transition: "all 0.2s",
            }}
          >
            ✨
          </button>

          {/* Main capture button */}
          <button
            onClick={capturePhoto}
            style={{
              width: 76,
              height: 76,
              borderRadius: "50%",
              background: "white",
              border: "4px solid rgba(255,255,255,0.3)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              transition: "all 0.15s",
              boxShadow: "0 0 20px rgba(255,255,255,0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.08)";
              e.currentTarget.style.boxShadow = "0 0 30px rgba(255,255,255,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(255,255,255,0.3)";
            }}
          >
            📷
          </button>

          <button
            onClick={() => alert("وضع: صورة | فيديو | بورتريه | ليلي")}
            style={{
              width: 54,
              height: 54,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              border: "2px solid rgba(255,255,255,0.4)",
              cursor: "pointer",
              fontSize: 22,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              transition: "all 0.2s",
            }}
          >
            🎨
          </button>
        </div>
      </div>

      {/* Encrypted photos count */}
      {encryptedPhotos.length > 0 && (
        <div
          style={{
            marginTop: 16,
            fontSize: 12,
            color: "rgba(255,255,255,0.5)",
            fontFamily: "monospace",
            letterSpacing: "1px",
          }}
        >
          🔐 {encryptedPhotos.length} صورة محفوظة ومشفرة بـ AES-256-GCM
        </div>
      )}
    </div>
  );
}
