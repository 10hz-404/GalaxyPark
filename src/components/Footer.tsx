import React from "react";
import Link from "next/link";
import menus from "../config/menus";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    // todo 待删除bg-black
    <footer className="px-6 py-10 bg-black text-cream md:px-10">
      <div className="max-w-md mx-auto md:max-w-7xl">
        {/* 桌面端布局顶部部分 */}
        <div className="hidden md:flex md:items-start md:justify-between md:mb-16">
          {/* 左侧 - 邮件订阅和LOGO */}
          <div className="flex-1">
            <div className="mb-10">
              <h3 className="mb-4 text-xl text-cream">
                Sign up to our newsletter
              </h3>
              <form className="flex flex-col gap-4">
                <div className="flex items-center">
                  <input
                    type="email"
                    placeholder="Enter e-mail here"
                    className="w-64 py-2 pr-10 placeholder-gray-500 bg-transparent border-b border-cream text-cream focus:outline-none"
                    required
                  />
                  <button
                    type="submit"
                    className="p-2 ml-4 transition-colors bg-transparent border rounded-full border-cream hover:bg-cream hover:text-black"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="newsletter-consent"
                    className="mt-1"
                  />
                  <label htmlFor="newsletter-consent" className="text-sm">
                    I confirm I want to receive the GalaxyPark newsletter.
                  </label>
                </div>
              </form>
            </div>

            {/* items-center */}
            <div className="flex justify-between mb-6">
              <div>
                <svg
                  width="500"
                  height="400"
                  viewBox="0 0 700 140"
                  className="fill-current text-cream"
                >
                  <text x="0" y="50" fontSize="200" fontWeight="bold">
                    Galaxy
                  </text>
                  <text x="0" y="250" fontSize="200" fontWeight="bold">
                    Park
                  </text>
                </svg>
              </div>

              <div className="flex-shrink-0">
                <div className="flex flex-col items-end mt-20">
                  {menus.map((menu) => (
                    <Link key={menu.name} href={menu.path} className="mb-6">
                      {menu.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 移动端 Logo */}
        <div className="mb-4 md:hidden">
          <svg
            width="200"
            height="80"
            viewBox="0 0 500 60"
            className="fill-current text-cream"
          >
            <text x="0" y="60" fontSize="80" fontWeight="bold">
              Galaxy Park
            </text>
          </svg>
        </div>

        {/* 移动端的订阅表单 */}
        <div className="mb-10 md:hidden">
          <h3 className="mb-4 text-lg text-cream">Sign up to our newsletter</h3>
          <form className="flex flex-col gap-4">
            <div className="flex items-center">
              <input
                type="email"
                placeholder="Enter e-mail here"
                className="flex-1 py-2 pr-10 placeholder-gray-500 bg-transparent border-b border-cream text-cream focus:outline-none"
                required
              />
              <button
                type="submit"
                className="p-2 ml-2 transition-colors bg-transparent border rounded-full border-cream hover:bg-cream hover:text-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="newsletter-consent-mobile"
                className="mt-1"
              />
              <label htmlFor="newsletter-consent-mobile" className="text-sm">
                I confirm I want to receive the GalaxyPark newsletter.
              </label>
            </div>
          </form>
        </div>

        {/* 社交媒体链接 - 响应式设计 */}
        <div className="flex gap-4 mb-10 md:hidden">
          <Link
            href="https://linkedin.com"
            className="flex-1 px-5 py-2 text-center transition-colors border rounded-full border-cream hover:bg-cream hover:text-black"
          >
            LinkedIn
          </Link>
          <Link
            href="https://instagram.com"
            className="flex-1 px-5 py-2 text-center transition-colors border rounded-full border-cream hover:bg-cream hover:text-black"
          >
            Instagram
          </Link>
        </div>

        {/* 底部信息 - 响应式设计 */}
        <div className="md:flex md:items-center md:justify-between md:pt-6 ">
          {/* 联系信息 */}
          <div className="mb-6 text-sm md:mb-0 md:text-base md:flex md:gap-10">
            <div>
              <p>1208490466@qq.com</p>
            </div>

            <Link href="/privacy" className="hidden md:inline hover:underline">
              Privacy Policy
            </Link>
          </div>

          {/* 地址和版权 */}
          <div className="mb-6 text-sm md:mb-0 md:text-base">
            <p>
              HERE, Xiashan District, Zhanjiang City, Guangdong Province, China
            </p>
            <p>© {currentYear} Only GalaxyPark Limited</p>
          </div>

          {/* 桌面端社交媒体链接 */}
          <div className="hidden md:flex md:gap-4">
            <Link
              href="https://linkedin.com"
              className="px-6 py-2 transition-colors border rounded-full border-cream hover:bg-cream hover:text-black"
            >
              LinkedIn
            </Link>
            <Link
              href="https://instagram.com"
              className="px-6 py-2 transition-colors border rounded-full border-cream hover:bg-cream hover:text-black"
            >
              Instagram
            </Link>
          </div>
        </div>

        {/* 移动端隐私政策链接 */}
        <div className="mb-6 md:hidden">
          <Link href="/privacy" className="text-sm hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
