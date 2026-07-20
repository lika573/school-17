import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { generateId, getTeachersItems, saveTeachersItems } from "@/lib/cms";
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
  return NextResponse.json(await getTeachersItems());
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

    const items = await getTeachersItems();
    const teacher: Teacher = {
      id: generateId(),
      name,
      subject,
      role: body.role ? String(body.role).trim() : undefined,
      image: String(body.image || "").trim(),
      imageAlt: String(body.imageAlt || `${name} — ${subject}`).trim(),
    };

    items.push(teacher);
    await saveTeachersItems(items);
    return NextResponse.json(teacher, { status: 201 });
  } catch {
    return NextResponse.json({ error: "შეცდომა" }, { status: 500 });
  }
}
