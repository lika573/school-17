import "server-only";
import type { GalleryItem, NewsItem, Teacher } from "@/types";
import {
  getGalleryItems,
  getNewsItems,
  getTeachersItems,
} from "@/lib/cms";

export async function getNews(): Promise<NewsItem[]> {
  return getNewsItems();
}

export async function getTeachers(): Promise<Teacher[]> {
  return getTeachersItems();
}

export async function getGallery(): Promise<GalleryItem[]> {
  return getGalleryItems();
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | undefined> {
  const news = await getNewsItems();
  return news.find((item) => item.slug === slug);
}

export async function getLatestNews(count = 3): Promise<NewsItem[]> {
  const news = await getNewsItems();
  return [...news]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}

export async function getUniqueSubjects(): Promise<string[]> {
  const teachers = await getTeachersItems();
  return ["ყველა", ...new Set(teachers.map((t) => t.subject))];
}

export async function getGalleryCategories(): Promise<string[]> {
  const gallery = await getGalleryItems();
  return ["ყველა", ...new Set(gallery.map((item) => item.category))];
}
