import { GalleryClient } from "./gallery-client";
import data from "@/data/paintings.json";

export default function GalleryPage() {
  return <GalleryClient initialPaintings={data.paintings as any} />;
}
