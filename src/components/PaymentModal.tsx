"use client";

import { useState } from "react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    id: string;
    title: string;
    artist: string;
    price: number;
    image: string;
    type: "photo" | "art";
  } | null;
  onPaymentComplete?: () => void;
}

type PaymentMethod = "crypto" | "tap" | "card" | "apple" | "google";

export default function PaymentModal({ isOpen, onClose, item, onPaymentComplete }: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [step, setStep] = useState<"select" | "processing" | "success">("select");
  const [cryptoType, setCryptoType] = useState<string>("BTC");
  const [transactionHash, setTransactionHash] = useState<string>("");

  if (!isOpen || !item) return null;

  const handlePayment = async () => {
    if (!selectedMethod) return;
    
    // Generate transaction hash before processing
    const hash = "0x" + Math.random().toString(16).slice(2, 18) + "...";
    setTransactionHash(hash);
    
    setStep("processing");
    
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2500));
    
    setStep("success");
    
    // Auto close after success
    setTimeout(() => {
      onPaymentComplete?.();
      setStep("select");
      setSelectedMethod(null);
      onClose();
    }, 2000);
  };

  const paymentMethods = [
    {
      id: "crypto" as PaymentMethod,
      name: "عملات رقمية",
      nameEn: "Cryptocurrency",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.5 8h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5" />
          <path d="M9 12c0 1.66 1.34 3 3 3s3-1.34 3-3" />
          <path d="M12 6v3" />
        </svg>
      ),
      description: "BTC, ETH, USDT",
    },
    {
      id: "tap" as PaymentMethod,
      name: "طويق باي",
      nameEn: "Tap Payments",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <path d="M2 10h20" />
        </svg>
      ),
      description: "مدفوعات سعودية آمنة",
    },
    {
      id: "card" as PaymentMethod,
      name: "بطاقة ائتمان",
      nameEn: "Credit Card",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="1" y="4" width="22" height="16" rx="2" />
          <path d="M1 10h22" />
        </svg>
      ),
      description: "فيزا، ماستركارد",
    },
    {
      id: "apple" as PaymentMethod,
      name: "Apple Pay",
      nameEn: "Apple Pay",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
        </svg>
      ),
      description: "دفع سريع وآمن",
    },
    {
      id: "google" as PaymentMethod,
      name: "Google Pay",
      nameEn: "Google Pay",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path fill="#4285F4" d="M12 11v2.4h6.458c-.27 1.434-1.612 4.203-6.458 4.203-3.887 0-7.062-3.217-7.062-7.183S8.113 3.237 12 3.237c2.213 0 3.682.943 4.545 1.76l3.097-2.97C17.312.707 14.923 0 12 0 5.373 0 0 5.373 0 12s5.373 12 12 12c6.926 0 11.52-4.868 11.52-11.72 0-.787-.085-1.387-.189-1.987H12z" />
        </svg>
      ),
      description: "دفع فوري",
    },
  ];

  const cryptoOptions = [
    { id: "BTC", name: "Bitcoin", symbol: "₿", color: "#F7931A" },
    { id: "ETH", name: "Ethereum", symbol: "Ξ", color: "#627EEA" },
    { id: "USDT", name: "Tether", symbol: "₮", color: "#26A17B" },
    { id: "BNB", name: "BNB", symbol: "B", color: "#F3BA2F" },
  ];

  const formatPrice = (price: number) => {
    return price.toLocaleString("ar-SA") + " ر.س";
  };

  return (
    <div
      className="payment-modal"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.92)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 4500,
        backdropFilter: "blur(20px)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 480,
          background: "rgba(20, 25, 35, 0.98)",
          borderRadius: 24,
          border: "1px solid rgba(255, 255, 255, 0.1)",
          padding: 32,
          position: "relative",
          boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="close-btn"
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "rgba(255,255,255,0.05)",
            border: "none",
            color: "rgba(255,255,255,0.6)",
            width: 36,
            height: 36,
            borderRadius: "50%",
            cursor: "pointer",
            fontSize: 20,
          }}
        >
          ✕
        </button>

        {step === "select" && (
          <>
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <h2 style={{ margin: 0, fontSize: 24, fontWeight: 300, color: "white" }}>
                اختر طريقة الدفع
              </h2>
            </div>

            {/* Item preview */}
            <div
              style={{
                display: "flex",
                gap: 16,
                padding: 16,
                background: "rgba(255,255,255,0.03)",
                borderRadius: 16,
                border: "1px solid rgba(255,255,255,0.08)",
                marginBottom: 24,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 12,
                  objectFit: "cover",
                }}
              />
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 500, color: "white" }}>{item.title}</h3>
                <p style={{ margin: "4px 0 0", fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{item.artist}</p>
                <p
                  style={{
                    margin: "12px 0 0",
                    fontSize: 22,
                    fontWeight: 700,
                    color: "white",
                  }}
                >
                  {formatPrice(item.price)}
                </p>
              </div>
            </div>

            {/* Payment methods */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    padding: "16px 20px",
                    background: selectedMethod === method.id ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.04)",
                    border: selectedMethod === method.id ? "1px solid rgba(255,255,255,0.4)" : "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 14,
                    cursor: "pointer",
                    textAlign: "right",
                    transition: "all 0.2s",
                  }}
                >
                  <div
                    style={{
                      color: selectedMethod === method.id ? "white" : "rgba(255,255,255,0.6)",
                    }}
                  >
                    {method.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 500, color: "white" }}>{method.name}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{method.description}</div>
                  </div>
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      border: `2px solid ${selectedMethod === method.id ? "white" : "rgba(255,255,255,0.3)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {selectedMethod === method.id && (
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: "white" }} />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Crypto options (show when crypto selected) */}
            {selectedMethod === "crypto" && (
              <div style={{ marginTop: 20 }}>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 12 }}>اختر العملة:</p>
                <div style={{ display: "flex", gap: 10 }}>
                  {cryptoOptions.map((crypto) => (
                    <button
                      key={crypto.id}
                      onClick={() => setCryptoType(crypto.id)}
                      style={{
                        flex: 1,
                        padding: 12,
                        background: cryptoType === crypto.id ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.04)",
                        border: cryptoType === crypto.id ? "1px solid white" : "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 10,
                        cursor: "pointer",
                        color: "white",
                        fontSize: 14,
                        fontWeight: 500,
                      }}
                    >
                      {crypto.symbol} {crypto.id}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Pay button */}
            <button
              onClick={handlePayment}
              disabled={!selectedMethod}
              style={{
                width: "100%",
                marginTop: 24,
                padding: 18,
                background: selectedMethod ? "white" : "rgba(255,255,255,0.1)",
                border: "none",
                borderRadius: 14,
                color: selectedMethod ? "black" : "rgba(255,255,255,0.3)",
                fontSize: 16,
                fontWeight: 600,
                cursor: selectedMethod ? "pointer" : "not-allowed",
                transition: "all 0.2s",
              }}
            >
              دفع {formatPrice(item.price)}
            </button>

            {/* Security note */}
            <div
              style={{
                marginTop: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                color: "rgba(255,255,255,0.4)",
                fontSize: 12,
              }}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              دفع آمن مشفر بـ AES-256
            </div>
          </>
        )}

        {step === "processing" && (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                border: "3px solid rgba(255,255,255,0.2)",
                borderTopColor: "white",
                margin: "0 auto 24px",
                animation: "spin 1s linear infinite",
              }}
            />
            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 400, color: "white" }}>جاري معالجة الدفع...</h3>
            <p style={{ margin: "12px 0 0", fontSize: 14, color: "rgba(255,255,255,0.5)" }}>
              يرجى الانتظار قليلاً
            </p>
          </div>
        )}

        {step === "success" && (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "rgba(80, 255, 80, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="#50FF50" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 style={{ margin: 0, fontSize: 22, fontWeight: 500, color: "#50FF50" }}>تم الدفع بنجاح!</h3>
            <p style={{ margin: "12px 0 0", fontSize: 14, color: "rgba(255,255,255,0.6)" }}>
              Transaction Hash: {transactionHash}
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
