import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
    default: "DersNotu.net - Öğrenciler için Ders Notları",
    template: "%s | DersNotu.net",
  },
  description: "Üniversite öğrencileri için hazırlanmış, öğrenciler tarafından paylaşılan ders notları platformu. Matematik, Fizik, Kimya ve daha fazlası için kaliteli ders notları bulun.",
  keywords: ["ders notları", "üniversite notları", "akademik notlar", "öğrenci notları", "ders materyalleri", "üniversite dersleri"],
  authors: [{ name: "DersNotu.net" }],
  creator: "DersNotu.net",
  publisher: "DersNotu.net",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "/",
    siteName: "DersNotu.net",
    title: "DersNotu.net - Öğrenciler için Ders Notları",
    description: "Üniversite öğrencileri için hazırlanmış, öğrenciler tarafından paylaşılan ders notları platformu.",
    images: [
      {
        url: "/logo1.png",
        width: 1200,
        height: 630,
        alt: "DersNotu.net",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DersNotu.net - Öğrenciler için Ders Notları",
    description: "Üniversite öğrencileri için hazırlanmış, öğrenciler tarafından paylaşılan ders notları platformu.",
    images: ["/logo1.png"],
  },
  icons: {
    icon: [
      { url: "/d.png", sizes: "any" },
      { url: "/d.png", type: "image/png", sizes: "32x32" },
      { url: "/d.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [
      { url: "/d.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/d.png",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
