"use client";

import { useEffect, useState } from "react";
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

export default function MasonryGrid({ photos }: MasonryGridProps) {
  // 默认两列 (移动端优先)
  const [columns, setColumns] = useState(2);

  useEffect(() => {
    const updateColumns = () => {
      // 匹配 tailwind 断点: md: 768px, xl: 1280px
      if (window.innerWidth >= 1280) {
        setColumns(5);
      } else if (window.innerWidth >= 768) {
        setColumns(3);
      } else {
        setColumns(2);
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  // 将图片分配到各列
  // 这里保存原始索引以便计算动画延迟
  const columnWrappers: { photo: Photo; originalIndex: number }[][] = Array.from(
    { length: columns },
    () => []
  );

  photos.forEach((photo, index) => {
    columnWrappers[index % columns].push({ photo, originalIndex: index });
  });

  return (
    <div className="flex gap-2 xl:gap-4 p-2 xl:p-4 mx-auto max-w-[2400px] items-start">
      {columnWrappers.map((col, colIndex) => (
        <div key={colIndex} className="flex flex-col gap-2 xl:gap-4 flex-1 min-w-0">
          {col.map(({ photo, originalIndex }) => (
            <div
              key={originalIndex}
              className={styles["animate-in"]}
              style={{ animationDelay: `${originalIndex * 100}ms` }}
            >
              <Link
                href={`/photo/${slugify(photo.title)}`}
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
          ))}
        </div>
      ))}
    </div>
  );
}
