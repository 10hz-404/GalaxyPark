'use client';

import { useState, useEffect } from 'react';

export function useScreenSize() {
  // 默认假设是桌面设备
  const [isDesktop, setIsDesktop] = useState(true);
  
  useEffect(() => {
    // 只在客户端执行
    if (typeof window !== 'undefined') {
      // 初始化检测
      const checkIsDesktop = () => {
        setIsDesktop(window.innerWidth >= 1280);
      };
      
      // 第一次加载时检测
      checkIsDesktop();
      
      // 监听窗口大小变化
      window.addEventListener('resize', checkIsDesktop);
      
      // 清理函数
      return () => {
        window.removeEventListener('resize', checkIsDesktop);
      };
    }
  }, []);
  
  return { isDesktop, isMobile: !isDesktop };
}