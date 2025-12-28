"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";

// 配置 NProgress
NProgress.configure({
  showSpinner: false, // 隐藏右上角的 spinner
  minimum: 0.1, // 最小进度值
  speed: 300, // 动画速度
  trickleSpeed: 100, // 自动递增速度
});

export function NProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // 路由变化时停止进度条
    NProgress.done();
  }, [pathname, searchParams]);

  useEffect(() => {
    // 监听所有链接点击，启动进度条
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (!anchor) return;

      const href = anchor.getAttribute("href");

      // 只处理内部链接
      if (
        href &&
        href.startsWith("/") &&
        !href.startsWith("//") &&
        !anchor.hasAttribute("download") &&
        anchor.getAttribute("target") !== "_blank"
      ) {
        // 如果是当前页面的锚点链接，不显示进度条
        if (href.startsWith("#") || href === pathname) return;

        NProgress.start();
      }
    };

    // 监听浏览器前进/后退
    const handlePopState = () => {
      NProgress.start();
    };

    document.addEventListener("click", handleClick);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [pathname]);

  return null;
}
