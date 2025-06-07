"use client";

import React, { useEffect, useRef, useCallback } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const isVisible = useRef(false);
  const isFirstMove = useRef(true);

  // 预计算偏移量
  const CURSOR_SIZE = 25;
  const OFFSET = CURSOR_SIZE / 2;

  // 使用 useCallback 缓存更新函数
  const updateCursor = useCallback((x: number, y: number) => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // 使用 CSS Transform 而不是直接操作 style
    cursor.style.transform = `translate3d(${x - OFFSET}px, ${y - OFFSET}px, 0)`;
  }, []);

  // 优化鼠标移动处理
  const handleMouseMove = useCallback((e: MouseEvent) => {
    // 取消之前的 RAF
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    // 使用 RAF 进行节流
    rafRef.current = requestAnimationFrame(() => {
      updateCursor(e.clientX, e.clientY);
    });

    // 首次移动时显示光标
    if (isFirstMove.current && cursorRef.current) {
      cursorRef.current.style.opacity = "1";
      isVisible.current = true;
      isFirstMove.current = false;
    }
  }, []);

  // 优化显示/隐藏处理
  const handleMouseLeave = useCallback(() => {
    const cursor = cursorRef.current;
    if (cursor && isVisible.current) {
      cursor.style.opacity = "0";
      isVisible.current = false;
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    const cursor = cursorRef.current;
    if (cursor && !isVisible.current && !isFirstMove.current) {
      cursor.style.opacity = "1";
      isVisible.current = true;
    }
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // 初始化样式
    cursor.style.opacity = "0";
    cursor.style.transform = "translate3d(0px, 0px, 0)";

    // 添加事件监听器
    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, {
      passive: true,
    });
    document.addEventListener("mouseenter", handleMouseEnter, {
      passive: true,
    });

    return () => {
      // 清理事件监听器
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);

      // 取消待处理的动画帧
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="cursor-dot"
      style={{
        width: `${CURSOR_SIZE}px`,
        height: `${CURSOR_SIZE}px`,
        opacity: 0,
        transition: "opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        mixBlendMode: "difference",
        willChange: "transform",
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9999,
        // 添加 GPU 加速相关属性
        backfaceVisibility: "hidden",
        perspective: 1000,
      }}
    />
  );
}
