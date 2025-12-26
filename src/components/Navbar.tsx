"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FullscreenMenu } from "./FullscreenMenu";
import { MenuIcon } from "../assets/icons/menu";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 确保组件已经在客户端挂载后再渲染会变化的部分
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`nav-bar fixed pt-3 left-0 right-0 z-50 transition-all duration-300`}
      >
        <div className="mx-auto px-7 sm:px-7 lg:px-20">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/">
              <div className="flex-shrink-0">
                <div className="flex items-center cursor-pointer">
                  <Image
                    src="/logo.svg"
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
              {mounted && (
                <>
                  <MenuIcon
                    fill="var(--glxp-beige)"
                    className="w-8 h-8 xl:hidden"
                  />
                  <span className="hidden xl:block clickable text-[var(--glxp-beige)] text-lg font-medium">
                    MENU
                  </span>
                </>
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
