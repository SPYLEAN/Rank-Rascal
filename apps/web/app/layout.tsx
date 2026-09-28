import type { Metadata, Viewport } from "next";
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageLoadingOverlay } from "@/components/PageLoadingOverlay";
import { ExperienceChrome } from "@/components/ExperienceChrome";
import { RazzGuide } from "@/components/RazzGuide";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rankrascal.lol";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Rascal Realms: Crownfall — The World Lies",
    template: "%s | Rascal Realms: Crownfall",
  },
  description:
    "Rascal Realms: Crownfall is a cinematic co-op Roblox action-adventure mystery where the world lies and your squad has to prove it.",
  keywords: [
    "Rascal Realms",
    "Crownfall",
    "Rascal Labs",
    "Roblox game",
    "Roblox co-op adventure",
    "Roblox mystery game",
    "Stickerwood",
    "The World Lies",
  ],
  authors: [{ name: "Rascal Labs" }],
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.png", type: "image/png" },
      { url: "/brand/app-icon.png", type: "image/png" },
    ],
    shortcut: "/icon.png",
    apple: "/brand/apple-touch-icon.png",
  },
  openGraph: {
    title: "Rascal Realms: Crownfall — The World Lies",
    description:
      "A cinematic co-op action-adventure mystery for Roblox, now in pre-production.",
    url: siteUrl,
    siteName: "Rascal Realms: Crownfall",
    images: [
      {
        url: "/brand/game/stickerwood-key-art-v1.png",
        width: 1672,
        height: 941,
        alt: "Razz overlooks Stickerwood and the corrupted Crown Ruins.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rascal Realms: Crownfall — The World Lies",
    description: "A cinematic co-op action-adventure mystery for Roblox, now in pre-production.",
    images: ["/brand/game/stickerwood-key-art-v1.png"],
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
        <ExperienceChrome />
        <PageLoadingOverlay />
        <RazzGuide />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

