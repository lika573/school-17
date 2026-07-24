import "server-only";
import { readFile } from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import type { GalleryItem, NewsItem, Teacher } from "@/types";
import { getAdminClient } from "@/lib/supabase";

async function readDefaultJson<T>(filename: string): Promise<T> {
  const raw = await readFile(
    path.join(process.cwd(), "src", "data", filename),
    "utf8",
  );
  return JSON.parse(raw) as T;
}

function isMissingTable(error: { code?: string; message?: string } | null): boolean {
  return error?.code === "PGRST205" || Boolean(error?.message?.includes("Could not find the table"));
}

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
};

type GalleryRow = {
  id: string;
  title: string;
  category: string;
  image: string;
  image_alt: string;
};

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

function revalidateCmsPaths(kind: "news" | "teachers" | "gallery", news?: NewsItem[]) {
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
      if (isMissingTable(error)) {
        return readDefaultJson<NewsItem[]>("news.json");
      }
      throw new Error(`news fetch failed: ${error.message}`);
    }
    return (data as NewsRow[]).map(mapNews);
  } catch (e) {
    if (e instanceof Error && e.message.includes("SUPABASE")) {
      return readDefaultJson<NewsItem[]>("news.json");
    }
    throw e;
  }
}

export async function saveNewsItems(items: NewsItem[]): Promise<void> {
  const supabase = getAdminClient();
  const rows = items.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    content: item.content,
    category: item.category,
    date: item.date,
    image: item.image,
    image_alt: item.imageAlt,
    updated_at: new Date().toISOString(),
  }));

  const { error: upsertError } = await supabase.from("news").upsert(rows);
  if (upsertError) throw new Error(`news upsert failed: ${upsertError.message}`);

  const ids = items.map((i) => i.id);
  const { data: existing, error: listError } = await supabase.from("news").select("id");
  if (listError) throw new Error(`news list failed: ${listError.message}`);

  const toDelete = (existing || [])
    .map((r: { id: string }) => r.id)
    .filter((id: string) => !ids.includes(id));

  if (toDelete.length > 0) {
    const { error: deleteError } = await supabase.from("news").delete().in("id", toDelete);
    if (deleteError) throw new Error(`news delete failed: ${deleteError.message}`);
  }

  revalidateCmsPaths("news", items);
}

export async function upsertNewsItem(item: NewsItem): Promise<NewsItem> {
  const supabase = getAdminClient();
  const { data, error } = await supabase
    .from("news")
    .upsert({
      id: item.id,
      slug: item.slug,
      title: item.title,
      excerpt: item.excerpt,
      content: item.content,
      category: item.category,
      date: item.date,
      image: item.image,
      image_alt: item.imageAlt,
      updated_at: new Date().toISOString(),
    })
    .select("*")
    .single();

  if (error) throw new Error(`news upsert failed: ${error.message}`);
  revalidateCmsPaths("news", [item]);
  return mapNews(data as NewsRow);
}

export async function deleteNewsItem(id: string): Promise<void> {
  const supabase = getAdminClient();
  const { error } = await supabase.from("news").delete().eq("id", id);
  if (error) throw new Error(`news delete failed: ${error.message}`);
  revalidateCmsPaths("news");
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
      if (isMissingTable(error)) {
        return readDefaultJson<Teacher[]>("teachers.json");
      }
      throw new Error(`teachers fetch failed: ${error.message}`);
    }
    return (data as TeacherRow[]).map(mapTeacher);
  } catch (e) {
    if (e instanceof Error && e.message.includes("SUPABASE")) {
      return readDefaultJson<Teacher[]>("teachers.json");
    }
    throw e;
  }
}

export async function saveTeachersItems(items: Teacher[]): Promise<void> {
  const supabase = getAdminClient();
  const rows = items.map((item, index) => ({
    id: item.id,
    name: item.name,
    subject: item.subject,
    role: item.role || null,
    image: item.image,
    image_alt: item.imageAlt,
    sort_order: index,
    updated_at: new Date().toISOString(),
  }));

  const { error: upsertError } = await supabase.from("teachers").upsert(rows);
  if (upsertError) throw new Error(`teachers upsert failed: ${upsertError.message}`);

  const ids = items.map((i) => i.id);
  const { data: existing, error: listError } = await supabase.from("teachers").select("id");
  if (listError) throw new Error(`teachers list failed: ${listError.message}`);

  const toDelete = (existing || [])
    .map((r: { id: string }) => r.id)
    .filter((id: string) => !ids.includes(id));

  if (toDelete.length > 0) {
    const { error: deleteError } = await supabase.from("teachers").delete().in("id", toDelete);
    if (deleteError) throw new Error(`teachers delete failed: ${deleteError.message}`);
  }

  revalidateCmsPaths("teachers");
}

export async function upsertTeacherItem(item: Teacher, sortOrder = 0): Promise<Teacher> {
  const supabase = getAdminClient();
  const { data, error } = await supabase
    .from("teachers")
    .upsert({
      id: item.id,
      name: item.name,
      subject: item.subject,
      role: item.role || null,
      image: item.image,
      image_alt: item.imageAlt,
      sort_order: sortOrder,
      updated_at: new Date().toISOString(),
    })
    .select("*")
    .single();

  if (error) throw new Error(`teacher upsert failed: ${error.message}`);
  revalidateCmsPaths("teachers");
  return mapTeacher(data as TeacherRow);
}

export async function deleteTeacherItem(id: string): Promise<void> {
  const supabase = getAdminClient();
  const { error } = await supabase.from("teachers").delete().eq("id", id);
  if (error) throw new Error(`teacher delete failed: ${error.message}`);
  revalidateCmsPaths("teachers");
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    const supabase = getAdminClient();
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      if (isMissingTable(error)) {
        return readDefaultJson<GalleryItem[]>("gallery.json");
      }
      throw new Error(`gallery fetch failed: ${error.message}`);
    }
    return (data as GalleryRow[]).map(mapGallery);
  } catch (e) {
    if (e instanceof Error && e.message.includes("SUPABASE")) {
      return readDefaultJson<GalleryItem[]>("gallery.json");
    }
    throw e;
  }
}

export async function saveGalleryItems(items: GalleryItem[]): Promise<void> {
  const supabase = getAdminClient();
  const rows = items.map((item, index) => ({
    id: item.id,
    title: item.title,
    category: item.category,
    image: item.image,
    image_alt: item.imageAlt,
    sort_order: index,
    updated_at: new Date().toISOString(),
  }));

  const { error: upsertError } = await supabase.from("gallery").upsert(rows);
  if (upsertError) throw new Error(`gallery upsert failed: ${upsertError.message}`);

  const ids = items.map((i) => i.id);
  const { data: existing, error: listError } = await supabase.from("gallery").select("id");
  if (listError) throw new Error(`gallery list failed: ${listError.message}`);

  const toDelete = (existing || [])
    .map((r: { id: string }) => r.id)
    .filter((id: string) => !ids.includes(id));

  if (toDelete.length > 0) {
    const { error: deleteError } = await supabase.from("gallery").delete().in("id", toDelete);
    if (deleteError) throw new Error(`gallery delete failed: ${deleteError.message}`);
  }

  revalidateCmsPaths("gallery");
}

export async function upsertGalleryItem(item: GalleryItem, sortOrder = 0): Promise<GalleryItem> {
  const supabase = getAdminClient();
  const { data, error } = await supabase
    .from("gallery")
    .upsert({
      id: item.id,
      title: item.title,
      category: item.category,
      image: item.image,
      image_alt: item.imageAlt,
      sort_order: sortOrder,
      updated_at: new Date().toISOString(),
    })
    .select("*")
    .single();

  if (error) throw new Error(`gallery upsert failed: ${error.message}`);
  revalidateCmsPaths("gallery");
  return mapGallery(data as GalleryRow);
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
