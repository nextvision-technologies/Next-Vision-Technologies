import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { ChatBot } from "@/features/chat/ChatBot";
import { themeInitScript } from "@/components/layout/ThemeToggle";
import { site } from "@/content/site";
import { keywords } from "@/content/seo";
import { SiteJsonLd } from "@/components/seo/SiteJsonLd";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | AI Automation, SaaS, Websites & Digital Marketing`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  // Google Search Console ownership (renders <meta name="google-site-verification"> on every page)
  verification: { google: "VSYrYK3oMnN8Bw0Kn8rH0IrSNUx9o3KiVhmmJYJE2_8" },
  openGraph: { type: "website", siteName: site.name, locale: "en_GB", url: "/" },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false, email: false, address: false },
};

// Mobile browser bar colour matches the page in each theme
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f0e8" },
    { media: "(prefers-color-scheme: dark)", color: "#121214" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jakarta.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* Applies the saved light/dark theme before the first paint */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <SiteJsonLd />
      </head>
      <body className="flex min-h-dvh flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <SmoothScroll />
        <ChatBot />
      </body>
    </html>
  );
}
