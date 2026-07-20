"use client";

import { useCallback, useEffect, useState } from "react";
import ImageField from "@/components/admin/ImageField";
import type { NewsCategory, NewsItem } from "@/types";

const categories: NewsCategory[] = ["განცხადება", "ღონისძიება", "მიღწევა"];

const emptyForm = {
  title: "",
  excerpt: "",
  content: "",
  category: "განცხადება" as NewsCategory,
  date: new Date().toISOString().slice(0, 10),
  image: "",
  imageAlt: "",
};

export default function AdminNewsEditor() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/news");
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const updateItem = async (id: string, patch: Partial<NewsItem>) => {
    setSaving(id);
    setMessage("");
    try {
      const res = await fetch(`/api/admin/news/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setItems((prev) => prev.map((n) => (n.id === id ? updated : n)));
      setMessage("შენახულია ✓");
    } catch {
      setMessage("შეცდომა შენახვისას");
    } finally {
      setSaving(null);
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm("ნამდვილად გსურთ წაშლა?")) return;
    setSaving(id);
    try {
      const res = await fetch(`/api/admin/news/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setItems((prev) => prev.filter((n) => n.id !== id));
      setMessage("წაიშალა ✓");
    } catch {
      setMessage("წაშლა ვერ მოხერხდა");
    } finally {
      setSaving(null);
    }
  };

  const createItem = async () => {
    if (!form.title.trim()) return;
    setSaving("new");
    try {
      const res = await fetch("/api/admin/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      const created = await res.json();
      setItems((prev) => [created, ...prev]);
      setForm(emptyForm);
      setShowForm(false);
      setMessage("დაემატა ✓");
    } catch {
      setMessage("დამატება ვერ მოხერხდა");
    } finally {
      setSaving(null);
    }
  };

  if (loading) {
    return <p className="text-secondary">იტვირთება...</p>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-[24px] font-extrabold">სიახლების მართვა</h1>
        <button
          type="button"
          className="btn-accent"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "დახურვა" : "+ ახალი სიახლე"}
        </button>
      </div>

      {message && (
        <p className="border border-accent bg-accent/5 px-4 py-2 text-[14px] text-accent">
          {message}
        </p>
      )}

      {showForm && (
        <div className="space-y-4 border border-border p-6">
          <h2 className="text-[17px] font-bold">ახალი სიახლე</h2>
          <input
            className="form-input"
            placeholder="სათაური *"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <textarea
            className="form-input min-h-[80px] resize-y"
            placeholder="მოკლე აღწერა"
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          />
          <textarea
            className="form-input min-h-[120px] resize-y"
            placeholder="სრული ტექსტი"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
          <div className="grid gap-4 md:grid-cols-2">
            <select
              className="form-input"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value as NewsCategory })}
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <input
              type="date"
              className="form-input"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </div>
          <ImageField
            label="ფოტო"
            value={form.image}
            alt={form.imageAlt}
            onChange={(url) => setForm({ ...form, image: url })}
            onAltChange={(alt) => setForm({ ...form, imageAlt: alt })}
          />
          <button
            type="button"
            className="btn-primary"
            onClick={createItem}
            disabled={saving === "new" || !form.title.trim()}
          >
            {saving === "new" ? "ინახება..." : "დამატება"}
          </button>
        </div>
      )}

      <div className="space-y-6">
        {items.map((item) => (
          <article key={item.id} className="border border-border p-6">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-[13px] text-accent">{item.category} · {item.date}</p>
                <h2 className="text-[17px] font-bold">{item.title}</h2>
              </div>
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

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <input
                className="form-input"
                value={item.title}
                onChange={(e) =>
                  setItems((prev) =>
                    prev.map((n) => (n.id === item.id ? { ...n, title: e.target.value } : n)),
                  )
                }
                onBlur={(e) => updateItem(item.id, { title: e.target.value })}
              />
              <select
                className="form-input"
                value={item.category}
                onChange={(e) => updateItem(item.id, { category: e.target.value as NewsCategory })}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {saving === item.id && (
              <p className="mt-2 text-[13px] text-secondary">ინახება...</p>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
