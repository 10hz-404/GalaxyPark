import fg from "fast-glob";
import fs from "fs-extra";

const IsPro = process.env.NODE_ENV === "production";
const IsDev = process.env.NODE_ENV === "development";

async function getPhotoFiles() {
  const files = await fg("content/photos/*.txt");

  return files.filter((it) => {
    if (!IsPro) return true;
    return !it.endsWith(".dev.txt");
  });
}

let __PHOTOS: Photo[];
export async function getPhotoList() {
  if (!IsDev && __PHOTOS) return __PHOTOS;

  const files = await getPhotoFiles();

  const photos: Photo[] = await Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(file, "utf-8");
      // 简单解析格式
      const title = /\[title\]\s*\n"([^"]+)"/m.exec(raw)?.[1] ?? "";
      const date = /\[date\]\s*\n"([^"]+)"/m.exec(raw)?.[1] ?? "";
      const content = /\[content\]\s*\n([\s\S]*)/m.exec(raw)?.[1]?.trim() ?? "";
      let photoUrls: string[] = [];
      const photosBlock = /\[photos\][^\[]*/
        .exec(raw)?.[0]
        ?.replace(/^\[photos\]\s*/, "");
      if (photosBlock) {
        photoUrls = photosBlock
          .split(/\r?\n/)
          .map((line: string) => line.replace(/^[",\s]+|[",\s]+$/g, ""))
          .filter((line: string) => !!line);
      }
      return { title, date, content, photoUrls };
    })
  );

  __PHOTOS = photos.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return __PHOTOS;
}

export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}
