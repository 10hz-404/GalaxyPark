import Link from "next/link";
import Image from "next/image";
import { CloseIcon } from "../assets/icons/close";
import menus from "../config/menus";

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FullscreenMenu({ isOpen, onClose }: FullscreenMenuProps) {
  return (
    <div
      className={`fixed inset-0 bg-[var(--glxp-orange)] z-[100] flex flex-col transition-all duration-700 ease-in-out ${
        isOpen
          ? "opacity-100 visible transform translate-y-0"
          : "opacity-100 invisible transform -translate-y-full"
      }`}
    >
      {/* 顶部Logo和关闭按钮 */}
      <nav className="w-full z-[150] pt-3">
        <div className="mx-auto px-7 sm:px-7 lg:px-20">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/">
              <div className="flex-shrink-0">
                <div className="flex items-center cursor-pointer">
                  <Image
                    src="/logo.svg"
                    alt="Galaxy Park Logo"
                    width={144}
                    height={48}
                    className="w-auto h-10 xl:h-12 invert-[53%] sepia-[20%] saturate-[4000%] hue-rotate-[1deg] brightness-[102%] contrast-[105%]"
                    style={{
                      filter:
                        "var(--glxp-yellow-filter, invert(0%) sepia(100%) saturate(4000%) hue-rotate(1deg) brightness(1000%) contrast(100%))",
                    }}
                  />
                </div>
              </div>
            </Link>

            {/* 关闭按钮 - 使用响应式类控制大小 */}
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center p-2 rounded-md clickable"
              aria-expanded={isOpen ? "true" : "false"}
            >
              <CloseIcon
                className="w-6 h-6 xl:w-8 xl:h-8"
                fill="var(--glxp-yellow)"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* 菜单内容 */}
      <div className="flex flex-grow">
        <div className="flex flex-col items-start w-full h-full pl-6 pt-15 xl:items-end xl:justify-center xl:pr-40">
          {/* 菜单项*/}
          <nav className="menu-items">
            {menus.map((menu, index) => (
              <div key={menu.name} className="mb-8">
                <div className="flex items-center gap-6 xl:gap-8">
                  <span className="text-[var(--glxp-yellow)] italic text-2xl xl:text-4xl font-bold font-made-bon-voyage">
                    {String(index + 1).padStart(2, "0")}.
                  </span>
                  <Link
                    href={menu.path}
                    className="text-5xl xl:text-9xl text-[var(--glxp-yellow)] font-bold duration-300"
                    onClick={onClose}
                  >
                    {menu.name}
                  </Link>
                </div>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
