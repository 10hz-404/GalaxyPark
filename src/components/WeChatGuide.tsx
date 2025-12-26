"use client";

import { useEffect, useState } from "react";

export const WeChatGuide = () => {
  const [isWeChat, setIsWeChat] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    // 判断是否在微信环境中
    if (ua.match(/micromessenger/i)) {
      setIsWeChat(true);
    }
  }, []);

  if (!isWeChat) return null;

  return (
    <div className="fixed inset-0 z-[9990] flex flex-col items-end px-6 pt-4 bg-black/90 backdrop-blur-sm">
      {/* 箭头指向右上角 */}
      <div className="mr-[20px] -mt-[10px] animate-bounce">
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white transform rotate-45"
        >
          <path
            d="M30 5L30 55M30 5L5 30M30 5L55 30"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="mt-4 text-right text-white">
        <p className="text-xl font-bold mb-2">请点击右上角</p>
        <p className="text-lg opacity-80">选择“在浏览器打开”</p>
        <p className="text-sm opacity-60 mt-2">以获得最佳浏览体验</p>
      </div>
    </div>
  );
};
