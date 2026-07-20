"use client";

import { useCallback, useEffect, useState } from "react";
import ImageField from "@/components/admin/ImageField";
import type { GalleryItem } from "@/types";

export default function AdminGalleryEditor() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/gallery");
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const updateItem = async (id: string, patch: Partial<GalleryItem>) => {
    setSaving(id);
    setMessage("");
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setItems((prev) => prev.map((g) => (g.id === id ? updated : g)));
      setMessage("შენახულია ✓");
    } catch {
      setMessage("შეცდომა შენახვისას");
    } finally {
      setSaving(null);
    }
  };

  if (loading) {
    return <p className="text-secondary">იტვირთება...</p>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-[24px] font-extrabold">გალერეის მართვა</h1>

      {message && (
        <p className="border border-accent bg-accent/5 px-4 py-2 text-[14px] text-accent">
          {message}
        </p>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article key={item.id} className="border border-border p-4">
            <ImageField
              label={item.title}
              value={item.image}
              alt={item.imageAlt}
              onChange={(url) => updateItem(item.id, { image: url })}
              onAltChange={(alt) => updateItem(item.id, { imageAlt: alt })}
            />
            <input
              className="form-input mt-3"
              value={item.title}
              onChange={(e) =>
                setItems((prev) =>
                  prev.map((g) => (g.id === item.id ? { ...g, title: e.target.value } : g)),
                )
              }
              onBlur={(e) => updateItem(item.id, { title: e.target.value })}
            />
            <input
              className="form-input mt-2"
              value={item.category}
              placeholder="კატეგორია"
              onChange={(e) =>
                setItems((prev) =>
                  prev.map((g) => (g.id === item.id ? { ...g, category: e.target.value } : g)),
                )
              }
              onBlur={(e) => updateItem(item.id, { category: e.target.value })}
            />
            {saving === item.id && (
              <p className="mt-2 text-[13px] text-secondary">ინახება...</p>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
