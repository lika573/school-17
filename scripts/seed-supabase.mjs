import { readFileSync } from "fs";
import { resolve } from "path";
import { createAdminClient } from "@supabase/server/core";

function loadEnvLocal() {
  try {
    const raw = readFileSync(resolve(process.cwd(), ".env.local"), "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq);
      const value = trimmed.slice(eq + 1);
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    // ignore
  }
}

loadEnvLocal();

const news = JSON.parse(readFileSync("src/data/news.json", "utf8"));
const teachers = JSON.parse(readFileSync("src/data/teachers.json", "utf8"));
const gallery = JSON.parse(readFileSync("src/data/gallery.json", "utf8"));

const supabase = createAdminClient();

async function seed() {
  const newsRows = news.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    content: item.content,
    category: item.category,
    date: item.date,
    image: item.image,
    image_alt: item.imageAlt,
  }));

  const teacherRows = teachers.map((item, index) => ({
    id: item.id,
    name: item.name,
    subject: item.subject,
    role: item.role || null,
    image: item.image,
    image_alt: item.imageAlt,
    sort_order: index,
  }));

  const galleryRows = gallery.map((item, index) => ({
    id: item.id,
    title: item.title,
    category: item.category,
    image: item.image,
    image_alt: item.imageAlt,
    sort_order: index,
  }));

  const { error: newsError } = await supabase.from("news").upsert(newsRows);
  if (newsError) throw new Error(`news: ${newsError.message}`);

  const { error: teachersError } = await supabase.from("teachers").upsert(teacherRows);
  if (teachersError) throw new Error(`teachers: ${teachersError.message}`);

  const { error: galleryError } = await supabase.from("gallery").upsert(galleryRows);
  if (galleryError) throw new Error(`gallery: ${galleryError.message}`);

  console.log(
    `Seeded ${newsRows.length} news, ${teacherRows.length} teachers, ${galleryRows.length} gallery items`,
  );
}

seed().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
