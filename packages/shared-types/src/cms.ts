import { DiscountType } from "@prisma/client";

export interface WebsitePageDTO {
  id: string;
  slug: string;
  title: string;
  metaTitle: string | null;
  metaDescription: string | null;
  content: Record<string, unknown> | null;
  isPublished: boolean;
  publishedAt: string | null;
  sections?: WebsiteSectionDTO[];
}

export interface WebsiteSectionDTO {
  id: string;
  pageId: string;
  sectionKey: string;
  title: string | null;
  subtitle: string | null;
  content: Record<string, unknown> | null;
  sortOrder: number;
  isVisible: boolean;
}

export interface MediaAssetDTO {
  id: string;
  title: string | null;
  storagePath: string;
  fileType: string;
  fileSizeBytes: number | null;
  altText: string | null;
  category: string;
  isVerified: boolean;
}

export interface OfferDTO {
  id: string;
  title: string;
  code: string | null;
  description: string | null;
  discountType: DiscountType;
  discountValue: number;
  minBookingAmount: number | null;
  validFrom: string;
  validTo: string;
  isActive: boolean;
  bannerImagePath: string | null;
}
