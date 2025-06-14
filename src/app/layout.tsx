import type { Metadata } from "next";
import localFont from "next/font/local";
import { Provider } from "./provider";
import { Navbar } from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import "./globals.css";

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
      path: "../../public/fonts/IBMPlexSansSC-Medium/IBMPlexSansSC-Medium.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/IBMPlexSansSC-Medium/IBMPlexSansSC-Medium.otf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-ibm-plex-sans-sc",
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
    <html
      lang="en"
      className={`${ibmPlexSansCondensed.variable} ${smileySans.variable} ${madeBonVoyageRegular.variable} ${madeBonVoyageThin.variable} ${neueMachina.variable} antialiased`}
    >
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body>
        <Provider>
          {/* 导航栏 */}
          <Navbar />

          <main className="px-6 pt-20 pb-10 text-cream xl:px-10 ">
            <div className="max-w-md mx-auto mt-5 xl:max-w-7xl">
              {/* 主体内容 */}
              {children}

              {/* 页脚 */}
              <div className="block xl:hidden">
                <Footer />
              </div>
            </div>
          </main>

          {/* 鼠标光标 - 只在xl断点(1280px)及以上显示 */}
          <div className="hidden xl:block">
            <CustomCursor />
          </div>

          {/* 滚动回到顶部按钮 */}
          {/* <ScrollToTop /> */}
        </Provider>
      </body>
    </html>
  );
}
