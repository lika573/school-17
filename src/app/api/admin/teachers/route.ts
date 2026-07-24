import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import {
  generateId,
  getTeachersItems,
  upsertTeacherItem,
} from "@/lib/cms";
import type { Teacher } from "@/types";

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
    return NextResponse.json(await getTeachersItems());
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
    const name = String(body.name || "").trim();
    const subject = String(body.subject || "").trim();

    if (!name || !subject) {
      return NextResponse.json(
        { error: "სახელი და საგანი სავალდებულოა" },
        { status: 400 },
      );
    }

    const existing = await getTeachersItems();
    const teacher: Teacher = {
      id: generateId(),
      name,
      subject,
      role: body.role ? String(body.role).trim() : undefined,
      image: String(body.image || "").trim(),
      imageAlt: String(body.imageAlt || `${name} — ${subject}`).trim(),
    };

    const saved = await upsertTeacherItem(teacher, existing.length);
    return NextResponse.json(saved, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "შეცდომა" },
      { status: 500 },
    );
  }
}
