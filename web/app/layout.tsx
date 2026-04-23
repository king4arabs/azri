import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AZRI",
  description: "Epilepsy workflow support and early-warning monitoring.",
};

/**
 * Root layout. The actual `<html lang dir>` attributes are set inside the
 * `[locale]` segment so each locale renders with the right direction. This
 * root layout is deliberately unstyled beyond Tailwind resets.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
