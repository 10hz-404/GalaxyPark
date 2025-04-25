"use client";

import Link from "next/link";
import Image from "next/image";
import { ResponsiveLayout } from "./ResponsiveLayout";
import { CloseIcon } from "../assets/icons/close";
import { useScreenSize } from "../hooks/useScreenSize";

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FullscreenMenu({ isOpen, onClose }: FullscreenMenuProps) {
  const { isDesktop, isMobile } = useScreenSize();

  return (
    <div
      className={`fixed inset-0 bg-[var(--glxp-orange)] z-[100] flex flex-col transition-all duration-700 ease-in-out ${
        isOpen
          ? "opacity-100 visible transform translate-y-0"
          : "opacity-100 invisible transform -translate-y-full"
      }`}
    >
      {/* 顶部Logo和关闭按钮 */}
      <nav className="w-full z-[150] py-5">
        <div className="mx-auto px-7 sm:px-7 lg:px-20">
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

            {/* 关闭按钮 - 使用CloseIcon */}
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center p-2 rounded-md clickable"
              aria-expanded={isOpen ? "true" : "false"}
            >
              <CloseIcon
                className={isDesktop ? "w-8 h-8" : "w-6 h-6"}
                fill="var(--glxp-yellow)"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* 菜单内容 - 使用ResponsiveLayout组件 */}
      <div className="flex flex-grow">
        <ResponsiveLayout
          mobileClassName="flex flex-col items-start w-full h-full pt-15 pl-6"
          desktopClassName="flex flex-col items-end justify-center w-full h-full pr-40"
        >
          {/* 菜单项*/}
          <nav className="menu-items">
            <div className="mb-6 md:mb-8">
              <div className="flex items-center gap-6 md:gap-8">
                <span className="text-[var(--glxp-yellow)] italic text-xl md:text-2xl">
                  01
                </span>
                <Link
                  href="/work"
                  className="text-5xl md:text-7xl lg:text-9xl text-[var(--glxp-yellow)] font-bold duration-300"
                  onClick={onClose}
                >
                  BLOG
                </Link>
              </div>
            </div>

            <div className="mb-6 md:mb-8">
              <div className="flex items-center gap-6 md:gap-8">
                <span className="text-[var(--glxp-yellow)] italic text-xl md:text-2xl">
                  02
                </span>
                <Link
                  href="/info"
                  className="text-5xl md:text-7xl lg:text-9xl text-[var(--glxp-yellow)] font-bold duration-300"
                  onClick={onClose}
                >
                  PHOTO
                </Link>
              </div>
            </div>

            <div className="mb-6 md:mb-8">
              <div className="flex items-center gap-6 md:gap-8">
                <span className="text-[var(--glxp-yellow)] italic text-xl md:text-2xl">
                  03
                </span>
                <Link
                  href="/journal"
                  className="text-5xl md:text-7xl lg:text-9xl text-[var(--glxp-yellow)] font-bold duration-300"
                  onClick={onClose}
                >
                  ABOUT
                </Link>
              </div>
            </div>

            <div className="mb-6 md:mb-8">
              <div className="flex items-center gap-6 md:gap-8">
                <span className="text-[var(--glxp-yellow)] italic text-xl md:text-2xl">
                  04
                </span>
                <Link
                  href="/store"
                  className="text-5xl md:text-7xl lg:text-9xl text-[var(--glxp-yellow)] font-bold duration-300"
                  onClick={onClose}
                >
                  CONTACT
                </Link>
              </div>
            </div>
          </nav>
        </ResponsiveLayout>
      </div>
    </div>
  );
}
