import { getPhotoList } from "@/core/photo";
import MasonryGrid from "./MasonryGrid";

export default async function Gallery() {
  const photos = await getPhotoList({ mode: "cover" });

  return <MasonryGrid photos={photos} />;
}
