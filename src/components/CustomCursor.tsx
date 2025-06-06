"use client";

import React, { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  // 用于记录光标可见性，避免不必要的 style 赋值
  const visibleRef = useRef(false);
  // 用于 requestAnimationFrame 节流
  const rafRef = useRef<number | null>(null);
  // 记录上一次位置，避免重复赋值
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const width = 25;
    const height = 25;
    const offsetX = width / 2;
    const offsetY = height / 2;

    // 只在必要时更新 transform
    const updateCursor = (x: number, y: number) => {
      if (!cursorRef.current) return;
      if (
        !lastPos.current ||
        lastPos.current.x !== x ||
        lastPos.current.y !== y
      ) {
        cursorRef.current.style.transform = `translate3d(${x - offsetX}px, ${
          y - offsetY
        }px, 0)`;
        lastPos.current = { x, y };
      }
      if (!visibleRef.current) {
        cursorRef.current.style.opacity = "1";
        visibleRef.current = true;
      }
    };

    let pendingX = 0,
      pendingY = 0,
      hasPending = false;
    const onMouseMove = (e: MouseEvent) => {
      pendingX = e.clientX;
      pendingY = e.clientY;
      if (!hasPending) {
        hasPending = true;
        rafRef.current = window.requestAnimationFrame(() => {
          updateCursor(pendingX, pendingY);
          hasPending = false;
        });
      }
    };

    const onMouseLeave = () => {
      if (cursorRef.current && visibleRef.current) {
        cursorRef.current.style.opacity = "0";
        visibleRef.current = false;
      }
    };
    const onMouseEnter = () => {
      if (cursorRef.current && !visibleRef.current) {
        cursorRef.current.style.opacity = "1";
        visibleRef.current = true;
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // 初始化隐藏
    if (cursorRef.current) {
      cursorRef.current.style.opacity = "0";
      visibleRef.current = false;
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const cursorStyle = {
    width: "25px",
    height: "25px",
    opacity: 0,
    transition: "opacity 0.2s cubic-bezier(.4,0,.2,1)",
    mixBlendMode: "difference" as const,
    willChange: "transform, opacity",
    position: "fixed" as const,
    top: 0,
    left: 0,
    transform: "translate3d(0px, 0px, 0)",
    pointerEvents: "none" as const,
  };

  return <div ref={cursorRef} className="cursor-dot" style={cursorStyle} />;
}
