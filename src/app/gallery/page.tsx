import { getPhotoList } from "@/core/photo";
import MasonryGrid from "./MasonryGrid";

export default async function Gallery() {
  const photos = await getPhotoList();
  
  return <MasonryGrid photos={photos} />;
}
