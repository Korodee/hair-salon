import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/utils/QueryProvider";
import { ToastContainer } from "react-toastify";
import { ApplicationProvider } from "@/context/appContext";
import { Suspense } from "react";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BraidzWorld",
  description: "Slay With Every Twist",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <ApplicationProvider>
            <main>
              <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
            </main>
          </ApplicationProvider>
        </QueryProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
