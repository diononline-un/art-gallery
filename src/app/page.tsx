import { HomeClient } from "./home-client";
import data from "@/data/paintings.json";

export default function HomePage() {
  const { paintings, drops } = data as any;

  const published = drops.filter((d: any) => d.isPublished);
  published.sort((a: any, b: any) => +new Date(b.publishAt) - +new Date(a.publishAt));

  const upcoming = drops.filter((d: any) => !d.isPublished);
  upcoming.sort((a: any, b: any) => +new Date(a.publishAt) - +new Date(b.publishAt));

  return (
    <HomeClient
      initialPaintings={paintings}
      initialLatestDrop={published[0] ?? null}
      initialNextDrop={upcoming[0] ?? null}
    />
  );
}
