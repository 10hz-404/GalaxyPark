import Link from "next/link";
import { getPhotoList, slugify } from "@/core/photo";

export default async function Gallery() {
  const photos = await getPhotoList();
  return (
    <ul className="space-y-6">
      {photos.map((photo, idx) => (
        <li key={idx} className="border-b pb-4">
          <Link href={`/photo/${slugify(photo.title)}`} className="block group">
            <div className="flex items-center gap-4">
              {photo.photoUrls[0] && (
                <img
                  src={photo.photoUrls[0]}
                  alt={photo.title}
                  className="w-24 h-24 object-cover rounded shadow-md group-hover:scale-105 transition-transform"
                />
              )}
              <div>
                <div className="text-lg font-bold group-hover:text-blue-600 transition-colors">
                  {photo.title}
                </div>
                <div className="text-sm text-gray-500 mb-1">{photo.date}</div>
                <div className="text-sm text-gray-700 line-clamp-2">
                  {photo.content?.slice(0, 40)}
                </div>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
