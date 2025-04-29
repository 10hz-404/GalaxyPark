"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isHoveringRef = useRef(false);

  // 处理鼠标移动，直接更新位置
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!cursorRef.current) return;

      const width = isHoveringRef.current ? 60 : 25;
      const height = isHoveringRef.current ? 60 : 25;
      const offsetX = width / 2;
      const offsetY = height / 2;

      // 直接更新位置，不使用插值
      cursorRef.current.style.transform = `translate3d(${
        e.clientX - offsetX
      }px, ${e.clientY - offsetY}px, 0)`;

      // 首次移动鼠标时显示光标
      if (!isVisible) {
        setIsVisible(true);
      }
    },
    [isVisible]
  );

  // 使用节流处理检测鼠标是否悬停在可点击元素上
  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const targetTagName = target.tagName.toLowerCase();

    // 使用closest方法检查当前元素或其任何父元素是否包含clickable类
    const hasClickableParent = Boolean(target.closest(".clickable"));

    const isClickable =
      hasClickableParent ||
      targetTagName === "a" ||
      targetTagName === "button" ||
      (targetTagName === "input" && target.getAttribute("type") === "submit") ||
      target.classList.contains("cursor-pointer") ||
      target.closest("a") !== null ||
      target.hasAttribute("href") ||
      target.getAttribute("role") === "button";

    // 使用ref跟踪状态以避免闭包问题
    if (isClickable !== isHoveringRef.current) {
      isHoveringRef.current = isClickable;
      setIsHoveringClickable(isClickable);
    }
  }, []);

  // 鼠标离开页面处理函数
  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  // 鼠标进入页面处理函数
  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    // 使用passive: true提高事件监听性能
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 使用防抖优化mouseover事件，减少不必要的状态更新
    let debounceTimer: NodeJS.Timeout;
    const debouncedMouseOver = (e: MouseEvent) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => handleMouseOver(e), 50);
    };

    document.addEventListener("mouseover", debouncedMouseOver, {
      passive: true,
    });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // 清理函数
    return () => {
      clearTimeout(debounceTimer);

      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", debouncedMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [handleMouseMove, handleMouseOver, handleMouseLeave, handleMouseEnter]);

  // 应用硬件加速和优化的CSS
  const cursorSize = isHoveringClickable ? "60px" : "25px";

  const cursorStyle = {
    width: cursorSize,
    height: cursorSize,
    opacity: isVisible ? 1 : 0,
    transition: "width 0.2s, height 0.2s, opacity 0.3s",
    mixBlendMode: "difference" as const,
    // 使用硬件加速
    willChange: "transform",
    // 初始位置设置为0，防止初始闪烁
    position: "fixed" as const,
    top: 0,
    left: 0,
    transform: "translate3d(0px, 0px, 0)",
    pointerEvents: "none" as const,
  };

  return <div ref={cursorRef} className="cursor-dot" style={cursorStyle} />;
}
