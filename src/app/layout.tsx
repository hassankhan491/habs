// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";

export const metadata: Metadata = {
  title: {
    default: "Shawq",
    template: "%s | Shawq",
  },
  description: "Your description here",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#A48950", // Your gold color
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="antialiased bg-black text-white"
        suppressHydrationWarning
      >
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
