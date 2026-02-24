"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";

interface VisuraSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VisuraSidebar({ isOpen, onClose }: VisuraSidebarProps) {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState<"main" | "profile" | "wallet" | "settings">("main");

  return (
    <>
      {/* Overlay */}
      {isOpen && (
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
          right: isOpen ? 0 : -380,
          width: Math.min(360, window.innerWidth - 40),
          height: "100%",
          background: "rgba(6, 10, 18, 0.97)",
          borderRight: "1px solid rgba(255,255,255,0.08)",
          transition: "right 0.4s cubic-bezier(0.19, 1, 0.22, 1)",
          zIndex: 2000,
          padding: "60px 24px 30px",
          boxSizing: "border-box",
          overflowY: "auto",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 10, letterSpacing: "3px", opacity: 0.4, marginBottom: 6 }}>
            VISURA OS
          </div>
          <h2 style={{ fontWeight: 200, fontSize: 22, letterSpacing: "2px" }}>
            {activeSection === "main" && "لوحة التحكم"}
            {activeSection === "profile" && "الملف الشخصي"}
            {activeSection === "wallet" && "المحفظة"}
            {activeSection === "settings" && "الإعدادات"}
          </h2>
        </div>

        {/* User Profile Card - Always Visible */}
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            borderRadius: 14,
            padding: 16,
            marginBottom: 20,
            border: "1px solid rgba(255,255,255,0.08)",
            cursor: "pointer",
          }}
          onClick={() => setActiveSection("profile")}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                border: "2px solid rgba(255,255,255,0.2)",
              }}
            >
              {user?.avatar || "👤"}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, fontSize: 15, marginBottom: 2 }}>
                {user?.name || "زائر"}
              </div>
              <div style={{ fontSize: 12, opacity: 0.5 }}>
                {user?.email || "سجل دخولك للمتابعة"}
              </div>
            </div>
            <div style={{ opacity: 0.4, fontSize: 12 }}>›</div>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
          <MiniStatBox icon="📷" label="أعمالي" value="12" />
          <MiniStatBox icon="👁️" label="المشاهدات" value="1.2K" />
          <MiniStatBox icon="💰" label="المبيعات" value="8" />
          <MiniStatBox icon="⭐" label="التقييم" value="4.8" />
        </div>

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
              label="إحصائيات"
              onClick={() => {}}
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

        {/* Profile Section */}
        {activeSection === "profile" && (
          <>
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

function MiniStatBox({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        padding: "12px",
        borderRadius: 10,
        border: "1px solid rgba(255,255,255,0.05)",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 16, marginBottom: 4 }}>{icon}</div>
      <div style={{ fontSize: 16, fontWeight: 500 }}>{value}</div>
      <div style={{ fontSize: 10, opacity: 0.4 }}>{label}</div>
    </div>
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
