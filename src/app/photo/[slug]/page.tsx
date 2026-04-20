import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPhotoList, slugify } from "@/core/photo";
import SequentialPhotoList from "./SequentialPhotoList";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

// 动态元数据
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const photos = await getPhotoList({ mode: "cover" });
  const photo = photos.find((p) => slugify(p.title) === slug);
  if (!photo) return { title: "Galaxy Park" };
  return {
    title: `${photo.title} - Galaxy Park`,
    description: photo.content?.slice(0, 100),
  };
}

export async function generateStaticParams() {
  const photos = await getPhotoList({ mode: "cover" });
  return photos.map((p) => ({ slug: slugify(p.title) }));
}

export default async function PhotoPage({ params }: Props) {
  const { slug } = await params;
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
        <h1 className="mb-2 text-3xl xl:text-3xl">{photo.title}</h1>
        <div className="mb-6 text-sm ">{photo.date}</div>
        <p className="leading-relaxed whitespace-pre-line">{photo.content}</p>
      </div>

      <SequentialPhotoList
        title={photo.title}
        photoUrls={photo.photoUrls}
        photoAspectRatios={photo.photoAspectRatios}
      />
    </div>
  );
}
