"use client";

import { useEffect, useState, useMemo, memo } from "react";
import Link from "next/link";
import styles from "./gallery.module.css";

// 内联 slugify 以避免客户端组件导入服务端特定的 core 模块
function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

interface MasonryGridProps {
  photos: Photo[];
}

// 拆分子组件 + React.memo，避免父组件更新时所有子项重新渲染
const MasonryItem = memo(function MasonryItem({
  photo,
  originalIndex,
}: {
  photo: Photo;
  originalIndex: number;
}) {
  // 缓存 href 和 style，避免每次渲染创建新对象
  const href = useMemo(() => `/photo/${slugify(photo.title)}`, [photo.title]);
  const delayStyle = useMemo(
    () => ({ "--delay": `${originalIndex * 100}ms` }) as React.CSSProperties,
    [originalIndex]
  );

  return (
    <div className={styles["animate-in"]} style={delayStyle}>
      <Link
        href={href}
        className="group relative block rounded-2xl overflow-hidden"
      >
        {photo.photoUrls[0] && (
          <img
            src={photo.photoUrls[0]}
            alt={photo.title}
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
          <h3 className="text-white font-bold text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            {photo.title}
          </h3>
          <p className="text-white/80 text-sm mt-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
            {photo.date}
          </p>
        </div>
      </Link>
    </div>
  );
});

export default function MasonryGrid({ photos }: MasonryGridProps) {
  // 初始设为 0，等 window.innerWidth 确认后再渲染，避免布局闪烁
  const [columns, setColumns] = useState(0);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const updateColumns = () => {
      // 防抖：100ms 内多次 resize 只执行一次
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        // 匹配 tailwind 断点: md: 768px, xl: 1280px
        if (window.innerWidth >= 1280) {
          setColumns(5);
        } else if (window.innerWidth >= 768) {
          setColumns(3);
        } else {
          setColumns(2);
        }
      }, 100);
    };

    // 首次立即执行，不需要防抖
    if (window.innerWidth >= 1280) {
      setColumns(5);
    } else if (window.innerWidth >= 768) {
      setColumns(3);
    } else {
      setColumns(2);
    }

    window.addEventListener("resize", updateColumns);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", updateColumns);
    };
  }, []);

  // 使用 useMemo 缓存列分配计算，只在 photos 或 columns 变化时重新计算
  // 必须放在条件判断之前，确保 Hooks 调用顺序稳定
  // columns=0 时使用默认 2 列计算布局，确保图片可以预加载
  const columnWrappers = useMemo(() => {
    const effectiveColumns = columns === 0 ? 2 : columns;
    const wrappers: { photo: Photo; originalIndex: number }[][] = Array.from(
      { length: effectiveColumns },
      () => []
    );
    photos.forEach((photo, index) => {
      wrappers[index % effectiveColumns].push({ photo, originalIndex: index });
    });
    return wrappers;
  }, [photos, columns]);

  // 列数未确定时隐藏但仍渲染（图片会预加载），确定后显示
  const isReady = columns > 0;

  return (
    <div
      className="flex gap-2 xl:gap-4 p-2 xl:p-4 mx-auto max-w-[2400px] items-start transition-opacity duration-300"
      style={{
        opacity: isReady ? 1 : 0,
        pointerEvents: isReady ? "auto" : "none",
      }}
    >
      {columnWrappers.map((col, colIndex) => (
        <div
          key={colIndex}
          className="flex flex-col gap-2 xl:gap-4 flex-1 min-w-0"
        >
          {col.map(({ photo, originalIndex }) => (
            <MasonryItem
              key={originalIndex}
              photo={photo}
              originalIndex={originalIndex}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
