// VISURA OS - Shared Types
// أنماط مشتركة بين معرض التصوير ومعرض الرسم الفني

export interface BaseArtwork {
  id: string;
  title: string;
  price: number;
  encrypted: boolean;
  artist: string;
  image: string;
  year: number;
  views?: number;
  likes?: number;
}

export interface Photo extends BaseArtwork {
  category: string;
  resolution: string;
}

export interface Artwork extends BaseArtwork {
  style: string;
  medium: string;
  dimensions: string;
  investmentScore?: number;
  priceGrowth?: number;
}

export interface GalleryItemProps {
  item: Photo | Artwork;
  onBuy: (item: any) => void;
  onView: (item: any) => void;
}

export type SortOption = "newest" | "price" | "views" | "investment" | "growth";
