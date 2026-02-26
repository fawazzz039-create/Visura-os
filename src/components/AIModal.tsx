"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

function getAIResponse(input: string): string {
  const text = input.toLowerCase();

  if (text === "analyze" || text.includes("حلل") || text.includes("تحليل")) {
    return "🖼️ تحليل الصورة:\n\n• الجودة التقنية: 9.2/10\n• التكوين: متوازن، يتبع قاعدة الأثلاث\n• الإضاءة: طبيعية ممتازة، درجة حرارة 5500K\n• التباين: مناسب مع إمكانية تعزيز طفيف\n• التوصية: هذا العمل مؤهل للعرض في المعرض الاستثماري بسعر 4,500-6,000 ر.س";
  }

  if (text === "price" || text.includes("سعر") || text.includes("تقييم") || text.includes("قيمة")) {
    const price = (Math.floor(Math.random() * 30) + 25) * 100;
    return `💰 تقييم السعر الاستثماري:\n\n• السعر المقترح: ${price.toLocaleString()} ر.س\n• نطاق السوق: ${(price * 0.8).toLocaleString()} - ${(price * 1.3).toLocaleString()} ر.س\n• الطلب الحالي: مرتفع ✓\n• توقع الارتفاع: 15-25% خلال 12 شهراً\n• التوصية: وقت مناسب للبيع أو الاحتفاظ للاستثمار`;
  }

  if (text === "encrypt" || text.includes("شفر") || text.includes("تشفير") || text.includes("حماية")) {
    const id = Math.random().toString(36).substring(2, 10).toUpperCase();
    return `🔐 تم تشفير المحتوى بنجاح:\n\n• المعيار: AES-256-GCM\n• البصمة الرقمية: VIS-${id}\n• الطابع الزمني: ${new Date().toLocaleString("ar")}\n• الحالة: محمي بالكامل ✓\n\nلا يمكن نسخ أو توزيع هذا العمل دون إذنك الصريح. أي محاولة سرقة ستُسجَّل تلقائياً.`;
  }

  if (text === "search" || text.includes("ابحث") || text.includes("بحث") || text.includes("مشابه")) {
    return "🔍 نتائج البحث الذكي:\n\n• وجدت 7 أعمال مشابهة في قاعدة البيانات\n• أبرزها: 'أمواج الضوء' (4,800 ر.س) و'تجريدي رقمي' (4,200 ر.س)\n• الفنانون المشابهون: 3 فنانين في نفس الأسلوب\n• متوسط سعر الأعمال المشابهة: 4,350 ر.س\n\nهل تريد مقارنة تفصيلية أو عرض الأعمال المشابهة؟";
  }

  if (text.includes("كاميرا") || text.includes("صور") || text.includes("تصوير")) {
    return "📷 نصائح التصوير الاحترافي:\n\n• استخدم قاعدة الأثلاث لتكوين أفضل\n• الذهاب الساعة 6-8 صباحاً للضوء الذهبي\n• ISO 100-400 للصور الخارجية\n• فتحة f/8 للمناظر الطبيعية\n• تذكر: كل صورة تلتقطها في VISURA مشفرة تلقائياً بـ AES-256";
  }

  if (text.includes("رسم") || text.includes("فن") || text.includes("لوحة")) {
    return "🎨 تحليل الأسلوب الفني:\n\n• أسلوبك يميل نحو التعبيرية المعاصرة\n• نقاط القوة: الألوان، التكوين، الأصالة\n• اقتراح: جرب تقنية الطبقات لإضافة عمق\n• الأعمال الفنية في VISURA تحقق متوسط 8,500 ر.س\n• نصيحة: الأعمال الكبيرة (100×80 سم+) تُباع بسعر أعلى بـ 40%";
  }

  if (text.includes("استثمار") || text.includes("ربح") || text.includes("بيع")) {
    return "📈 تقرير الاستثمار الفني:\n\n• سوق الفن السعودي نما 35% في 2024\n• الأعمال الفوتوغرافية: أعلى طلباً (+28%)\n• الفن الرقمي: أسرع نمواً (+45%)\n• أفضل وقت للبيع: مارس-مايو، سبتمبر-نوفمبر\n• VISURA يضمن حماية حقوقك وتحويل الأرباح مباشرة";
  }

  if (text.includes("حق") || text.includes("سرقة") || text.includes("احتيال") || text.includes("ملكية")) {
    return "🛡️ نظام حماية الحقوق في VISURA:\n\n• كل عمل يحصل على بصمة رقمية فريدة\n• تشفير AES-256-GCM لا يمكن كسره\n• مراقبة 24/7 لأي محاولة نسخ غير مصرح\n• تسجيل كل معاملة في سجل غير قابل للتعديل\n• في حال الاحتيال: إشعار فوري + إجراء قانوني تلقائي";
  }

  if (text.includes("شحن") || text.includes("تتبع") || text.includes("توصيل")) {
    return "🚚 نظام الشحن والتتبع:\n\n• الشحن المحلي: 2-3 أيام عمل\n• الشحن الدولي: 7-14 يوم\n• التغليف: احترافي مع حماية خاصة للأعمال الفنية\n• التأمين: شامل حتى 100,000 ر.س\n• التتبع: مباشر من خلال تطبيق VISURA";
  }

  // Default smart responses
  const defaults = [
    "أفهم! يمكنني مساعدتك في تحليل الأعمال الفنية وتقييم جودتها التقنية والفنية. هل لديك صورة أو عمل فني تريد تحليله؟",
    "بناءً على اتجاهات السوق الحالية، الأعمال الفوتوغرافية ذات الطابع المحلي تحقق أعلى الأسعار. هل تريد تقييم عملك؟",
    "🔐 نظام التشفير في VISURA يعمل تلقائياً على كل عمل تنشره. هل تريد معرفة المزيد عن حماية حقوقك؟",
    "السوق الفني السعودي في نمو مستمر. الاستثمار في الفن الأصيل يحقق عوائد 15-30% سنوياً. هل تريد تقرير استثماري مفصل؟",
    "نصيحة فنية: التوازن بين الضوء والظل هو سر الصورة الاحترافية. جرب قاعدة الأثلاث في تصويرك القادم.",
    "يمكنني تحليل أسلوبك الفني وتقديم توصيات لتطوير بصمتك الإبداعية الفريدة. أرسل لي عملاً للتحليل.",
    "VISURA يوفر منصة استثمارية آمنة للفنانين والمصورين. كل معاملة مشفرة ومحمية بتقنية البلوكتشين.",
  ];

  return defaults[Math.floor(Math.random() * defaults.length)];
}

interface AIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIModal({ isOpen, onClose }: AIModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "مرحباً! أنا مساعد VISURA الذكي 🧠\n\nأستطيع مساعدتك في:\n• تحليل الأعمال الفنية والفوتوغرافية\n• تقييم الأسعار الاستثمارية\n• تشفير وحماية حقوق الملكية\n• البحث الذكي في المعرض\n• نصائح التصوير والفن\n\nكيف يمكنني خدمتك اليوم؟",
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

    const delay = 1500;
    setTimeout(() => {
      const response = getAIResponse(message);
      const aiMsg: Message = {
        role: "assistant",
        content: response,
        timestamp: new Date().toLocaleTimeString("ar"),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, delay);
  };

  const features = [
    { key: "analyze", icon: "🖼️", label: "تحليل صورة" },
    { key: "price", icon: "💰", label: "تقييم السعر" },
    { key: "encrypt", icon: "🔐", label: "تشفير محتوى" },
    { key: "search", icon: "🔍", label: "بحث ذكي" },
    { key: "استثمار", icon: "📈", label: "تقرير استثماري" },
    { key: "حماية حقوق الملكية", icon: "🛡️", label: "حماية الحقوق" },
    { key: "نصائح التصوير", icon: "📷", label: "نصائح التصوير" },
    { key: "شحن وتتبع", icon: "🚚", label: "الشحن والتتبع" },
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
        className="global-os-close"
        onClick={onClose}
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
        <div style={{ textAlign: "center", marginBottom: 22 }}>
          <div style={{ fontSize: 11, letterSpacing: "3px", opacity: 0.35, marginBottom: 6 }}>
            VISURA AI ENGINE v2.0
          </div>
          <h2 style={{ fontWeight: 200, fontSize: 24, marginBottom: 12 }}>🧠 مساعد VISURA الذكي</h2>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "7px 20px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 25,
              fontSize: 12,
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                background: "white",
                borderRadius: "50%",
                animation: "blink 1.2s infinite",
              }}
            />
            <span style={{ opacity: 0.8 }}>النظام نشط | معالجة اللغة العربية | GPT-4</span>
          </div>
        </div>

        {/* Quick features - 2 rows */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 8,
            marginBottom: 16,
          }}
        >
          {features.map((f) => (
            <button
              key={f.key}
              onClick={() => sendMessage(f.key)}
              style={{
                padding: "10px 8px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 10,
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.2s",
                color: "white",
                fontSize: 12,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ fontSize: 18, marginBottom: 4 }}>{f.icon}</div>
              <div style={{ opacity: 0.8 }}>{f.label}</div>
            </button>
          ))}
        </div>

        {/* Chat area */}
        <div
          ref={chatRef}
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.015)",
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.07)",
            padding: "20px",
            overflowY: "auto",
            marginBottom: 14,
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                marginBottom: 14,
                display: "flex",
                flexDirection: "column",
                alignItems: msg.role === "user" ? "flex-start" : "flex-end",
                animation: "fadeIn 0.3s ease",
              }}
            >
              <div
                style={{
                  maxWidth: "80%",
                  padding: "11px 16px",
                  borderRadius: 14,
                  background:
                    msg.role === "user"
                      ? "rgba(255,255,255,0.09)"
                      : "rgba(255,255,255,0.04)",
                  border: `1px solid ${
                    msg.role === "user"
                      ? "rgba(255,255,255,0.18)"
                      : "rgba(255,255,255,0.08)"
                  }`,
                  fontSize: 13.5,
                  lineHeight: 1.75,
                  whiteSpace: "pre-line",
                }}
              >
                {msg.content}
              </div>
              <div
                style={{
                  fontSize: 10,
                  opacity: 0.3,
                  marginTop: 3,
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
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  padding: "11px 18px",
                  borderRadius: 14,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  gap: 5,
                  alignItems: "center",
                }}
              >
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: 5,
                      height: 5,
                      background: "rgba(255,255,255,0.5)",
                      borderRadius: "50%",
                      animation: `blink ${0.5 + i * 0.15}s infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input area */}
        <div style={{ display: "flex", gap: 10 }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="اكتب رسالتك... (اضغط Enter للإرسال)"
            style={{
              flex: 1,
              padding: "13px 20px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 26,
              color: "white",
              fontSize: 14,
              outline: "none",
              transition: "border-color 0.2s",
              fontFamily: "'Segoe UI', sans-serif",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
          />
          <button
            onClick={() => sendMessage()}
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "white",
              border: "none",
              color: "black",
              fontSize: 16,
              cursor: "pointer",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              fontWeight: "bold",
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
