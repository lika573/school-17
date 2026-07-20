import { NextResponse } from "next/server";
import { setSession, verifyPassword } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (!password || !verifyPassword(password)) {
      return NextResponse.json(
        { error: "არასწორი პაროლი" },
        { status: 401 },
      );
    }

    await setSession();
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "შეცდომა" }, { status: 500 });
  }
}
