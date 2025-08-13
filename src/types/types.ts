export interface CardData {
  id?: string;
  title?: string;
  desc?: string;
  descNepali?: string | null;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
  published?: string;
  author?: string;
  authorNepali?: string;
  image?: string;
  images?: ImageType[];
}

export interface ImageType {
  id: string;
  url: string;
  caption?: string | null;
  altText?: string | null;
  displayOrder?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  desc: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  images: ImageType[];
}