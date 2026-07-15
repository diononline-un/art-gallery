import { notFound } from "next/navigation";
import data from "@/data/paintings.json";
import { PaintingDetailClient } from "./painting-detail-client";

export function generateStaticParams() {
  return (data.paintings as any[]).map((p) => ({ id: p.id }));
}

export default async function PaintingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const painting = (data.paintings as any[]).find((p) => p.id === id);
  if (!painting) notFound();
  return <PaintingDetailClient initial={painting} />;
}
