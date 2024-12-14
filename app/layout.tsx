import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Caveat_Brush, Inter } from "@next/font/google";
import type { Metadata } from "next";
import React from "react";
import Appbar from "../components/common/app-navbar";
import { AppSidebar } from "../components/common/app-sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sri Manjunatha",
  description: "Sri Manjunatha Engineering Works",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const caveatBrush = Caveat_Brush({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-caveat-brush",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${caveatBrush.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <SidebarProvider>
            <AppSidebar />
            <main className="w-[calc(100vw-16rem)] h-100vh flex flex-col overflow-auto">
              <Appbar />
              <div className="p-8 mt-[60px] h-full w-full">
              {children}
              </div>
             
            </main>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
