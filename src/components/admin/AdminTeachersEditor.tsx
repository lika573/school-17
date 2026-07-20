"use client";

import { useCallback, useEffect, useState } from "react";
import ImageField from "@/components/admin/ImageField";
import type { Teacher } from "@/types";

const emptyForm = {
  name: "",
  subject: "",
  role: "",
  image: "",
  imageAlt: "",
};

export default function AdminTeachersEditor() {
  const [items, setItems] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/teachers");
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const updateItem = async (id: string, patch: Partial<Teacher>) => {
    setSaving(id);
    setMessage("");
    try {
      const res = await fetch(`/api/admin/teachers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setItems((prev) => prev.map((t) => (t.id === id ? updated : t)));
      setMessage("შენახულია ✓");
    } catch {
      setMessage("შეცდომა შენახვისას");
    } finally {
      setSaving(null);
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm("ნამდვილად გსურთ მასწავლებელის წაშლა?")) return;
    setSaving(id);
    try {
      const res = await fetch(`/api/admin/teachers/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setItems((prev) => prev.filter((t) => t.id !== id));
      setMessage("წაიშალა ✓");
    } catch {
      setMessage("წაშლა ვერ მოხერხდა");
    } finally {
      setSaving(null);
    }
  };

  const createItem = async () => {
    if (!form.name.trim() || !form.subject.trim()) return;
    setSaving("new");
    try {
      const res = await fetch("/api/admin/teachers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      const created = await res.json();
      setItems((prev) => [...prev, created]);
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
        <h1 className="text-[24px] font-extrabold">მასწავლებელის მართვა</h1>
        <button
          type="button"
          className="btn-accent"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "დახურვა" : "+ მასწავლებელის დამატება"}
        </button>
      </div>

      {message && (
        <p className="border border-accent bg-accent/5 px-4 py-2 text-[14px] text-accent">
          {message}
        </p>
      )}

      {showForm && (
        <div className="space-y-4 border border-border p-6">
          <h2 className="text-[17px] font-bold">ახალი მასწავლებელი</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <input
              className="form-input"
              placeholder="სახელი *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              className="form-input"
              placeholder="საგანი *"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
            />
            <input
              className="form-input"
              placeholder="თანამდებობა (არასავალდებულო)"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
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
            disabled={saving === "new" || !form.name.trim() || !form.subject.trim()}
          >
            {saving === "new" ? "ინახება..." : "დამატება"}
          </button>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {items.map((item) => (
          <article key={item.id} className="border border-border p-5">
            <div className="mb-4 flex items-start justify-between">
              <h2 className="text-[16px] font-bold">{item.name}</h2>
              <button
                type="button"
                className="text-[13px] font-semibold text-red-600 hover:underline"
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

            <div className="mt-3 space-y-2">
              <input
                className="form-input"
                value={item.name}
                onChange={(e) =>
                  setItems((prev) =>
                    prev.map((t) => (t.id === item.id ? { ...t, name: e.target.value } : t)),
                  )
                }
                onBlur={(e) => updateItem(item.id, { name: e.target.value })}
              />
              <input
                className="form-input"
                value={item.subject}
                placeholder="საგანი"
                onChange={(e) =>
                  setItems((prev) =>
                    prev.map((t) => (t.id === item.id ? { ...t, subject: e.target.value } : t)),
                  )
                }
                onBlur={(e) => updateItem(item.id, { subject: e.target.value })}
              />
              <input
                className="form-input"
                value={item.role || ""}
                placeholder="თანამდებობა"
                onChange={(e) =>
                  setItems((prev) =>
                    prev.map((t) => (t.id === item.id ? { ...t, role: e.target.value } : t)),
                  )
                }
                onBlur={(e) => updateItem(item.id, { role: e.target.value })}
              />
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
