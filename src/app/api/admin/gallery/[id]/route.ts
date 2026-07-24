import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getGalleryItems, upsertGalleryItem } from "@/lib/cms";

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
    const items = await getGalleryItems();
    const index = items.findIndex((g) => g.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const current = items[index];
    const updated = await upsertGalleryItem(
      {
        ...current,
        title: body.title !== undefined ? String(body.title).trim() : current.title,
        category: body.category !== undefined ? String(body.category).trim() : current.category,
        image: body.image !== undefined ? String(body.image).trim() : current.image,
        imageAlt: body.imageAlt !== undefined ? String(body.imageAlt).trim() : current.imageAlt,
      },
      index,
    );

    return NextResponse.json(updated);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "შეცდომა" },
      { status: 500 },
    );
  }
}
