import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { MotionProvider } from "@/components/layout/motion-provider";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { ThemeScript } from "@/components/layout/theme-script";
import { SiteHeader } from "@/components/navigation/site-header";
import { profile } from "@/data/profile";
import { withBasePath } from "@/lib/base-path";
import { siteTitle, siteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  // Origin only: Next adds the base path to file-based images itself.
  metadataBase: new URL(new URL(siteUrl).origin),
  title: {
    default: siteTitle,
    template: `%s · ${profile.name}`,
  },
  description: profile.seoDescription,
  applicationName: `${profile.name} Portfolio`,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  keywords: [
    profile.name,
    "Senior Frontend Developer",
    "React developer",
    "React Native developer",
    "TypeScript",
    "Microsoft Teams apps",
    "Microsoft Graph",
    "WebRTC",
    "Generative AI",
    "Mangaluru",
    "India",
  ],
  alternates: { canonical: withBasePath("/") },
  openGraph: {
    type: "profile",
    locale: "en_IN",
    url: withBasePath("/"),
    siteName: profile.name,
    title: siteTitle,
    description: profile.seoDescription,
    firstName: "Kishan Kumar",
    lastName: "A",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: profile.seoDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f5f1" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0d0b" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-dvh">
        <div id="top" />
        <MotionProvider>
          <ScrollProgress />
          <SiteHeader />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
