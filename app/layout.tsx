import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Load fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata for the app
export const metadata: Metadata = {
  title: "Secret Shopper - Get Paid to Shop",
  description:
    "Become a secret shopper and get paid to provide feedback on top brands. Earn money while shopping and dining out!",
  icons: {
    icon: "/favicon-carvertise.ico", // Favicon for tabs
    apple: "/favicon-carvertise.ico", // Apple devices
  },
  viewport: "width=device-width, initial-scale=1.0",

  // Open Graph Metadata
  openGraph: {
    title: "Secret Shopper - Earn Money While You Shop",
    description:
      "Join Secret Shopper and get paid to evaluate customer experiences at top brands.",
    siteName: "Secret Shopper",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://carvert.netlify.app/Carvertise_Logo_White.svg",
        width: 1200,
        height: 630,
        alt: "Secret Shopper Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon and metadata are auto-injected by Next.js */}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
