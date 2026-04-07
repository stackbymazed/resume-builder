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
  title: "Classic ATS Resume Builder | Free Professional CV Maker",
  description: "Create a professional, ATS-friendly resume in minutes. A free, beautifully designed resume builder with live preview and PDF download.",
  keywords: ["resume builder", "free cv maker", "ats friendly resume", "professional resume", "nextjs resume", "pdf resume"],
  openGraph: {
    title: "Classic ATS Resume Builder",
    description: "Create a professional, ATS-friendly resume in minutes with our free tool.",
    url: "https://resume-builder-sooty-three.vercel.app",
    siteName: "Resume Builder",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Classic ATS Resume Builder",
    description: "Fast, free, and completely professional ATS-friendly resume generator.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
