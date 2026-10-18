export interface GalleryItem {
  id: string;
  title: string;
  alt: string;
  category?: string;
  order: number;
  image: string;
  width: number;
  height: number;
  videoUrl?: string;
}
