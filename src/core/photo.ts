import fg from "fast-glob";
import fs from "fs-extra";

const IsPro = process.env.NODE_ENV === "production";
const IsDev = process.env.NODE_ENV === "development";

type PhotoListMode = "full" | "cover";

interface GetPhotoListOptions {
  mode?: PhotoListMode;
}

async function getPhotoFiles() {
  const files = await fg("content/photos/*.txt");

  return files.filter((it) => {
    if (!IsPro) return true;
    return !it.endsWith(".dev.txt");
  });
}

let __PHOTOS_FULL: Photo[];
let __PHOTOS_COVER: Photo[];

export async function getPhotoList(options?: GetPhotoListOptions) {
  const mode = options?.mode ?? "full";

  if (!IsDev) {
    if (mode === "full" && __PHOTOS_FULL) return __PHOTOS_FULL;
    if (mode === "cover" && __PHOTOS_COVER) return __PHOTOS_COVER;
  }

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
    }),
  );

  const sortedPhotos = photos.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const coverPhotos = sortedPhotos.map((photo) => ({
    ...photo,
    photoUrls: photo.photoUrls.slice(0, 1),
  }));

  __PHOTOS_FULL = sortedPhotos;
  __PHOTOS_COVER = coverPhotos;

  return mode === "cover" ? __PHOTOS_COVER : __PHOTOS_FULL;
}

export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}
