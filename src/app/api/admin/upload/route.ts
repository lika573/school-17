import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getAdminClient } from "@/lib/supabase";

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(request: Request) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "ფაილი არ მოიძებნა" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "დაშვებულია მხოლოდ JPG, PNG, WebP, GIF" },
        { status: 400 },
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "ფაილის ზომა არ უნდა აღემატებოდეს 5MB-ს" },
        { status: 400 },
      );
    }

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const safeExt = ["jpg", "jpeg", "png", "webp", "gif"].includes(ext)
      ? ext
      : "jpg";
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${safeExt}`;
    const path = `cms/${filename}`;

    const supabase = getAdminClient();
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error } = await supabase.storage.from("uploads").upload(path, buffer, {
      contentType: file.type,
      upsert: false,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data } = supabase.storage.from("uploads").getPublicUrl(path);
    return NextResponse.json({ url: data.publicUrl });
  } catch {
    return NextResponse.json({ error: "ატვირთვა ვერ მოხერხდა" }, { status: 500 });
  }
}
