import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Fonts used in the app
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Global metadata for the GreenDot app
export const metadata: Metadata = {
  title: "GreenDot - Secure and Convenient Banking",
  description: "Manage your GreenDot account with ease and security. Access your balance, transactions, and more.",
  openGraph: {
    title: "GreenDot - Secure and Convenient Banking",
    description: "Manage your GreenDot account with ease and security. Access your balance, transactions, and more.",
    url: "https://www.greendot.com",
    images: ["/logogreen"], // Change this to the image you want to display on social media
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GreenDot - Secure and Convenient Banking",
    description: "Manage your GreenDot account with ease and security.",
    images: "/static/greendot-twitter-image.jpg", // Change this to the Twitter image you want to show
  },
  icons: {
    icon: "/favicon-greendot.ico", // Favicon for tabs
    apple: "/favicon.png", // For Apple devices, you can use a different image if needed
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
        {/* Favicon for browser tabs */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        {/* Other meta tags */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
