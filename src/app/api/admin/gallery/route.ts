import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getGalleryItems, saveGalleryItems } from "@/lib/cms";

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
  return NextResponse.json(await getGalleryItems());
}

export async function PUT(request: Request) {
  const denied = await guard();
  if (denied) return denied;

  try {
    const body = await request.json();
    if (!Array.isArray(body)) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }
    await saveGalleryItems(body);
    return NextResponse.json(body);
  } catch {
    return NextResponse.json({ error: "შეცდომა" }, { status: 500 });
  }
}
