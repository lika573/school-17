import "server-only";
import { access, mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import type { GalleryItem, NewsItem, Teacher } from "@/types";
import { getAdminClient } from "@/lib/supabase";

const CMS_DIR = path.join(process.cwd(), "data", "cms");

type NewsRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  image: string;
  image_alt: string;
};

type TeacherRow = {
  id: string;
  name: string;
  subject: string;
  role: string | null;
  image: string;
  image_alt: string;
  sort_order?: number;
};

type GalleryRow = {
  id: string;
  title: string;
  category: string;
  image: string;
  image_alt: string;
  sort_order?: number;
};

function isMissingTable(error: { code?: string; message?: string } | null): boolean {
  return (
    error?.code === "PGRST205" ||
    Boolean(error?.message?.includes("Could not find the table"))
  );
}

async function ensureFile(filename: string): Promise<string> {
  const cmsPath = path.join(CMS_DIR, filename);
  try {
    await access(cmsPath);
  } catch {
    await mkdir(CMS_DIR, { recursive: true });
    const defaults = await readFile(
      path.join(process.cwd(), "src", "data", filename),
      "utf8",
    );
    await writeFile(cmsPath, defaults, "utf8");
  }
  return cmsPath;
}

async function readFileCms<T>(filename: string): Promise<T> {
  const filePath = await ensureFile(filename);
  return JSON.parse(await readFile(filePath, "utf8")) as T;
}

async function writeFileCms<T>(filename: string, data: T): Promise<void> {
  await mkdir(CMS_DIR, { recursive: true });
  await writeFile(
    path.join(CMS_DIR, filename),
    JSON.stringify(data, null, 2),
    "utf8",
  );
}

function mapNews(row: NewsRow): NewsItem {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    category: row.category as NewsItem["category"],
    date: row.date,
    image: row.image,
    imageAlt: row.image_alt,
  };
}

function mapTeacher(row: TeacherRow): Teacher {
  return {
    id: row.id,
    name: row.name,
    subject: row.subject,
    role: row.role || undefined,
    image: row.image,
    imageAlt: row.image_alt,
  };
}

function mapGallery(row: GalleryRow): GalleryItem {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    image: row.image,
    imageAlt: row.image_alt,
  };
}

function teacherToRow(item: Teacher, sortOrder = 0): TeacherRow {
  return {
    id: item.id,
    name: item.name,
    subject: item.subject,
    role: item.role || null,
    image: item.image,
    image_alt: item.imageAlt,
    sort_order: sortOrder,
  };
}

function newsToRow(item: NewsItem): NewsRow {
  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    content: item.content,
    category: item.category,
    date: item.date,
    image: item.image,
    image_alt: item.imageAlt,
  };
}

function galleryToRow(item: GalleryItem, sortOrder = 0): GalleryRow {
  return {
    id: item.id,
    title: item.title,
    category: item.category,
    image: item.image,
    image_alt: item.imageAlt,
    sort_order: sortOrder,
  };
}

function revalidateCmsPaths(
  kind: "news" | "teachers" | "gallery",
  news?: NewsItem[],
) {
  revalidatePath("/");
  if (kind === "news") {
    revalidatePath("/news");
    if (news) {
      for (const item of news) {
        revalidatePath(`/news/${item.slug}`);
      }
    }
  }
  if (kind === "teachers") revalidatePath("/teachers");
  if (kind === "gallery") revalidatePath("/gallery");
}

export async function getNewsItems(): Promise<NewsItem[]> {
  try {
    const supabase = getAdminClient();
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      if (isMissingTable(error)) return readFileCms<NewsItem[]>("news.json");
      throw new Error(`news fetch failed: ${error.message}`);
    }
    return (data as NewsRow[]).map(mapNews);
  } catch {
    return readFileCms<NewsItem[]>("news.json");
  }
}

export async function upsertNewsItem(item: NewsItem): Promise<NewsItem> {
  try {
    const supabase = getAdminClient();
    const { data, error } = await supabase
      .from("news")
      .upsert({
        ...newsToRow(item),
        updated_at: new Date().toISOString(),
      })
      .select("*")
      .single();

    if (error) {
      if (!isMissingTable(error)) {
        throw new Error(`news upsert failed: ${error.message}`);
      }
    } else {
      revalidateCmsPaths("news", [item]);
      return mapNews(data as NewsRow);
    }
  } catch (e) {
    if (e instanceof Error && e.message.startsWith("news upsert failed")) {
      throw e;
    }
  }

  const items = await readFileCms<NewsItem[]>("news.json");
  const index = items.findIndex((n) => n.id === item.id);
  if (index === -1) items.unshift(item);
  else items[index] = item;
  await writeFileCms("news.json", items);
  revalidateCmsPaths("news", items);
  return item;
}

export async function deleteNewsItem(id: string): Promise<void> {
  try {
    const supabase = getAdminClient();
    const { error } = await supabase.from("news").delete().eq("id", id);
    if (error && !isMissingTable(error)) {
      throw new Error(`news delete failed: ${error.message}`);
    }
    if (!error) {
      revalidateCmsPaths("news");
      return;
    }
  } catch (e) {
    if (e instanceof Error && e.message.startsWith("news delete failed")) {
      throw e;
    }
  }

  const items = (await readFileCms<NewsItem[]>("news.json")).filter(
    (n) => n.id !== id,
  );
  await writeFileCms("news.json", items);
  revalidateCmsPaths("news", items);
}

export async function saveNewsItems(items: NewsItem[]): Promise<void> {
  for (const item of items) {
    await upsertNewsItem(item);
  }
  const current = await getNewsItems();
  const keep = new Set(items.map((i) => i.id));
  for (const item of current) {
    if (!keep.has(item.id)) await deleteNewsItem(item.id);
  }
}

export async function getTeachersItems(): Promise<Teacher[]> {
  try {
    const supabase = getAdminClient();
    const { data, error } = await supabase
      .from("teachers")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true });

    if (error) {
      if (isMissingTable(error)) return readFileCms<Teacher[]>("teachers.json");
      throw new Error(`teachers fetch failed: ${error.message}`);
    }
    return (data as TeacherRow[]).map(mapTeacher);
  } catch {
    return readFileCms<Teacher[]>("teachers.json");
  }
}

export async function upsertTeacherItem(
  item: Teacher,
  sortOrder = 0,
): Promise<Teacher> {
  try {
    const supabase = getAdminClient();
    const { data, error } = await supabase
      .from("teachers")
      .upsert({
        ...teacherToRow(item, sortOrder),
        updated_at: new Date().toISOString(),
      })
      .select("*")
      .single();

    if (error) {
      if (!isMissingTable(error)) {
        throw new Error(`teacher upsert failed: ${error.message}`);
      }
    } else {
      revalidateCmsPaths("teachers");
      return mapTeacher(data as TeacherRow);
    }
  } catch (e) {
    if (e instanceof Error && e.message.startsWith("teacher upsert failed")) {
      throw e;
    }
  }

  const items = await readFileCms<Teacher[]>("teachers.json");
  const index = items.findIndex((t) => t.id === item.id);
  if (index === -1) items.push(item);
  else items[index] = item;
  await writeFileCms("teachers.json", items);
  revalidateCmsPaths("teachers");
  return item;
}

export async function deleteTeacherItem(id: string): Promise<void> {
  try {
    const supabase = getAdminClient();
    const { error } = await supabase.from("teachers").delete().eq("id", id);
    if (error && !isMissingTable(error)) {
      throw new Error(`teacher delete failed: ${error.message}`);
    }
    if (!error) {
      revalidateCmsPaths("teachers");
      return;
    }
  } catch (e) {
    if (e instanceof Error && e.message.startsWith("teacher delete failed")) {
      throw e;
    }
  }

  const items = (await readFileCms<Teacher[]>("teachers.json")).filter(
    (t) => t.id !== id,
  );
  await writeFileCms("teachers.json", items);
  revalidateCmsPaths("teachers");
}

export async function saveTeachersItems(items: Teacher[]): Promise<void> {
  for (let i = 0; i < items.length; i++) {
    await upsertTeacherItem(items[i], i);
  }
  const current = await getTeachersItems();
  const keep = new Set(items.map((i) => i.id));
  for (const item of current) {
    if (!keep.has(item.id)) await deleteTeacherItem(item.id);
  }
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    const supabase = getAdminClient();
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      if (isMissingTable(error)) return readFileCms<GalleryItem[]>("gallery.json");
      throw new Error(`gallery fetch failed: ${error.message}`);
    }
    return (data as GalleryRow[]).map(mapGallery);
  } catch {
    return readFileCms<GalleryItem[]>("gallery.json");
  }
}

export async function upsertGalleryItem(
  item: GalleryItem,
  sortOrder = 0,
): Promise<GalleryItem> {
  try {
    const supabase = getAdminClient();
    const { data, error } = await supabase
      .from("gallery")
      .upsert({
        ...galleryToRow(item, sortOrder),
        updated_at: new Date().toISOString(),
      })
      .select("*")
      .single();

    if (error) {
      if (!isMissingTable(error)) {
        throw new Error(`gallery upsert failed: ${error.message}`);
      }
    } else {
      revalidateCmsPaths("gallery");
      return mapGallery(data as GalleryRow);
    }
  } catch (e) {
    if (e instanceof Error && e.message.startsWith("gallery upsert failed")) {
      throw e;
    }
  }

  const items = await readFileCms<GalleryItem[]>("gallery.json");
  const index = items.findIndex((g) => g.id === item.id);
  if (index === -1) items.push(item);
  else items[index] = item;
  await writeFileCms("gallery.json", items);
  revalidateCmsPaths("gallery");
  return item;
}

export async function saveGalleryItems(items: GalleryItem[]): Promise<void> {
  for (let i = 0; i < items.length; i++) {
    await upsertGalleryItem(items[i], i);
  }
}

export async function deleteGalleryItem(id: string): Promise<void> {
  try {
    const supabase = getAdminClient();
    const { error } = await supabase.from("gallery").delete().eq("id", id);
    if (error && !isMissingTable(error)) {
      throw new Error(`gallery delete failed: ${error.message}`);
    }
    if (!error) {
      revalidateCmsPaths("gallery");
      return;
    }
  } catch (e) {
    if (e instanceof Error && e.message.startsWith("gallery delete failed")) {
      throw e;
    }
  }

  const items = (await readFileCms<GalleryItem[]>("gallery.json")).filter(
    (g) => g.id !== id,
  );
  await writeFileCms("gallery.json", items);
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
