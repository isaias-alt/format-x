import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import {
  DESCRIPTION,
  ICONS,
  KEYWORDS,
  OPEN_GRAPH,
  TWITTER,
} from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Format-X - JSON Formatter and Data Converter",
  description: DESCRIPTION,
  keywords: KEYWORDS,
  authors: [
    {
      name: "Lucas Casco",
      url: "https://lucasco.dev",
    },
  ],
  creator: "Lucas Casco",
  publisher: "Lucas Casco",
  metadataBase: new URL("https://format-x.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: OPEN_GRAPH,
  twitter: TWITTER,
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
  icons: ICONS,
  manifest: "/site.webmanifest",
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} antialiased`}
        cz-shortcut-listen="true"
      >
        {children}
        <Toaster
          position="bottom-right"
          theme="dark"
          richColors
          toastOptions={{
            style: {
              background: "bg-green-700",
              border: "border-green-500/20",
              color: "bg-green-700",
            },
          }}
        />
      </body>
    </html>
  );
}
