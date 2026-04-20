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
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    setVisibleCount(0);

    const preloadByOrder = (index: number) => {
      if (cancelled) return;
      if (index >= photoUrls.length) return;

      const loader = new Image();

      const finishCurrent = () => {
        if (cancelled) return;
        setVisibleCount(index + 1);
        preloadByOrder(index + 1);
      };

      loader.onload = finishCurrent;
      loader.onerror = finishCurrent;
      loader.decoding = "async";
      loader.src = photoUrls[index];
    };

    preloadByOrder(0);

    return () => {
      cancelled = true;
    };
  }, [photoUrls]);

  return (
    <div className="w-full space-y-4 xl:w-2/3">
      {photoUrls.map((url, idx) => {
        const loaded = idx < visibleCount;
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
