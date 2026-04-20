"use client";

import { Skeleton } from "@heroui/react";
import { useEffect, useMemo, memo, useRef, useState } from "react";
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
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const coverUrl = photo.photoUrls[0];

  useEffect(() => {
    setIsLoaded(false);
  }, [coverUrl]);

  useEffect(() => {
    if (imageRef.current?.complete) {
      setIsLoaded(true);
    }
  }, [coverUrl]);

  // 缓存 href 和 style，避免每次渲染创建新对象
  const href = useMemo(() => `/photo/${slugify(photo.title)}`, [photo.title]);
  const delayStyle = useMemo(
    () => ({ "--delay": `${originalIndex * 100}ms` }) as React.CSSProperties,
    [originalIndex],
  );

  return (
    <div className={styles["animate-in"]} style={delayStyle}>
      <Link
        href={href}
        prefetch={false}
        className="group relative block rounded-2xl overflow-hidden"
      >
        <Skeleton
          className={`absolute inset-0 rounded-2xl ${isLoaded ? "opacity-0" : "opacity-100"}`}
        />

        {coverUrl && (
          <img
            ref={imageRef}
            src={coverUrl}
            alt={photo.title}
            className={`w-full aspect-[3/2] object-cover transition-transform duration-500 group-hover:scale-110 ${isLoaded ? "opacity-100" : "opacity-0"}`}
            loading="lazy"
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            onError={() => setIsLoaded(true)}
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
  const items = useMemo(
    () => photos.map((photo, index) => ({ photo, originalIndex: index })),
    [photos],
  );

  return (
    <div className="grid grid-cols-2 gap-2 p-2 mx-auto md:grid-cols-3 xl:grid-cols-5 xl:gap-4 xl:p-4 max-w-[2400px]">
      {items.map(({ photo, originalIndex }) => (
        <MasonryItem
          key={originalIndex}
          photo={photo}
          originalIndex={originalIndex}
        />
      ))}
    </div>
  );
}
