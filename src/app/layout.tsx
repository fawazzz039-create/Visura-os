import type { Metadata } from "next";
import "./globals.css";
import "./visura-core.css";

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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
