import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "./provider";
import { Navbar } from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import { ResponsiveLayout } from "@/components/ResponsiveLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Galaxy Park",
  description: "LinYao's WebSite",
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
        <Provider>
          {/* 导航栏 */}
          <Navbar />

          {/* 主体内容 */}
          <main className="pt-20">{children}</main>

          {/* 鼠标光标 */}
          <ResponsiveLayout desktopClassName="block" mobileClassName="hidden">
            <CustomCursor />
          </ResponsiveLayout>
        </Provider>
      </body>
    </html>
  );
}
