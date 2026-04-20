import fg from "fast-glob";
import fs from "fs-extra";
import path from "path";
import sharp from "sharp";

const IsPro = process.env.NODE_ENV === "production";
const IsDev = process.env.NODE_ENV === "development";

type PhotoListMode = "full" | "cover";

interface GetPhotoListOptions {
  mode?: PhotoListMode;
}

const __PHOTO_ASPECT_CACHE = new Map<string, number | undefined>();

async function getPhotoAspectRatio(
  photoUrl: string,
): Promise<number | undefined> {
  if (__PHOTO_ASPECT_CACHE.has(photoUrl)) {
    return __PHOTO_ASPECT_CACHE.get(photoUrl);
  }

  const normalizedPath = photoUrl.replace(/^\/+/, "");
  const absolutePath = path.join(process.cwd(), "public", normalizedPath);

  if (!(await fs.pathExists(absolutePath))) {
    __PHOTO_ASPECT_CACHE.set(photoUrl, undefined);
    return undefined;
  }

  try {
    const meta = await sharp(absolutePath).metadata();

    if (!meta.width || !meta.height || meta.height <= 0) {
      __PHOTO_ASPECT_CACHE.set(photoUrl, undefined);
      return undefined;
    }

    const ratio = Number((meta.width / meta.height).toFixed(4));
    __PHOTO_ASPECT_CACHE.set(photoUrl, ratio);
    return ratio;
  } catch {
    __PHOTO_ASPECT_CACHE.set(photoUrl, undefined);
    return undefined;
  }
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

      const photoAspectRatios = await Promise.all(
        photoUrls.map((url) => getPhotoAspectRatio(url)),
      );

      return {
        title,
        date,
        content,
        photoUrls,
        coverAspectRatio: photoAspectRatios[0],
        photoAspectRatios,
      };
    }),
  );

  const sortedPhotos = photos.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const coverPhotos = sortedPhotos.map((photo) => ({
    ...photo,
    photoUrls: photo.photoUrls.slice(0, 1),
    photoAspectRatios: photo.photoAspectRatios?.slice(0, 1),
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
