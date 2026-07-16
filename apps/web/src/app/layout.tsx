import type { Metadata } from "next";

import "./globals.css";
import { ThemeProvider } from "@wrksz/themes/next";

import { cn } from "@/lib/utils";

import { appFontClasses } from "./fonts";

export const metadata: Metadata = {
  title: "Vionex",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", appFontClasses)} suppressHydrationWarning>
      <body className="min-h-full">
        <ThemeProvider storage="cookie" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
