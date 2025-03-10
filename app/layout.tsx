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
  title: "Carvertise - Drive and Earn Money",
  description:
    "Turn your car into a source of income by joining Carvertise. Get paid to advertise while you drive!",
  icons: {
    icon: "/favicon-carvertise.ico", // Favicon for tabs
    apple: "/favicon-carvertise.ico", // Apple devices
  },
  viewport: "width=device-width, initial-scale=1.0",

  // Open Graph Metadata
  openGraph: {
    title: "Carvertise - Earn Money While You Drive",
    description:
      "Join Carvertise and get paid to advertise while you drive. No hidden fees, just easy earnings!",
    siteName: "Carvertise",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://carvert.netlify.app/Carvertise_Logo_White.svg",
        width: 1200,
        height: 630,
        alt: "Carvertise Logo",
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
