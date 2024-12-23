import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider, Toaster } from "@/components/ui/index";
import { Caveat_Brush, Inter } from "next/font/google";
import type { Metadata } from "next";
import React from "react";
import { AppNavbar, AppSidebar, AppWrapper } from "@/components/common/index";
import { ReactQueryClientProvider } from "@/components/react-query-client-provider";
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
          <ReactQueryClientProvider>
            <SidebarProvider>
              <AppSidebar />
              <main
                className={`h-screen w-screen flex flex-col overflow-hidden`}
              >
                <AppNavbar />
                <AppWrapper>{children}</AppWrapper>
                <Toaster position="bottom-right" />
              </main>
            </SidebarProvider>
          </ReactQueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
