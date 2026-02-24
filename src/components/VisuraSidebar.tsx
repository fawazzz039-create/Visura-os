"use client";

interface VisuraSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VisuraSidebar({ isOpen, onClose }: VisuraSidebarProps) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 1900,
            backdropFilter: "blur(2px)",
          }}
        />
      )}

      {/* Sidebar Panel */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: isOpen ? 0 : -380,
          width: 340,
          height: "100%",
          background: "rgba(6, 10, 18, 0.97)",
          borderLeft: "1px solid rgba(255,255,255,0.1)",
          transition: "right 0.5s cubic-bezier(0.19, 1, 0.22, 1)",
          zIndex: 2000,
          padding: "60px 28px 40px",
          boxSizing: "border-box",
          overflowY: "auto",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 11, letterSpacing: "3px", opacity: 0.4, marginBottom: 8 }}>
            VISURA OS
          </div>
          <h2 style={{ fontWeight: 200, fontSize: 26, letterSpacing: "2px" }}>لوحة التحكم</h2>
        </div>

        {/* Stats */}
        <StatBox
          icon="🌐"
          label="مزامنة العقد"
          value="مُستقرة"
          valueColor="rgba(255,255,255,0.9)"
          hasStream
        />
        <StatBox
          icon="🛡️"
          label="بروتوكول الحماية"
          value="AES-256-GCM"
          valueColor="rgba(255,255,255,0.9)"
        />
        <StatBox
          icon="🧠"
          label="ذكاء VISURA"
          value="نشط ومتصل"
          valueColor="rgba(255,255,255,0.9)"
        />
        <StatBox
          icon="📷"
          label="نظام الكاميرا"
          value="جاهز للتصوير"
          valueColor="rgba(255,255,255,0.7)"
        />
        <StatBox
          icon="🎨"
          label="معرض الفن"
          value="142 عمل فني"
          valueColor="rgba(255,255,255,0.7)"
        />
        <StatBox
          icon="🔐"
          label="الأعمال المشفرة"
          value="98 عمل محمي"
          valueColor="rgba(255,255,255,0.7)"
        />
        <StatBox
          icon="💰"
          label="إجمالي المبيعات"
          value="284,500 ر.س"
          valueColor="rgba(255,255,255,0.9)"
        />

        {/* Rights Protection */}
        <div
          style={{
            marginTop: 24,
            padding: "16px",
            background: "rgba(255,255,255,0.03)",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div style={{ fontSize: 12, opacity: 0.5, marginBottom: 8, letterSpacing: "1px" }}>
            حماية حقوق المبدعين
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.8, opacity: 0.75 }}>
            ✓ تشفير كامل للأعمال<br />
            ✓ بصمة رقمية فريدة<br />
            ✓ منع النسخ غير المصرح<br />
            ✓ تتبع الاستخدام
          </div>
        </div>

        <button
          onClick={onClose}
          style={{
            width: "100%",
            marginTop: 24,
            padding: "12px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "white",
            cursor: "pointer",
            borderRadius: 10,
            fontSize: 14,
            letterSpacing: "1px",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
        >
          إغلاق
        </button>
      </div>
    </>
  );
}

function StatBox({
  icon,
  label,
  value,
  valueColor,
  hasStream,
}: {
  icon: string;
  label: string;
  value: string;
  valueColor: string;
  hasStream?: boolean;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        padding: "14px 16px",
        borderRadius: 10,
        marginBottom: 10,
        borderRight: "2px solid rgba(255,255,255,0.2)",
        fontSize: 13,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ opacity: 0.6 }}>
          {icon} {label}
        </span>
        <span style={{ color: valueColor, fontWeight: 500 }}>{value}</span>
      </div>
      {hasStream && (
        <div
          style={{
            width: "100%",
            height: 3,
            background: "rgba(255,255,255,0.08)",
            borderRadius: 10,
            marginTop: 8,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "40%",
              height: "100%",
              background: "rgba(255,255,255,0.5)",
              position: "absolute",
              animation: "stream-flow 1.2s infinite linear",
              borderRadius: 10,
            }}
          />
        </div>
      )}
    </div>
  );
}
