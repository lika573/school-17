"use client";

import Image from "next/image";
import { useRef, useState } from "react";

interface ImageFieldProps {
  label: string;
  value: string;
  alt?: string;
  onChange: (url: string) => void;
  onAltChange?: (alt: string) => void;
}

export default function ImageField({
  label,
  value,
  alt,
  onChange,
  onAltChange,
}: ImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const upload = async (file: File) => {
    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "ატვირთვა ვერ მოხერხდა");
      onChange(data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "ატვირთვა ვერ მოხერხდა");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <label className="form-label">{label}</label>

      {value && (
        <div className="relative aspect-video max-w-xs overflow-hidden border border-border bg-border">
          <Image
            src={value}
            alt={alt || label}
            fill
            className="object-cover"
            sizes="320px"
            unoptimized={value.startsWith("/uploads/")}
          />
        </div>
      )}

      <input
        type="url"
        className="form-input"
        placeholder="https://... ან /uploads/..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="btn-accent text-[13px]"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? "იტვირთება..." : "ფაილის ატვირთვა"}
        </button>
        {value && (
          <button
            type="button"
            className="border border-border px-4 py-2 text-[13px] font-semibold text-secondary hover:border-accent"
            onClick={() => onChange("")}
          >
            წაშლა
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) upload(file);
          e.target.value = "";
        }}
      />

      {onAltChange && (
        <input
          type="text"
          className="form-input"
          placeholder="alt ტექსტი"
          value={alt || ""}
          onChange={(e) => onAltChange(e.target.value)}
        />
      )}

      {error && <p className="form-error">{error}</p>}
    </div>
  );
}
