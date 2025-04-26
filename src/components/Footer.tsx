import React from "react";
import Link from "next/link";
import menus from "../config/menus";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    // todo 待删除bg-black
    <footer className="px-6 pb-10 text-cream xl:px-10 ">
      <div className="max-w-md mx-auto xl:max-w-7xl">
        {/* 桌面端布局顶部部分 */}
        <div className="hidden xl:flex xl:items-start xl:justify-between">
          {/* 左侧 - 邮件订阅和LOGO */}
          <div className="flex-1">
            {/* <div className="mb-10">
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
            </div> */}

            {/* items-center */}
            <div className="flex items-center justify-between mb-6">
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
                <div className="flex flex-col items-end mt-30">
                  {menus.map((menu) => (
                    <Link key={menu.name} href={menu.path} className="mb-8">
                      {menu.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 移动端 Logo */}
        <div className="mb-4 xl:hidden">
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
        {/* <div className="mb-10 xl:hidden">
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
        </div> */}

        {/* 社交媒体链接 - 移动端 */}
        <div className="flex gap-4 mb-10 xl:hidden">
          <Link
            href="https://www.xiaohongshu.com/user/profile/5dbd03f700000000010089b2"
            className="flex-1 px-4 py-2 text-sm text-center transition-colors border rounded-full border-cream hover:bg-cream"
            target="_blank"
            rel="noopener noreferrer"
          >
            RedNote
          </Link>
          <Link
            href="https://weibo.com/u/7994883037"
            className="flex-1 px-4 py-2 text-sm text-center transition-colors border rounded-full border-cream hover:bg-cream"
            target="_blank"
            rel="noopener noreferrer"
          >
            WeiBo
          </Link>
        </div>

        {/* 底部信息 - 响应式设计 */}
        <div className="xl:flex xl:items-center xl:justify-between xl:pt-6 ">
          {/* 联系信息 */}
          <div className="mb-6 text-sm xl:mb-0 xl:text-base xl:flex xl:gap-10">
            <div>
              <p>1208490466@qq.com</p>
            </div>
          </div>

          {/* 地址和版权 */}
          <div className="mb-6 text-sm xl:mb-0 xl:text-base">
            <p className="mb-6 xl:mb-0">
              HERE, Xiashan District, Zhanjiang City, Guangdong Province, China
            </p>
            <p>© {currentYear} Only GalaxyPark Limited</p>
          </div>

          {/* 桌面端社交媒体链接 */}
          <div className="hidden xl:flex xl:gap-4">
            <Link
              href="https://www.xiaohongshu.com/user/profile/5dbd03f700000000010089b2"
              className="px-6 py-2 transition-colors border rounded-full border-cream hover:bg-cream"
              target="_blank"
              rel="noopener noreferrer"
            >
              RedNote
            </Link>
            <Link
              href="https://weibo.com/u/7994883037"
              className="px-6 py-2 transition-colors border rounded-full border-cream hover:bg-cream"
              target="_blank"
              rel="noopener noreferrer"
            >
              WeiBo
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
