"use client";

import Footer from "@/components/Footer";
import { useState, useEffect, useRef } from "react";

// Base64 blur placeholder (inline, ~500 bytes, 无需网络请求)
const BLUR_PLACEHOLDER = "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAALABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAECAwT/xAAfEAACAQQCAwAAAAAAAAAAAAABAgADERIhEzFBUYH/xAAWAQEBAQAAAAAAAAAAAAAAAAABAAL/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDMsjGmQqn2MZTheMgIu/OM5yzBxY9CNq1QggtqYJGlY239hJd2v3CKf//Z";

/** 首页 */
export default function Home() {
  const [intermediateLoaded, setIntermediateLoaded] = useState(false);
  const [originalLoaded, setOriginalLoaded] = useState(false);
  
  const intermediateRef = useRef<HTMLImageElement>(null);
  const originalRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Check cache status for both images
    if (intermediateRef.current && intermediateRef.current.complete) {
      setIntermediateLoaded(true);
    }
    if (originalRef.current && originalRef.current.complete) {
      setOriginalLoaded(true);
    }
  }, []);

  return (
    <>
      <div className="w-full min-h-screen flex flex-col items-center justify-center">
        <div className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden xl:h-auto xl:w-full xl:max-w-[90vw]">
          {/* 
            极致优化方案 (多级渐进式加载):
            Layer 0 (Blur): inline Base64 (~500B, 零延迟)
            Layer 1 (Preview): 37KB 低清图 (快速加载)
            Layer 2 (Intermediate): 500KB~2MB 高清 AVIF/WebP (替换 Preview)
            Layer 3 (Original): 3MB 原图 (最终显示)
          */}
          
          {/* Layer 0: Inline Base64 Blur (零网络延迟) */}
          <img
            src={BLUR_PLACEHOLDER}
            alt=""
            aria-hidden="true"
            className="home-preload-blur absolute left-1/2 top-1/2 w-[100vh] h-[100vw] object-cover max-w-none z-0"
            style={{ filter: 'blur(20px)' }}
          />

          {/* Layer 1: Preview Image (37KB, 快速加载) */}
          <img
            src="/content/Home-preview.jpg"
            alt="Home Preview"
            className="home-preload-preview absolute left-1/2 top-1/2 w-[100vh] h-[100vw] object-cover max-w-none z-[1]"
            style={{ filter: 'blur(8px)' }}
          />

          {/* Layer 2: Intermediate High-Def (AVIF + WebP 兜底) */}
          <picture className="home-preload-intermediate absolute left-1/2 top-1/2 z-10">
            {/* 移动端 AVIF */}
            <source
              media="(max-width: 1279px)"
              srcSet="/content/Home-mobile-high.avif"
              type="image/avif"
            />
            {/* 移动端 WebP 兜底 (Safari 旧版) */}
            <source
              media="(max-width: 1279px)"
              srcSet="/content/Home-mobile-high.webp"
              type="image/webp"
            />
            {/* 桌面端 AVIF */}
            <source
              media="(min-width: 1280px)"
              srcSet="/content/Home-desktop-high.avif"
              type="image/avif"
            />
            {/* 桌面端 WebP 兜底 */}
            <source
              media="(min-width: 1280px)"
              srcSet="/content/Home-desktop-high.webp"
              type="image/webp"
            />
            <img
              ref={intermediateRef}
              src="/content/Home-desktop-high.webp"
              alt="Home Intermediate"
              decoding="async"
              onLoad={() => setIntermediateLoaded(true)}
              className={`w-[100vh] h-[100vw] object-cover max-w-none transition-opacity duration-700 ease-in-out ${
                intermediateLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          </picture>

          {/* Layer 3: Original Master (JPEG) */}
          <img
            ref={originalRef}
            src="/content/Home.jpeg"
            alt="Home - Galaxy Park"
            fetchPriority="high"
            decoding="async"
            onLoad={() => {
              console.log("Original image loaded");
              setOriginalLoaded(true);
            }}
            className={`relative z-20 w-[100vh] h-[100vw] rotate-90 object-cover max-w-none xl:rotate-0 xl:w-full xl:h-auto xl:max-w-full transition-opacity duration-1000 ease-in-out ${
              originalLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </div>

      <div className="hidden xl:block">
        <Footer />
      </div>
    </>
  );
}
