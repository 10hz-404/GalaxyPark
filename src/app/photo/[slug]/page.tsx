import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPhotoList, slugify } from "@/core/photo";
import Image from "next/image";

interface Props {
  params: { slug: string };
}

// 动态元数据
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const photos = await getPhotoList();
  const photo = photos.find((p) => slugify(p.title) === slug);
  if (!photo) return { title: "Galaxy Park" };
  return {
    title: `${photo.title} - Galaxy Park`,
    description: photo.content?.slice(0, 100),
  };
}

export async function generateStaticParams() {
  const photos = await getPhotoList();
  return photos.map((p) => ({ slug: slugify(p.title) }));
}

export default async function PhotoPage({ params }: Props) {
  const { slug } = params;
  const photos = await getPhotoList();
  const photo = photos.find((p) => slugify(p.title) === slug);
  if (!photo) return notFound();
  return (
    <div className="flex flex-col xl:flex-row">
      {/* 左侧浮动文字区 */}
      <div
        lang="zh-CN"
        className="flex flex-col w-full xl:w-1/3 pr-0 xl:pr-5 mb-8 xl:mb-0 xl:sticky xl:top-[100px] xl:h-[calc(100vh-140px)]"
      >
        <h1 className="mb-2 text-2xl leading-tight">{photo.title}</h1>
        <div className="mb-4 text-sm text-gray-500">{photo.date}</div>
        <p className="leading-relaxed whitespace-pre-line">{photo.content}</p>
      </div>

      {/* 右侧滚动内容区 */}
      <div className="w-full space-y-6 xl:w-2/3">
        {photo.photoUrls.map((url: string, idx: number) => (
          <img
            key={idx}
            src={url}
            alt={photo.title + "-" + (idx + 1)}
            className="object-cover w-full shadow-lg"
          />
        ))}
      </div>
    </div>
  );
}
