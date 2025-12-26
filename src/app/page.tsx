import Footer from "@/components/Footer";
import Image from "next/image";

/** 首页 */
export default function Home() {
  return (
    <>
      <div className="w-full min-h-screen flex flex-col items-center justify-center">
        <div className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden xl:h-auto xl:w-full xl:max-w-[90vw]">
          <Image
            src="/content/Home.jpeg"
            alt="Home"
            width={4000}
            height={2141}
            className="w-[100vh] h-[100vw] rotate-90 object-cover max-w-none xl:rotate-0 xl:w-full xl:h-auto xl:max-w-full"
            priority
          />
        </div>
      </div>

      <div className="hidden xl:block">
        <Footer />
      </div>
    </>
  );
}
