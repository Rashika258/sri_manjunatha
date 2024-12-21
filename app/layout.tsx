import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Caveat_Brush, Inter } from "next/font/google";
import type { Metadata } from "next";
import React from "react";
import Appbar from "../components/common/app-navbar";
import { AppSidebar } from "../components/common/app-sidebar";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import "./globals.css";
import { ReactQueryClientProvider } from "@/components/react-query-client-provider";

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
  const queryClient = new QueryClient()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${caveatBrush.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ReactQueryClientProvider>
          <SidebarProvider>
            <AppSidebar />
            <main className={`h-screen w-screen flex flex-col overflow-hidden`}>
              <Appbar />
              {children}
            </main>
          </SidebarProvider>
          </ReactQueryClientProvider>
     
        </ThemeProvider>
      </body>
    </html>
  );
}
