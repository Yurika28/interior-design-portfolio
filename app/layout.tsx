import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Poppins, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-poppins",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Interior Haus | Interior Design & 3D Visualization Studio",
    template: "%s | Interior Haus",
  },
  description:
    "Interior Haus creates premium interior design concepts and photorealistic 3D visualizations for modern residential and commercial spaces.",
  keywords: [
    "interior design",
    "3D visualization",
    "architectural rendering",
    "interior styling",
    "modern interiors",
    "Interior Haus",
  ],
  openGraph: {
    title: "Interior Haus | Interior Design & 3D Visualization Studio",
    description:
      "Discover premium interior design and photorealistic 3D visualization services by Interior Haus.",
    type: "website",
    url: "/",
    siteName: "Interior Haus",
    images: [
      {
        url: "/images/3d-modern-lamp-design.jpg",
        width: 1200,
        height: 630,
        alt: "Interior Haus project preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Interior Haus | Interior Design & 3D Visualization Studio",
    description:
      "Explore interior design concepts and photorealistic 3D visuals by Interior Haus.",
    images: ["/images/3d-modern-lamp-design.jpg"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} ${inter.variable} ${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
