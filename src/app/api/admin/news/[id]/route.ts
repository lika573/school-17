import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { deleteNewsItem, getNewsItems, slugify, upsertNewsItem } from "@/lib/cms";
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
    const current = items.find((n) => n.id === id);

    if (!current) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const title = body.title !== undefined ? String(body.title).trim() : current.title;

    const updated = await upsertNewsItem({
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
    });

    return NextResponse.json(updated);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "შეცდომა" },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, { params }: Props) {
  const denied = await guard();
  if (denied) return denied;

  try {
    const { id } = await params;
    const items = await getNewsItems();
    if (!items.some((n) => n.id === id)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await deleteNewsItem(id);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "შეცდომა" },
      { status: 500 },
    );
  }
}
