import React from "react";
import Link from "next/link";
import menus from "../config/menus";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      {/* 桌面端布局顶部部分 */}
      <div className="hidden xl:flex xl:items-start xl:justify-between">
        {/* 左侧 - 邮件订阅和LOGO */}
        <div className="flex-1">
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
              <div className="flex flex-col items-end mt-25">
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
          width="250"
          height="80"
          viewBox="0 0 550 60"
          className="fill-current text-cream"
        >
          <text x="0" y="60" fontSize="80" fontWeight="bold">
            Galaxy Park
          </text>
        </svg>
      </div>

      {/* 底部信息 - 响应式设计 */}
      <div className="xl:flex xl:items-center xl:justify-between xl:pt-6 ">
        {/* 联系信息 */}
        <div className="mb-6 text-sm xl:mb-0 xl:text-base xl:flex xl:gap-10">
          <div>
            <p>1208490466@qq.com</p>
          </div>
        </div>

        {/* 地址、版权、社交媒体链接 - 移动端 */}
        <div className="text-sm xl:mb-0 xl:text-base">
          {/* 地址 */}
          <p className="mb-6 xl:mb-0">
            HERE, Xiashan District, Zhanjiang City, Guangdong Province, China
          </p>

          {/* 社交媒体链接 */}
          <div className="flex gap-4 mb-6 xl:hidden">
            <Link
              href="https://www.xiaohongshu.com/user/profile/5dbd03f700000000010089b2"
              className="flex-1 px-4 py-2 text-sm text-center transition-colors border rounded-full border-cream hover:bg-cream"
              target="_blank"
              rel="noopener noreferrer"
            >
              RedNote
            </Link>
          </div>

          {/* 版权 */}
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
