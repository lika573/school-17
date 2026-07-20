import { access, mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import type { GalleryItem, NewsItem, Teacher } from "@/types";

const CMS_DIR = path.join(process.cwd(), "data", "cms");

const CMS_FILES = {
  news: { cms: "news.json", default: "news.json" },
  teachers: { cms: "teachers.json", default: "teachers.json" },
  gallery: { cms: "gallery.json", default: "gallery.json" },
} as const;

async function ensureCmsFile(key: keyof typeof CMS_FILES): Promise<string> {
  const { cms, default: defaultFile } = CMS_FILES[key];
  const cmsPath = path.join(CMS_DIR, cms);

  try {
    await access(cmsPath);
  } catch {
    await mkdir(CMS_DIR, { recursive: true });
    const defaultPath = path.join(process.cwd(), "src", "data", defaultFile);
    const defaultData = await readFile(defaultPath, "utf8");
    await writeFile(cmsPath, defaultData, "utf8");
  }

  return cmsPath;
}

async function readCmsFile<T>(key: keyof typeof CMS_FILES): Promise<T> {
  const filePath = await ensureCmsFile(key);
  const raw = await readFile(filePath, "utf8");
  return JSON.parse(raw) as T;
}

async function writeCmsFile<T>(
  key: keyof typeof CMS_FILES,
  data: T,
): Promise<void> {
  await mkdir(CMS_DIR, { recursive: true });
  const filePath = path.join(CMS_DIR, CMS_FILES[key].cms);
  await writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
}

function revalidateCmsPaths(key: keyof typeof CMS_FILES, news?: NewsItem[]) {
  revalidatePath("/");
  if (key === "news") {
    revalidatePath("/news");
    if (news) {
      for (const item of news) {
        revalidatePath(`/news/${item.slug}`);
      }
    }
  }
  if (key === "teachers") revalidatePath("/teachers");
  if (key === "gallery") revalidatePath("/gallery");
}

export async function getNewsItems(): Promise<NewsItem[]> {
  return readCmsFile<NewsItem[]>("news");
}

export async function saveNewsItems(items: NewsItem[]): Promise<void> {
  await writeCmsFile("news", items);
  revalidateCmsPaths("news", items);
}

export async function getTeachersItems(): Promise<Teacher[]> {
  return readCmsFile<Teacher[]>("teachers");
}

export async function saveTeachersItems(items: Teacher[]): Promise<void> {
  await writeCmsFile("teachers", items);
  revalidateCmsPaths("teachers");
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  return readCmsFile<GalleryItem[]>("gallery");
}

export async function saveGalleryItems(items: GalleryItem[]): Promise<void> {
  await writeCmsFile("gallery", items);
  revalidateCmsPaths("gallery");
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\u10A0-\u10FF\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}
