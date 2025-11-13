import type { Metadata } from "next";
import { Playfair_Display, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pablo Rosa — Music, Philosophy & Design",
  description: "A global creative sanctuary — where music, identity, and philosophy breathe in rhythm.",
  keywords: "Pablo Rosa, music, philosophy, design, artist, electronic music, creative",
  openGraph: {
    title: "Pablo Rosa — Music, Philosophy & Design",
    description: "A global creative sanctuary — where music, identity, and philosophy breathe in rhythm.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfairDisplay.variable} ${inter.variable} ${spaceGrotesk.variable} antialiased bg-white text-black`}
      >
        {children}
      </body>
    </html>
  );
}
