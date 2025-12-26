import Link from "next/link";
import { getPhotoList, slugify } from "@/core/photo";

export default async function Gallery() {
  const photos = await getPhotoList();
  return (
    <ul className="space-y-6">
      {photos.map((photo, idx) => (
        <li key={idx} className="pb-4">
          <Link href={`/photo/${slugify(photo.title)}`} className="block">
            <div className="flex items-center gap-4">
              <div className="flex-1 w-1/3">
                <div className="text-4xl font-bold transition-colors">
                  {photo.title}
                </div>
                <div className="mb-1 text-sm">{photo.date}</div>
              </div>
              <div className="flex justify-end w-2/3 flex-2 group/image-parent">
                <div className="relative w-full aspect-[4/3] flex items-center justify-center overflow-hidden group">
                  {photo.photoUrls[0] && (
                    <img
                      src={photo.photoUrls[0]}
                      alt={photo.title}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                </div>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
