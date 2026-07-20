import { mkdir, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";
import { validateAdmissionForm } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = validateAdmissionForm(body);

    if (!result.valid) {
      return NextResponse.json({ errors: result.errors }, { status: 400 });
    }

    const submission = {
      ...body,
      submittedAt: new Date().toISOString(),
      type: "admission",
    };

    const dir = path.join(process.cwd(), "data", "submissions");
    await mkdir(dir, { recursive: true });

    const filename = `admission-${Date.now()}.json`;
    await writeFile(
      path.join(dir, filename),
      JSON.stringify(submission, null, 2),
      "utf8",
    );

    // In production, integrate with email service (e.g. Resend, Nodemailer)
    console.log(`[Admission] New submission saved: ${filename}`);
    console.log(`[Admission] Would email to: info@school17.edu.ge`);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
