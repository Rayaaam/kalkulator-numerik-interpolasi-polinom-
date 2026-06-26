import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Kalkulator Interpolasi | Metode Numerik",
  description: "Kelompok 6 C24 - Final Project",
  icons: {
    icon: [
      {
        url: "/logo1.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/logo1.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/logo1.png",
        type: "image/svg+xml",
      },
    ],
    apple: "/logo1.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
