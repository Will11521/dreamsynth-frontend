import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "@/styles/globals.css";
import Providers from "./providers";
import { SeoAnalytics } from "@/components/seo-analytics";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dreamsynth.app"),
  title: "DreamSynth — the emotional OS for sleep.",
  description:
    "Set your intention before sleep. Wake up with AI-decoded insights. Even if you don’t remember your dreams, we help you rediscover them.",
  openGraph: {
    title: "DreamSynth — the emotional OS for sleep.",
    description:
      "Set your intention before sleep. Wake up with AI-decoded insights. Even if you don’t remember your dreams, we help you rediscover them.",
    url: "https://dreamsynth.app",
    siteName: "DreamSynth",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "DreamSynth — the emotional OS for sleep."
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    site: "@DreamSynth",
    title: "DreamSynth — the emotional OS for sleep.",
    description:
      "Set your intention before sleep. Wake up with AI-decoded insights. Even if you don’t remember your dreams, we help you rediscover them.",
    images: ["/og.jpg"]
  },
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-background font-sans text-ink antialiased">
        <Providers>
          <SeoAnalytics />
          {children}
        </Providers>
      </body>
    </html>
  );
}
