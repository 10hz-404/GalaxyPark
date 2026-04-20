"use client";

import { useEffect, useState } from "react";

interface SequentialPhotoListProps {
  title: string;
  photoUrls: string[];
}

export default function SequentialPhotoList({
  title,
  photoUrls,
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

  const visiblePhotos = photoUrls.slice(0, visibleCount);

  return (
    <div className="w-full space-y-4 xl:w-2/3">
      {visiblePhotos.map((url, idx) => (
        <img
          key={`${url}-${idx}`}
          src={url}
          alt={`${title}-${idx + 1}`}
          className="object-cover w-full shadow-lg"
          loading={idx === 0 ? "eager" : "lazy"}
          decoding="async"
        />
      ))}
    </div>
  );
}
