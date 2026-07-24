"use client";

import { useCallback, useEffect, useState } from "react";
import ImageField from "@/components/admin/ImageField";
import type { GalleryItem } from "@/types";

const emptyForm = {
  title: "",
  category: "",
  image: "",
  imageAlt: "",
};

export default function AdminGalleryEditor() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState(emptyForm);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/gallery");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      setItems([]);
      setMessage("გალერეის ჩატვირთვა ვერ მოხერხდა");
    } finally {
      setLoading(false);
    }
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
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "შეცდომა შენახვისას");
      setItems((prev) => prev.map((g) => (g.id === id ? data : g)));
      setMessage("შენახულია ✓");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "შეცდომა შენახვისას");
    } finally {
      setSaving(null);
    }
  };

  const createItem = async () => {
    if (!form.title.trim()) {
      setMessage("შეიყვანეთ სათაური");
      return;
    }
    if (!form.image.trim()) {
      setMessage("აირჩიეთ ან ატვირთეთ ფოტო");
      return;
    }

    setSaving("new");
    setMessage("");
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title.trim(),
          category: form.category.trim() || "სხვა",
          image: form.image.trim(),
          imageAlt: form.imageAlt.trim() || form.title.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "დამატება ვერ მოხერხდა");
      setItems((prev) => [data, ...prev]);
      setForm(emptyForm);
      setMessage("ფოტო დაემატა ✓");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "დამატება ვერ მოხერხდა");
    } finally {
      setSaving(null);
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm("ნამდვილად გსურთ ამ ფოტოს წაშლა?")) return;
    setSaving(id);
    setMessage("");
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "წაშლა ვერ მოხერხდა");
      setItems((prev) => prev.filter((g) => g.id !== id));
      setMessage("წაიშალა ✓");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "წაშლა ვერ მოხერხდა");
    } finally {
      setSaving(null);
    }
  };

  if (loading) {
    return <p className="text-secondary">იტვირთება...</p>;
  }

  return (
    <div className="space-y-10">
      <h1 className="text-[24px] font-extrabold">გალერეის მართვა</h1>

      {message && (
        <p
          className="border border-accent bg-accent/5 px-4 py-3 text-[14px] font-semibold text-accent"
          role="status"
        >
          {message}
        </p>
      )}

      {/* Always-visible add form */}
      <section className="border-2 border-accent bg-white p-6 md:p-8">
        <h2 className="mb-1 text-[20px] font-extrabold text-foreground">
          ახალი ფოტოს დამატება
        </h2>
        <p className="mb-6 text-[14px] text-secondary">
          ატვირთე ფაილი ან ჩასვი ფოტოს ბმული, შეავსე სათაური და დააჭირე „დამატება“.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="form-label" htmlFor="gallery-title">
              სათაური *
            </label>
            <input
              id="gallery-title"
              className="form-input"
              placeholder="მაგ. სკოლის ეზო"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <div>
            <label className="form-label" htmlFor="gallery-category">
              კატეგორია
            </label>
            <input
              id="gallery-category"
              className="form-input"
              placeholder="მაგ. შენობა, სპორტი, ღონისძიება"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
          </div>
        </div>

        <div className="mt-6">
          <ImageField
            label="ფოტო *"
            value={form.image}
            alt={form.imageAlt}
            onChange={(url) => setForm({ ...form, image: url })}
            onAltChange={(alt) => setForm({ ...form, imageAlt: alt })}
          />
        </div>

        <button
          type="button"
          className="btn-accent mt-6 w-full justify-center md:w-auto"
          onClick={createItem}
          disabled={saving === "new"}
        >
          {saving === "new" ? "ინახება..." : "+ ფოტოს დამატება"}
        </button>
      </section>

      <section>
        <h2 className="mb-6 text-[18px] font-extrabold">
          არსებული ფოტოები ({items.length})
        </h2>

        {items.length === 0 ? (
          <p className="text-[15px] text-secondary">
            გალერეა ცარიელია. ზემოთ დაამატე პირველი ფოტო.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <article key={item.id} className="border border-border p-4">
                <div className="mb-3 flex items-start justify-between gap-2">
                  <h3 className="text-[15px] font-bold">{item.title}</h3>
                  <button
                    type="button"
                    className="shrink-0 text-[13px] font-semibold text-red-600 hover:underline"
                    onClick={() => deleteItem(item.id)}
                    disabled={saving === item.id}
                  >
                    წაშლა
                  </button>
                </div>

                <ImageField
                  label="ფოტო"
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
                      prev.map((g) =>
                        g.id === item.id ? { ...g, title: e.target.value } : g,
                      ),
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
                      prev.map((g) =>
                        g.id === item.id ? { ...g, category: e.target.value } : g,
                      ),
                    )
                  }
                  onBlur={(e) =>
                    updateItem(item.id, { category: e.target.value })
                  }
                />
                {saving === item.id && (
                  <p className="mt-2 text-[13px] text-secondary">ინახება...</p>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
