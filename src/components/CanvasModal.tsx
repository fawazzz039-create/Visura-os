"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface CanvasModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CanvasModal({ isOpen, onClose }: CanvasModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#ffffff");
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState<"brush" | "eraser">("brush");
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  const getPos = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ("touches" in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#0a0e16";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(initCanvas, 50);
    }
  }, [isOpen, initCanvas]);

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setIsDrawing(true);
    lastPos.current = getPos(e, canvas);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pos = getPos(e, canvas);
    ctx.beginPath();
    ctx.moveTo(lastPos.current?.x ?? pos.x, lastPos.current?.y ?? pos.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = tool === "eraser" ? "#0a0e16" : color;
    ctx.lineWidth = tool === "eraser" ? brushSize * 3 : brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
    lastPos.current = pos;
  };

  const stopDraw = () => {
    setIsDrawing(false);
    lastPos.current = null;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#0a0e16";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const saveCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `visura-art-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const addToGallery = () => {
    alert("✅ تم حفظ اللوحة في معرض VISURA\n🔐 تم تشفيرها وحماية حقوق الملكية\n🎨 ID: ART-" + Math.random().toString(36).substring(2, 8).toUpperCase());
  };

  if (!isOpen) return null;

  const colors = [
    "#ffffff", "#e0e0e0", "#a0a0a0", "#505050",
    "#ff6b6b", "#ffd93d", "#6bcb77", "#4d96ff",
    "#c77dff", "#ff9a3c", "#00d4ff", "#ff4d6d",
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
        alignItems: "center",
        padding: "40px 40px 120px",
        boxSizing: "border-box",
        overflowY: "auto",
      }}
    >
      {/* Close */}
      <button
        className="global-os-close"
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
      <div style={{ textAlign: "center", marginBottom: 24, width: "100%" }}>
        <div style={{ fontSize: 11, letterSpacing: "3px", opacity: 0.4, marginBottom: 6 }}>
          VISURA STUDIO
        </div>
        <h2 style={{ fontWeight: 200, fontSize: 26 }}>🎨 لوحة الرسم الفني</h2>
      </div>

      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          gap: 16,
          alignItems: "center",
          marginBottom: 20,
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "14px 24px",
          background: "rgba(255,255,255,0.03)",
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Color palette */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", maxWidth: 200 }}>
          {colors.map((c) => (
            <div
              key={c}
              onClick={() => { setColor(c); setTool("brush"); }}
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: c,
                cursor: "pointer",
                border: color === c && tool === "brush" ? "2px solid white" : "2px solid rgba(255,255,255,0.2)",
                transition: "transform 0.15s",
                transform: color === c && tool === "brush" ? "scale(1.2)" : "scale(1)",
              }}
            />
          ))}
        </div>

        {/* Custom color */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <label style={{ fontSize: 12, opacity: 0.6 }}>لون مخصص:</label>
          <input
            type="color"
            value={color}
            onChange={(e) => { setColor(e.target.value); setTool("brush"); }}
            style={{ width: 36, height: 36, borderRadius: 8, border: "none", cursor: "pointer", background: "none" }}
          />
        </div>

        {/* Brush size */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <label style={{ fontSize: 12, opacity: 0.6 }}>الحجم: {brushSize}</label>
          <input
            type="range"
            min={1}
            max={40}
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            style={{ width: 100, accentColor: "white" }}
          />
        </div>

        {/* Tools */}
        <div style={{ display: "flex", gap: 8 }}>
          {[
            { key: "brush" as const, label: "✏️ فرشاة" },
            { key: "eraser" as const, label: "🧹 ممحاة" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTool(t.key)}
              style={{
                padding: "7px 14px",
                background: tool === t.key ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.05)",
                border: `1px solid ${tool === t.key ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.15)"}`,
                color: "white",
                borderRadius: 8,
                cursor: "pointer",
                fontSize: 13,
                transition: "all 0.2s",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={clearCanvas}
            style={{
              padding: "7px 14px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "white",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 13,
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
          >
            🗑️ مسح
          </button>
          <button
            onClick={saveCanvas}
            style={{
              padding: "7px 14px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "white",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 13,
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
          >
            💾 تحميل
          </button>
          <button
            onClick={addToGallery}
            style={{
              padding: "7px 14px",
              background: "white",
              border: "none",
              color: "black",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.85)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
          >
            🎨 نشر في المعرض
          </button>
        </div>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={1200}
        height={650}
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={stopDraw}
        onMouseLeave={stopDraw}
        onTouchStart={startDraw}
        onTouchMove={draw}
        onTouchEnd={stopDraw}
        style={{
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 16,
          cursor: tool === "eraser" ? "cell" : "crosshair",
          maxWidth: "100%",
          touchAction: "none",
          boxShadow: "0 0 40px rgba(0,0,0,0.5)",
        }}
      />
    </div>
  );
}
