import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import {
  generateId,
  getGalleryItems,
  upsertGalleryItem,
} from "@/lib/cms";
import type { GalleryItem } from "@/types";

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
    return NextResponse.json(await getGalleryItems());
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
    const title = String(body.title || "").trim();
    const image = String(body.image || "").trim();

    if (!title) {
      return NextResponse.json({ error: "სათაური სავალდებულოა" }, { status: 400 });
    }
    if (!image) {
      return NextResponse.json({ error: "ფოტო სავალდებულოა" }, { status: 400 });
    }

    const existing = await getGalleryItems();
    const item: GalleryItem = {
      id: generateId(),
      title,
      category: String(body.category || "სხვა").trim() || "სხვა",
      image,
      imageAlt: String(body.imageAlt || title).trim(),
    };

    const saved = await upsertGalleryItem(item, existing.length);
    return NextResponse.json(saved, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "შეცდომა" },
      { status: 500 },
    );
  }
}
