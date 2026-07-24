import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { deleteTeacherItem, getTeachersItems, upsertTeacherItem } from "@/lib/cms";

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
    const items = await getTeachersItems();
    const index = items.findIndex((t) => t.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const current = items[index];
    const updated = await upsertTeacherItem(
      {
        ...current,
        name: body.name !== undefined ? String(body.name).trim() : current.name,
        subject: body.subject !== undefined ? String(body.subject).trim() : current.subject,
        role: body.role !== undefined ? String(body.role).trim() || undefined : current.role,
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

export async function DELETE(_request: Request, { params }: Props) {
  const denied = await guard();
  if (denied) return denied;

  try {
    const { id } = await params;
    const items = await getTeachersItems();
    if (!items.some((t) => t.id === id)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await deleteTeacherItem(id);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "შეცდომა" },
      { status: 500 },
    );
  }
}
