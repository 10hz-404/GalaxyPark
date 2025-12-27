"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FullscreenMenu } from "./FullscreenMenu";
import { MenuIcon } from "../assets/icons/menu";

export function Navbar() {
  // Menu State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Scroll State
  const [showReturnToTop, setShowReturnToTop] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Effect for hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 300) {
        // At the top (within 300px), always show Logo
        setShowReturnToTop(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling UP and NOT at top -> Show "Return to top"
        setShowReturnToTop(true);
      } else {
        // Scrolling DOWN -> Show Logo
        setShowReturnToTop(false);
      }
      setIsScrolled(currentScrollY > 10);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`nav-bar fixed pt-3 left-0 right-0 z-50 transition-all duration-300`}
      >
        <div
          className={`absolute top-0 left-0 right-0 -z-10 transition-all duration-300 ${
            isScrolled
              ? "bg-black/30 backdrop-blur-md bottom-1 xl:hidden"
              : "bg-transparent bottom-0"
          }`}
        />
        <div className="mx-auto px-7 sm:px-7 lg:px-20">
          <div className="flex items-center justify-between h-20">
            {/* Logo / Return to Top Container */}
            <div className="relative w-[144px] h-[48px] flex items-center">
              {/* Logo - Shows when NOT scrolling up */}
              <div
                className={`absolute inset-0 flex items-center transition-all duration-500 transform ${
                  showReturnToTop ? "-translate-y-4 opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
                }`}
              >
                <Link href="/">
                  <div className="flex-shrink-0 cursor-pointer">
                    <Image
                      src="/logo.svg"
                      alt="Galaxy Park Logo"
                      width={144}
                      height={48}
                      className="w-auto h-10 xl:h-12"
                    />
                  </div>
                </Link>
              </div>

              {/* Return to Top Text - Shows when scrolling up */}
              <button
                onClick={scrollToTop}
                className={`absolute inset-0 flex items-center justify-start transition-all duration-500 transform ${
                  showReturnToTop ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
                }`}
              >
                 <span className="text-[var(--glxp-beige)] text-lg font-medium whitespace-nowrap">
                  Return to top
                </span>
              </button>
            </div>

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
