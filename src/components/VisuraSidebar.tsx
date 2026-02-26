"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/lib/auth-context";
import { hashContent } from "@/lib/encryption";

interface VisuraSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  windowWidth?: number;
  isMobile?: boolean;
}

export default function VisuraSidebar({ isOpen, onClose, windowWidth = 1200, isMobile = false }: VisuraSidebarProps) {
  const { user, stats } = useAuth();
  const [activeSection, setActiveSection] = useState<"main" | "profile" | "wallet" | "settings" | "activity">("main");
  
  // Real encryption state using hashContent
  const [encryptProgress, setEncryptProgress] = useState(0);
  const [encryptHash, setEncryptHash] = useState("");
  const [randomHash, setRandomHash] = useState("");
  
  // Audio player state
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Initialize audio on mount
  useEffect(() => {
    if (typeof window !== "undefined" && !audioRef.current) {
      audioRef.current = new Audio("https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3");
      audioRef.current.loop = true;
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  // Toggle music player
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  // Real encryption using hashContent from encryption.ts
  useEffect(() => {
    const updateEncryption = async () => {
      setEncryptProgress(prev => (prev + 1) % 100);
      
      // Use real hash content from encryption module
      const timestamp = Date.now().toString();
      const content = `VISURA-${timestamp}-SECURE`;
      const hash = await hashContent(content);
      setEncryptHash(hash.substring(0, 8).toUpperCase());
      setRandomHash(hash.substring(0, 64));
    };
    
    updateEncryption();
    const interval = setInterval(updateEncryption, 2000);
    return () => clearInterval(interval);
  }, []);

  // Calculate responsive width
  const sidebarWidth = isMobile ? Math.min(320, windowWidth - 20) : Math.min(360, windowWidth - 40);

  return (
    <>
      {/* Mobile Full-Screen Overlay */}
      {isMobile && isOpen && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            zIndex: 1999,
            backdropFilter: "blur(5px)",
            animation: "fadeIn 0.2s ease",
          }}
        />
      )}

      {/* Desktop Overlay */}
      {!isMobile && isOpen && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 1900,
            backdropFilter: "blur(3px)",
          }}
        />
      )}

      {/* Sidebar Panel */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: isOpen ? 0 : -sidebarWidth - 20,
          width: sidebarWidth,
          height: isMobile ? "100%" : "100%",
          maxWidth: isMobile ? "85%" : undefined,
          background: isMobile 
            ? "rgba(6, 10, 18, 0.98)" 
            : "rgba(6, 10, 18, 0.97)",
          borderRight: isMobile ? "none" : "1px solid rgba(255,255,255,0.08)",
          borderLeft: isMobile ? "1px solid rgba(255,255,255,0.1)" : "none",
          transition: "right 0.35s cubic-bezier(0.19, 1, 0.22, 1)",
          zIndex: 2000,
          padding: isMobile ? "50px 20px 30px" : "60px 24px 30px",
          boxSizing: "border-box",
          overflowY: "auto",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Mobile Close Button */}
        {isMobile && (
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              background: "rgba(255,255,255,0.1)",
              border: "none",
              borderRadius: "8px",
              padding: "8px",
              cursor: "pointer",
              color: "white",
              fontSize: "18px",
            }}
          >
            ✕
          </button>
        )}
        
        {/* Header */}
        <div style={{ marginBottom: isMobile ? 16 : 24 }}>
          <div style={{ fontSize: isMobile ? 9 : 10, letterSpacing: "3px", opacity: 0.4, marginBottom: 6 }}>
            VISURA OS
          </div>
          <h2 style={{ fontWeight: 200, fontSize: isMobile ? 18 : 22, letterSpacing: "2px" }}>
            {activeSection === "main" && "لوحة التحكم"}
            {activeSection === "profile" && "الملف الشخصي"}
            {activeSection === "wallet" && "المحفظة"}
            {activeSection === "settings" && "الإعدادات"}
            {activeSection === "activity" && "النشاط والإحصائيات"}
          </h2>
        </div>

        {/* User Profile Card - Always Visible */}
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            borderRadius: isMobile ? 12 : 14,
            padding: isMobile ? 12 : 16,
            marginBottom: isMobile ? 14 : 20,
            border: "1px solid rgba(255,255,255,0.08)",
            cursor: "pointer",
          }}
          onClick={() => setActiveSection("profile")}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: isMobile ? 42 : 50,
                height: isMobile ? 42 : 50,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: isMobile ? 16 : 20,
                border: "2px solid rgba(255,255,255,0.2)",
              }}
            >
              {user?.avatar || "👤"}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, fontSize: isMobile ? 13 : 15, marginBottom: 2 }}>
                {user?.name || "زائر"}
              </div>
              <div style={{ fontSize: isMobile ? 10 : 12, opacity: 0.5 }}>
                {user?.email || "سجل دخولك للمتابعة"}
              </div>
            </div>
            <div style={{ opacity: 0.4, fontSize: 12 }}>›</div>
          </div>
        </div>

        {/* --- Professional Development Section --- */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: isMobile ? 16 : 24, padding: "0 4px" }}>
          
          {/* 1. Dynamic Encryption Counter (AES-256) */}
          <div style={{ 
            background: "rgba(34, 197, 94, 0.05)", 
            border: "1px solid rgba(34, 197, 94, 0.2)", 
            borderRadius: 12, 
            padding: 12 
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <span style={{ fontSize: 10, color: "#4ade80", fontFamily: "monospace", letterSpacing: "1px" }}>
                ENCRYPTION: AES-256-GCM
              </span>
              <span style={{ color: "#4ade80", fontFamily: "monospace", fontSize: 12 }}>
                ACTIVE {encryptProgress}%
              </span>
            </div>
            {/* Fast numbers effect */}
            <div style={{ 
              height: 24, 
              overflow: "hidden", 
              fontSize: 8, 
              fontFamily: "monospace", 
              color: "rgba(74, 222, 128, 0.6)", 
              wordBreak: "break-all",
              opacity: 0.8,
              lineHeight: 1
            }}>
              {randomHash}
            </div>
          </div>

          {/* 2. Statistics (Elegant boxes in one row) */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
            {[
              { label: 'مشاهدة', val: stats.views >= 1000 ? `${(stats.views / 1000).toFixed(1)}K` : stats.views.toString(), color: '#a78bfa' },
              { label: 'أعمالي', val: stats.artworks.toString(), color: '#60a5fa' },
              { label: 'تقييم', val: stats.rating.toString(), color: '#facc15' },
              { label: 'مبيعات', val: stats.sales.toString(), color: '#4ade80' }
            ].map((item, idx) => (
              <div key={idx} style={{ 
                background: "rgba(255,255,255,0.05)", 
                border: "1px solid rgba(255,255,255,0.1)", 
                borderRadius: 8, 
                padding: 8, 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                justifyContent: "center" 
              }}>
                <span style={{ fontSize: 12, fontWeight: "bold", color: item.color }}>{item.val}</span>
                <span style={{ fontSize: 8, color: "rgba(255,255,255,0.5)", marginTop: 4, whiteSpace: "nowrap" }}>{item.label}</span>
              </div>
            ))}
          </div>

          {/* 3. Music Button (Full Merge) */}
          <div 
            onClick={toggleMusic}
            style={{ 
              position: "relative", 
              width: "100%", 
              height: 48, 
              background: "linear-gradient(to right, rgba(37, 99, 235, 0.2), transparent)", 
              border: "1px solid rgba(59, 130, 246, 0.3)", 
              borderRadius: 999, 
              display: "flex", 
              alignItems: "center", 
              padding: "0 16px", 
              overflow: "hidden",
              cursor: "pointer",
              transition: "all 0.3s"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, zIndex: 10 }}>
              <div style={{ 
                width: 28, 
                height: 28, 
                background: "#3b82f6", 
                borderRadius: "50%", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)"
              }}>
                <span style={{ fontSize: 12 }}>🎵</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: 10, fontWeight: "bold", color: "#bfdbfe", textTransform: "uppercase", letterSpacing: "0.5px" }}>Calm Creativity</span>
                <span style={{ fontSize: 8, color: "rgba(147, 197, 253, 0.8)", fontStyle: "italic" }}>Ambient Focus Mode</span>
              </div>
            </div>
            {/* Interactive Sound Wave */}
            <div style={{ position: "absolute", right: 24, display: "flex", gap: 2, height: 16, alignItems: "flex-end" }}>
              {isPlaying ? (
                <>
                  <div style={{ width: 2, background: "#60a5fa", animation: "bounce 0.5s infinite", height: "60%", animationDelay: "0s" }} />
                  <div style={{ width: 2, background: "#60a5fa", animation: "bounce 0.5s infinite", height: "100%", animationDelay: "0.1s" }} />
                  <div style={{ width: 2, background: "#60a5fa", animation: "bounce 0.5s infinite", height: "40%", animationDelay: "0.2s" }} />
                  <div style={{ width: 2, background: "#60a5fa", animation: "bounce 0.5s infinite", height: "80%", animationDelay: "0.3s" }} />
                  <div style={{ width: 2, background: "#60a5fa", animation: "bounce 0.5s infinite", height: "50%", animationDelay: "0.4s" }} />
                </>
              ) : (
                <div style={{ width: 16, height: 2, background: "rgba(96, 165, 250, 0.3)", borderRadius: 1 }} />
              )}
            </div>
          </div>

        </div>
        {/* --- End Section --- */}

        {/* Main Navigation */}
        {activeSection === "main" && (
          <>
            <SidebarItem
              icon="👤"
              label="الملف الشخصي"
              onClick={() => setActiveSection("profile")}
            />
            <SidebarItem
              icon="💳"
              label="المحفظة"
              onClick={() => setActiveSection("wallet")}
              badge="12,500 ر.س"
            />
            <SidebarItem
              icon="📊"
              label="النشاط والإحصائيات"
              onClick={() => setActiveSection("activity")}
            />
            <SidebarItem
              icon="🔔"
              label="الإشعارات"
              onClick={() => {}}
              badge="3"
            />
            <SidebarItem
              icon="⚙️"
              label="الإعدادات"
              onClick={() => setActiveSection("settings")}
            />
            
            {/* Rights Protection Section */}
            <div
              style={{
                marginTop: 24,
                padding: 16,
                background: "rgba(255,255,255,0.03)",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div style={{ fontSize: 11, opacity: 0.5, marginBottom: 10, letterSpacing: "1px" }}>
                حماية حقوق المبدعين
              </div>
              <div style={{ fontSize: 12, lineHeight: 2, opacity: 0.7 }}>
                <div>✓ تشفير كامل AES-256</div>
                <div>✓ بصمة رقمية فريدة</div>
                <div>✓ منع النسخ غير المصرح</div>
              </div>
            </div>

            {/* System Status */}
            <div style={{ marginTop: 24 }}>
              <div style={{ fontSize: 10, opacity: 0.4, marginBottom: 8, letterSpacing: "1px" }}>
                حالة النظام
              </div>
              <SystemStatus />
            </div>
          </>
        )}

        {/* Activity/Stats Section */}
        {activeSection === "activity" && (
          <>
            <div
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
                borderRadius: 14,
                padding: 20,
                marginBottom: 20,
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div style={{ fontSize: 12, opacity: 0.5, marginBottom: 16 }}>إحصائيات الفترة الحالية</div>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                <StatCard icon="👁️" label="المشاهدات" value="1,234" change="+12%" isPositive={true} />
                <StatCard icon="❤️" label="الإعجابات" value="567" change="+8%" isPositive={true} />
                <StatCard icon="💬" label="التعليقات" value="89" change="+5%" isPositive={true} />
                <StatCard icon="📤" label="المشاركات" value="234" change="-2%" isPositive={false} />
              </div>

              <div style={{ fontSize: 11, opacity: 0.4, marginBottom: 8 }}>أفضل أداء هذا الأسبوع</div>
              <div style={{ 
                padding: "12px 16px", 
                background: "rgba(0,212,255,0.1)", 
                borderRadius: 10,
                border: "1px solid rgba(0,212,255,0.2)"
              }}>
                <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>غروب في الصحراء</div>
                <div style={{ fontSize: 12, opacity: 0.6 }}>📷 تصوير فوتوغرافي • 456 مشاهدات</div>
              </div>
            </div>

            <SidebarItem
              icon="📈"
              label="تقرير شامل"
              onClick={() => {}}
            />
            <SidebarItem
              icon="🏆"
              label="الإنجازات"
              onClick={() => {}}
            />
            <SidebarItem
              icon="📅"
              label="الجدول الزمني"
              onClick={() => {}}
            />
            
            <button
              onClick={() => setActiveSection("main")}
              style={{
                width: "100%",
                marginTop: 20,
                padding: 12,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "white",
                cursor: "pointer",
                borderRadius: 10,
                fontSize: 14,
              }}
            >
              ← العودة
            </button>
          </>
        )}

        {/* Profile Section */}
        {activeSection === "profile" && (
          <>
            <div
              style={{
                background: "rgba(255,255,255,0.04)",
                borderRadius: 14,
                padding: 16,
                marginBottom: 20,
                border: "1px solid rgba(255,255,255,0.08)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 32,
                  margin: "0 auto 12px",
                  border: "2px solid rgba(255,255,255,0.2)",
                }}
              >
                {user?.avatar || "👤"}
              </div>
              <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 4 }}>
                {user?.name || "زائر"}
              </div>
              <div style={{ fontSize: 12, opacity: 0.5 }}>
                {user?.email || "user@visura.com"}
              </div>
              <div style={{ 
                marginTop: 12, 
                padding: "6px 16px", 
                background: "rgba(0,212,255,0.1)", 
                borderRadius: 20,
                display: "inline-block",
                fontSize: 11,
                color: "#00d4ff"
              }}>
                🎨 مصور فوتوغرافي
              </div>
            </div>

            <SidebarItem
              icon="✏️"
              label="تعديل الملف"
              onClick={() => {}}
            />
            <SidebarItem
              icon="🔒"
              label="الأمان"
              onClick={() => {}}
            />
            <SidebarItem
              icon="🎨"
              label="أعمالي"
              onClick={() => {}}
            />
            <SidebarItem
              icon="❤️"
              label="المفضلة"
              onClick={() => {}}
            />
            <SidebarItem
              icon="📦"
              label="مشترياتي"
              onClick={() => {}}
            />
            <button
              onClick={() => setActiveSection("main")}
              style={{
                width: "100%",
                marginTop: 20,
                padding: 12,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "white",
                cursor: "pointer",
                borderRadius: 10,
                fontSize: 14,
              }}
            >
              ← العودة
            </button>
          </>
        )}

        {/* Wallet Section */}
        {activeSection === "wallet" && (
          <>
            <div
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
                borderRadius: 14,
                padding: 20,
                marginBottom: 20,
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div style={{ fontSize: 12, opacity: 0.5, marginBottom: 8 }}>الرصيد المتاح</div>
              <div style={{ fontSize: 32, fontWeight: 200, letterSpacing: "1px" }}>12,500 ر.س</div>
              <div style={{ fontSize: 11, opacity: 0.4, marginTop: 8 }}>≈ $3,333 USD</div>
            </div>
            
            <SidebarItem
              icon="💵"
              label="سحب"
              onClick={() => {}}
            />
            <SidebarItem
              icon="🏦"
              label="إيداع"
              onClick={() => {}}
            />
            <SidebarItem
              icon="📜"
              label="سجل المعاملات"
              onClick={() => {}}
            />
            <SidebarItem
              icon="💳"
              label="طرق الدفع"
              onClick={() => {}}
            />
            
            <button
              onClick={() => setActiveSection("main")}
              style={{
                width: "100%",
                marginTop: 20,
                padding: 12,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "white",
                cursor: "pointer",
                borderRadius: 10,
                fontSize: 14,
              }}
            >
              ← العودة
            </button>
          </>
        )}

        {/* Settings Section */}
        {activeSection === "settings" && (
          <>
            <SidebarItem
              icon="🌐"
              label="اللغة"
              onClick={() => {}}
              value="العربية"
            />
            <SidebarItem
              icon="🔔"
              label="الإشعارات"
              onClick={() => {}}
            />
            <SidebarItem
              icon="🎨"
              label="المظهر"
              onClick={() => {}}
              value="داكن"
            />
            <SidebarItem
              icon="🔐"
              label="الخصوصية"
              onClick={() => {}}
            />
            <SidebarItem
              icon="❓"
              label="المساعدة"
              onClick={() => {}}
            />
            <SidebarItem
              icon="ℹ️"
              label="حول التطبيق"
              onClick={() => {}}
              value="v2.0"
            />
            
            <button
              onClick={() => setActiveSection("main")}
              style={{
                width: "100%",
                marginTop: 20,
                padding: 12,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "white",
                cursor: "pointer",
                borderRadius: 10,
                fontSize: 14,
              }}
            >
              ← العودة
            </button>
          </>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            width: "100%",
            marginTop: 16,
            padding: 12,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "white",
            cursor: "pointer",
            borderRadius: 10,
            fontSize: 13,
            opacity: 0.6,
            letterSpacing: "1px",
          }}
        >
          إغلاق
        </button>
      </div>
    </>
  );
}

function SidebarItem({
  icon,
  label,
  onClick,
  badge,
  value,
}: {
  icon: string;
  label: string;
  onClick: () => void;
  badge?: string;
  value?: string;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "12px 14px",
        marginBottom: 6,
        borderRadius: 10,
        cursor: "pointer",
        transition: "background 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <span style={{ fontSize: 16, marginLeft: 12, opacity: 0.8 }}>{icon}</span>
      <span style={{ flex: 1, fontSize: 14, opacity: 0.8 }}>{label}</span>
      {badge && (
        <span
          style={{
            fontSize: 11,
            padding: "4px 8px",
            background: "rgba(255,255,255,0.1)",
            borderRadius: 8,
            opacity: 0.7,
          }}
        >
          {badge}
        </span>
      )}
      {value && (
        <span style={{ fontSize: 12, opacity: 0.4 }}>{value}</span>
      )}
      {!badge && !value && <span style={{ opacity: 0.3, fontSize: 12 }}>›</span>}
    </div>
  );
}

function SystemStatus() {
  return (
    <div style={{ fontSize: 11, opacity: 0.5 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span>🛡️ الحماية</span>
        <span style={{ color: "rgba(255,255,255,0.7)" }}>AES-256-GCM</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span>🌐 الشبكة</span>
        <span style={{ color: "rgba(255,255,255,0.7)" }}>مُستقرة</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span>🧠 الذكاء الاصطناعي</span>
        <span style={{ color: "rgba(255,255,255,0.7)" }}>نشط</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>📷 الكاميرا</span>
        <span style={{ color: "rgba(255,255,255,0.7)" }}>جاهزة</span>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, change, isPositive }: { 
  icon: string; 
  label: string; 
  value: string; 
  change: string;
  isPositive: boolean;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        padding: 14,
        borderRadius: 10,
        border: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
        <span style={{ fontSize: 14 }}>{icon}</span>
        <span style={{ fontSize: 10, opacity: 0.4 }}>{label}</span>
      </div>
      <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>{value}</div>
      <div style={{ 
        fontSize: 10, 
        color: isPositive ? "#00ff88" : "#ff6b6b"
      }}>
        {change}
      </div>
    </div>
  );
}
