import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { XPToastProvider } from "@/components/xp-toast";
import { SessionTracker } from "@/components/session-tracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "DersNotu.net - Lise Ders Notları | YKS, TYT, AYT Notları | 9, 10, 11, 12. Sınıf",
    template: "%s | DersNotu.net - Ücretsiz Ders Notları",
  },
  description: "Ücretsiz lise ders notları platformu. 9, 10, 11, 12. sınıf ders notları, YKS hazırlık, TYT ve AYT notları. Matematik, Fizik, Kimya, Biyoloji, Türkçe, Tarih, Coğrafya dersleri için kaliteli ve güncel ders notlarını ücretsiz indir. 2026 YKS, 2026 TYT, 2026 AYT hazırlık için en güncel ders notları.",
  keywords: [
    "ders notu",
    "ders notları",
    "lise ders notları",
    "9. sınıf ders notları",
    "10. sınıf ders notları",
    "11. sınıf ders notları",
    "12. sınıf ders notları",
    "YKS notları",
    "TYT notları",
    "AYT notları",
    "2026 YKS",
    "2026 TYT",
    "2026 AYT",
    "YKS 2026",
    "TYT 2026",
    "AYT 2026",
    "matematik ders notları",
    "fizik ders notları",
    "kimya ders notları",
    "biyoloji ders notları",
    "türkçe ders notları",
    "tarih ders notları",
    "coğrafya ders notları",
    "ücretsiz ders notları",
    "lise notları",
    "üniversite sınavı notları",
    "YKS hazırlık",
    "TYT hazırlık",
    "AYT hazırlık",
    "konu anlatımı",
    "ders özeti",
  ],
  authors: [{ name: "DersNotu.net" }],
  creator: "DersNotu.net",
  publisher: "DersNotu.net",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://dersnotu.net"),
  alternates: {
    canonical: "/",
    languages: {
      "tr-TR": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "/",
    siteName: "DersNotu.net",
    title: "DersNotu.net - Lise Ders Notları | YKS, TYT, AYT Notları",
    description: "Ücretsiz lise ders notları. 9-12. sınıf, YKS, TYT, AYT için Matematik, Fizik, Kimya, Biyoloji ve daha fazlası. Öğrenciler tarafından paylaşılan kaliteli notlar.",
    images: [
      {
        url: "/logo1.png",
        width: 1200,
        height: 630,
        alt: "DersNotu.net - Lise Ders Notları ve YKS Hazırlık",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DersNotu.net - Lise Ders Notları | YKS, TYT, AYT",
    description: "Ücretsiz lise ders notları. 9-12. sınıf, YKS, TYT, AYT için kaliteli ders notları.",
    images: ["/logo1.png"],
    creator: "@dersnotunet",
  },
  icons: {
    icon: [
      { url: "/logo1.png", sizes: "any" },
      { url: "/logo1.png", type: "image/png", sizes: "32x32" },
      { url: "/logo1.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [
      { url: "/logo1.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/logo1.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
    nocache: false,
    noarchive: false,
    nosnippet: false,
    noimageindex: false,
  },
  verification: {
    // Google Search Console verification code can be added here
    // google: "verification_token",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2222061433846943"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <XPToastProvider>
          <SessionTracker />
          {children}
        </XPToastProvider>
      </body>
    </html>
  );
}
