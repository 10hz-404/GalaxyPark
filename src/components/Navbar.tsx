"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FullscreenMenu } from "./FullscreenMenu";
import { MenuIcon } from "../assets/icons/menu";
import { useScreenSize } from "../hooks/useScreenSize";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isMobile } = useScreenSize();
  const [mounted, setMounted] = useState(false);

  // 确保组件已经在客户端挂载后再渲染会变化的部分
  useEffect(() => {
    setMounted(true);
  }, []);

  // 控制菜单打开时页面滚动
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"; // 当菜单打开时，禁止页面滚动
    } else {
      document.body.style.overflow = ""; // 当菜单关闭时，恢复页面滚动
    }
    return () => {
      document.body.style.overflow = ""; // 组件卸载时恢复滚动
    };
  }, [isMenuOpen]);

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`nav-bar fixed top-5 left-0 right-0 z-50 transition-all duration-300`}
      >
        <div className="px-4 mx-auto sm:px-6 lg:px-20">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/">
              <div className="flex-shrink-0">
                <div className="flex items-center cursor-pointer">
                  <Image
                    src="/vercel.svg"
                    alt="Galaxy Park Logo"
                    width={120}
                    height={40}
                    className="w-auto h-10"
                  />
                </div>
              </div>
            </Link>

            {/* Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="z-50 inline-flex items-center justify-center p-2 rounded-md clickable"
              aria-expanded={isMenuOpen ? "true" : "false"}
            >
              {mounted && isMobile ? (
                <MenuIcon fill="var(--glxp-beige)" className="w-8 h-8" />
              ) : (
                <span className="clickable text-[var(--glxp-beige)] text-lg font-medium">
                  MENU
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* 引入全屏菜单组件 */}
      <FullscreenMenu isOpen={isMenuOpen} onClose={handleCloseMenu} />
    </>
  );
}
