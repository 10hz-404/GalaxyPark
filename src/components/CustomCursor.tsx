"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // 跟随鼠标光标
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (cursorRef.current) {
        // 计算宽高的一半以获得偏移量，使鼠标位于圆点中心
        const width = isHoveringClickable ? 60 : 25;
        const height = isHoveringClickable ? 60 : 25;
        const offsetX = width / 2;
        const offsetY = height / 2;

        // 使用 transform 并应用偏移量，使鼠标位于圆心
        cursorRef.current.style.transform = `translate(${
          e.clientX - offsetX
        }px, ${e.clientY - offsetY}px)`;

        // 首次移动鼠标时显示光标
        if (!isVisible) {
          setIsVisible(true);
        }
      }
    },
    [isVisible, isHoveringClickable]
  );

  // 检测鼠标是否悬停在可点击元素上
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

    setIsHoveringClickable(isClickable);
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
    // 添加事件监听
    window.addEventListener("mousemove", (e) => {
      requestAnimationFrame(() => handleMouseMove(e))
    });
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // 清理函数
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [handleMouseMove, handleMouseOver, handleMouseLeave, handleMouseEnter]);

  const cursorStyle = {
    // 在可点击元素上时，光标变大
    width: isHoveringClickable ? "60px" : "25px",
    height: isHoveringClickable ? "60px" : "25px",
    // 移出屏幕外时隐藏光标
    opacity: isVisible ? 1 : 0,
    // 添加平滑过渡效果
    transition: "width 0.2s, height 0.2s, opacity 0.3s",
    // 添加反色效果
    mixBlendMode: "difference" as const,
  };

  return <div ref={cursorRef} className="cursor-dot" style={cursorStyle} />;
}
