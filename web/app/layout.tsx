import type { Metadata } from "next";
import { Inter, Noto_Sans_Arabic } from "next/font/google";
import { azriContent, DEFAULT_LOCALE, pick } from "@azri/content";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import "./globals.css";

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-noto-arabic",
  subsets: ["arabic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: pick(azriContent.seo.pages.home.title, DEFAULT_LOCALE),
  description: pick(azriContent.seo.defaultDescription, DEFAULT_LOCALE),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${notoArabic.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <Nav />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
