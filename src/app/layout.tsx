import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import "./visura-core.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "VISURA — The Creative Vault",
  description: "منصة استثمارية تفاعلية للتصوير الفوتوغرافي والرسم الفني مع حماية حقوق المبدعين",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`antialiased ${outfit.variable}`}>
        {children}
      </body>
    </html>
  );
}
