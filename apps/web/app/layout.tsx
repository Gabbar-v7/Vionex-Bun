import type { Metadata } from "next";
import "./globals.css";
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
    <html
      lang="en"
      className={cn("h-full", appFontClasses)}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
