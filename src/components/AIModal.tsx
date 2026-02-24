"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const aiResponses: Record<string, string> = {
  analyze:
    "🖼️ تحليل الصورة: جودة عالية، تكوين متوازن، إضاءة طبيعية ممتازة. التقييم الفني: 9.2/10. يُنصح بتعديل طفيف في التباين لتعزيز العمق.",
  price:
    "💰 التقييم السعري: بناءً على السوق الحالي، الأعمال المشابهة تُباع بين 3,500-6,000 ر.س. أنصح بتسعير هذا العمل بـ 4,800 ر.س مع خيار التفاوض.",
  encrypt:
    "🔐 تم تشفير المحتوى بنجاح باستخدام AES-256-GCM. البصمة الرقمية: VIS-" +
    Math.random().toString(36).substring(2, 10).toUpperCase() +
    ". لا يمكن نسخ هذا العمل دون إذنك.",
  search:
    "🔍 وجدت 7 أعمال مشابهة في قاعدة البيانات. أبرزها: 'أمواج الضوء' بـ 4,800 ر.س و'تجريدي رقمي' بـ 4,200 ر.س. هل تريد مقارنة تفصيلية؟",
  default: [
    "أفهم! يمكنني مساعدتك في تحليل الصور الفوتوغرافية وتقييم جودتها التقنية والفنية.",
    "بناءً على وصفك، أقترح استخدام إضاءة جانبية لتعزيز النسيج والعمق في اللوحة.",
    "🔐 يمكنني تشفير هذا العمل باستخدام معيار AES-256-GCM لضمان حماية حقوق الملكية الفكرية.",
    "السعر المقترح لهذا العمل يتراوح بين 2,500-4,000 ر.س بناءً على تحليل السوق الحالي.",
    "تم العثور على 3 أعمال مشابهة في معرض VISURA. هل تريد رؤية التفاصيل المقارنة؟",
    "نصيحة فنية: التوازن بين الضوء والظل هو سر الصورة الاحترافية. جرب قاعدة الأثلاث.",
    "يمكنني تحليل أسلوبك الفني وتقديم توصيات لتطوير بصمتك الإبداعية الفريدة.",
  ][Math.floor(Math.random() * 7)],
};

interface AIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIModal({ isOpen, onClose }: AIModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "مرحباً! أنا مساعد VISURA الذكي. أستطيع مساعدتك في تحليل الأعمال الفنية، تقييم الأسعار، تشفير المحتوى، والبحث الذكي في المعرض. كيف يمكنني خدمتك اليوم؟",
      timestamp: new Date().toLocaleTimeString("ar"),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const sendMessage = (text?: string) => {
    const message = text || input.trim();
    if (!message) return;

    const userMsg: Message = {
      role: "user",
      content: message,
      timestamp: new Date().toLocaleTimeString("ar"),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const responseKey = text as keyof typeof aiResponses;
      const response =
        aiResponses[responseKey] ||
        (typeof aiResponses.default === "string"
          ? aiResponses.default
          : "أفهم طلبك. دعني أساعدك في ذلك.");

      const aiMsg: Message = {
        role: "assistant",
        content: response,
        timestamp: new Date().toLocaleTimeString("ar"),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const features = [
    { key: "analyze", icon: "🖼️", label: "تحليل صورة" },
    { key: "price", icon: "💰", label: "تقييم السعر" },
    { key: "encrypt", icon: "🔐", label: "تشفير محتوى" },
    { key: "search", icon: "🔍", label: "بحث ذكي" },
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
        padding: "40px",
        boxSizing: "border-box",
      }}
    >
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
        }}
      >
        ×
      </button>

      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 11, letterSpacing: "3px", opacity: 0.4, marginBottom: 8 }}>
            VISURA AI ENGINE
          </div>
          <h2 style={{ fontWeight: 200, fontSize: 26, marginBottom: 14 }}>🧠 مساعد VISURA الذكي</h2>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 22px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 25,
              fontSize: 13,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                background: "white",
                borderRadius: "50%",
                animation: "blink 1s infinite",
              }}
            />
            <span>النظام نشط | معالجة اللغة العربية</span>
          </div>
        </div>

        {/* Quick features */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 12,
            marginBottom: 20,
          }}
        >
          {features.map((f) => (
            <button
              key={f.key}
              onClick={() => sendMessage(f.key)}
              style={{
                padding: "14px 10px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12,
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.2s",
                color: "white",
                fontSize: 13,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 6 }}>{f.icon}</div>
              <div>{f.label}</div>
            </button>
          ))}
        </div>

        {/* Chat area */}
        <div
          ref={chatRef}
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.02)",
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.08)",
            padding: "24px",
            overflowY: "auto",
            marginBottom: 16,
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                marginBottom: 16,
                display: "flex",
                flexDirection: "column",
                alignItems: msg.role === "user" ? "flex-start" : "flex-end",
                animation: "fadeIn 0.3s ease",
              }}
            >
              <div
                style={{
                  maxWidth: "78%",
                  padding: "12px 18px",
                  borderRadius: 14,
                  background:
                    msg.role === "user"
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(255,255,255,0.04)",
                  border: `1px solid ${
                    msg.role === "user"
                      ? "rgba(255,255,255,0.2)"
                      : "rgba(255,255,255,0.1)"
                  }`,
                  fontSize: 14,
                  lineHeight: 1.7,
                }}
              >
                {msg.content}
              </div>
              <div
                style={{
                  fontSize: 10,
                  opacity: 0.35,
                  marginTop: 4,
                  fontFamily: "monospace",
                }}
              >
                {msg.role === "user" ? "أنت" : "VISURA AI"} · {msg.timestamp}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  padding: "12px 18px",
                  borderRadius: 14,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  gap: 6,
                  alignItems: "center",
                }}
              >
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: 6,
                      height: 6,
                      background: "rgba(255,255,255,0.6)",
                      borderRadius: "50%",
                      animation: `blink ${0.6 + i * 0.2}s infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input area */}
        <div style={{ display: "flex", gap: 12 }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="اكتب رسالتك هنا... (اضغط Enter للإرسال)"
            style={{
              flex: 1,
              padding: "14px 22px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 28,
              color: "white",
              fontSize: 15,
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")}
          />
          <button
            onClick={() => sendMessage()}
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: "white",
              border: "none",
              color: "black",
              fontSize: 18,
              cursor: "pointer",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
              e.currentTarget.style.background = "rgba(255,255,255,0.85)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.background = "white";
            }}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}
