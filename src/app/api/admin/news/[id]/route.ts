import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getNewsItems, saveNewsItems, slugify } from "@/lib/cms";
import type { NewsCategory } from "@/types";

interface Props {
  params: Promise<{ id: string }>;
}

async function guard() {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export async function PUT(request: Request, { params }: Props) {
  const denied = await guard();
  if (denied) return denied;

  try {
    const { id } = await params;
    const body = await request.json();
    const items = await getNewsItems();
    const index = items.findIndex((n) => n.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const current = items[index];
    const title = body.title !== undefined ? String(body.title).trim() : current.title;

    items[index] = {
      ...current,
      title,
      excerpt: body.excerpt !== undefined ? String(body.excerpt).trim() : current.excerpt,
      content: body.content !== undefined ? String(body.content).trim() : current.content,
      category: (body.category || current.category) as NewsCategory,
      date: body.date || current.date,
      image: body.image !== undefined ? String(body.image).trim() : current.image,
      imageAlt: body.imageAlt !== undefined ? String(body.imageAlt).trim() : current.imageAlt,
      slug:
        body.slug !== undefined
          ? String(body.slug).trim() || slugify(title)
          : current.slug,
    };

    await saveNewsItems(items);
    return NextResponse.json(items[index]);
  } catch {
    return NextResponse.json({ error: "შეცდომა" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Props) {
  const denied = await guard();
  if (denied) return denied;

  try {
    const { id } = await params;
    const items = await getNewsItems();
    const filtered = items.filter((n) => n.id !== id);

    if (filtered.length === items.length) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await saveNewsItems(filtered);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "შეცდომა" }, { status: 500 });
  }
}
