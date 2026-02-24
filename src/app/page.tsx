"use client";

import dynamic from "next/dynamic";

const VisuraApp = dynamic(() => import("@/components/VisuraApp"), { ssr: false });

export default function Home() {
  return <VisuraApp />;
}
