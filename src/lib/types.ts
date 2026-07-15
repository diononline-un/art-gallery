export type Painting = {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string;
  thumbnailUrl: string | null;
  priceEur: number;
  status: "available" | "sold" | "reserved";
  dropId: string | null;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type Drop = {
  id: string;
  title: string;
  publishAt: string;
  isPublished: boolean;
  createdAt: string;
};

export type GalleryData = {
  paintings: Painting[];
  drops: Drop[];
};
