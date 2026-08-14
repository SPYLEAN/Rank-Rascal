import type { Metadata, Viewport } from "next";
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageLoadingOverlay } from "@/components/PageLoadingOverlay";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rankrascal.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Rank Rascal — Roblox Discord Gaming Bot & Rotfiles",
    template: "%s | Rank Rascal",
  },
  description:
    "Play games. Flex achievements. Collect chaos. Rank Rascal turns public Roblox identity into certified Discord server brain rot, Rotfiles, Drip Checks, and competitive leaderboards.",
  keywords: [
    "Rank Rascal",
    "Roblox Discord Bot",
    "Roblox OAuth",
    "Rotfile",
    "Drip Check",
    "Fraud Check",
    "Yapping Order",
    "Discord Social Game",
  ],
  authors: [{ name: "Rank Rascal Team" }],
  icons: {
    icon: "/favicon.ico",
    apple: "/brand/apple-touch-icon.png",
  },
  openGraph: {
    title: "Rank Rascal — Play games. Flex achievements. Collect chaos.",
    description:
      "Turn your Roblox stats into certified Discord server brain rot. Link Roblox, flex achievements, hunt badges, and challenge friends.",
    url: siteUrl,
    siteName: "Rank Rascal",
    images: [
      {
        url: "/brand/logo-lockup.png",
        width: 1200,
        height: 630,
        alt: "Rank Rascal — Roblox-First Discord Bot",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rank Rascal — Roblox Discord Gaming Identity Bot",
    description: "Play games. Flex achievements. Collect chaos.",
    images: ["/brand/logo-lockup.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#121526",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-midnight-bg text-cloud-white min-h-screen flex flex-col antialiased">
        <PageLoadingOverlay />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

