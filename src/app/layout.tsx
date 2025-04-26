import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Provider } from "./provider";
import { Navbar } from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import { Footer } from "@/components/Footer";

// 添加本地NeueMachina字体作为默认英文字体
const neueMachina = localFont({
  src: [
    {
      path: "../../public/fonts/NeueMachina/PPNeueMachina-PlainRegular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-neue-machina",
});

// 添加本地SmileySans得意黑字体
const smileySans = localFont({
  src: [
    {
      path: "../../public/fonts/SmileySans/SmileySans-Oblique.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/SmileySans/SmileySans-Oblique.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-smiley-sans",
});

// 添加本地IBMPlexSansCondensed-Medium字体
const ibmPlexSansCondensed = localFont({
  src: [
    {
      path: "../../public/fonts/IBMPlexSansCondensed-Medium/IBMPlexSansCondensed-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/IBMPlexSansCondensed-Medium/IBMPlexSansCondensed-Medium.otf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-ibm-plex-sans-condensed",
});

// 添加本地Made Bon Voyage字体
const madeBonVoyageRegular = localFont({
  src: [
    {
      path: "../../public/fonts/made-bon-voyage/MADE Bon Voyage Regular PERSONAL USE.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-made-bon-voyage-regular",
});

const madeBonVoyageThin = localFont({
  src: [
    {
      path: "../../public/fonts/made-bon-voyage/MADE Bon Voyage Thin PERSONAL USE.otf",
      weight: "100",
      style: "normal",
    },
  ],
  variable: "--font-made-bon-voyage-thin",
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
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body
        className={`${ibmPlexSansCondensed.variable} ${smileySans.variable} ${madeBonVoyageRegular.variable} ${madeBonVoyageThin.variable} ${neueMachina.variable} antialiased`}
      >
        <Provider>
          {/* 导航栏 */}
          <Navbar />

          {/* 主体内容 */}
          <main className="pt-20">{children}</main>

          {/* 页脚 */}
          <Footer />

          {/* 鼠标光标 - 只在xl断点(1280px)及以上显示 */}
          <div className="hidden xl:block">
            <CustomCursor />
          </div>
        </Provider>
      </body>
    </html>
  );
}
