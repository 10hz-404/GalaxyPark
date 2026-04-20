"use client";

import { Skeleton } from "@heroui/react";
import { useEffect, useState } from "react";

interface SequentialPhotoListProps {
  title: string;
  photoUrls: string[];
  photoAspectRatios?: Array<number | undefined>;
}

export default function SequentialPhotoList({
  title,
  photoUrls,
  photoAspectRatios,
}: SequentialPhotoListProps) {
  const [loadedStates, setLoadedStates] = useState<boolean[]>([]);

  useEffect(() => {
    let cancelled = false;

    setLoadedStates(Array(photoUrls.length).fill(false));

    // 并行预加载：每张图加载完成后单独更新可见状态
    photoUrls.forEach((url, index) => {
      const loader = new Image();

      const markLoaded = () => {
        if (cancelled) return;
        setLoadedStates((prev) => {
          if (prev[index]) return prev;
          const next = [...prev];
          next[index] = true;
          return next;
        });
      };

      loader.onload = markLoaded;
      loader.onerror = markLoaded;
      loader.decoding = "async";
      loader.src = url;
    });

    return () => {
      cancelled = true;
    };
  }, [photoUrls]);

  return (
    <div className="w-full space-y-4 xl:w-2/3">
      {photoUrls.map((url, idx) => {
        const loaded = loadedStates[idx] ?? false;
        const aspectRatio = photoAspectRatios?.[idx] ?? 1.5;

        const commonWrapperStyle: React.CSSProperties = {
          aspectRatio: String(aspectRatio),
        };

        if (loaded) {
          return (
            <img
              key={`${url}-${idx}`}
              src={url}
              alt={`${title}-${idx + 1}`}
              className="object-cover w-full shadow-lg"
              style={commonWrapperStyle}
              loading={idx === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          );
        }

        return (
          <div
            key={`${url}-${idx}`}
            className="w-full shadow-lg"
            style={commonWrapperStyle}
          >
            <Skeleton className="h-full w-full" />
          </div>
        );
      })}
    </div>
  );
}
