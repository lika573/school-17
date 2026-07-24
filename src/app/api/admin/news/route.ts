import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import {
  generateId,
  getNewsItems,
  slugify,
  upsertNewsItem,
} from "@/lib/cms";
import type { NewsCategory, NewsItem } from "@/types";

async function guard() {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export async function GET() {
  const denied = await guard();
  if (denied) return denied;
  try {
    return NextResponse.json(await getNewsItems());
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "შეცდომა" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const denied = await guard();
  if (denied) return denied;

  try {
    const body = await request.json();
    const items = await getNewsItems();

    const title = String(body.title || "").trim();
    if (!title) {
      return NextResponse.json({ error: "სათაური სავალდებულოა" }, { status: 400 });
    }

    const slugBase = slugify(title) || generateId();
    let slug = slugBase;
    let i = 1;
    while (items.some((n) => n.slug === slug)) {
      slug = `${slugBase}-${i++}`;
    }

    const item: NewsItem = {
      id: generateId(),
      slug,
      title,
      excerpt: String(body.excerpt || "").trim(),
      content: String(body.content || "").trim(),
      category: (body.category || "განცხადება") as NewsCategory,
      date: body.date || new Date().toISOString().slice(0, 10),
      image: String(body.image || "").trim(),
      imageAlt: String(body.imageAlt || title).trim(),
    };

    const saved = await upsertNewsItem(item);
    return NextResponse.json(saved, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "შეცდომა" },
      { status: 500 },
    );
  }
}
