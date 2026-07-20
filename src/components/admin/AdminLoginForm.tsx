"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "ავტორიზაცია ვერ მოხერხდა");
        return;
      }

      router.push("/admin/news");
      router.refresh();
    } catch {
      setError("ავტორიზაცია ვერ მოხერხდა");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-sm space-y-6">
      <div>
        <h1 className="text-[24px] font-extrabold">ადმინ პანელი</h1>
        <p className="mt-2 text-[14px] text-secondary">
          შეიყვანეთ პაროლი სისტემაში შესასვლელად
        </p>
      </div>

      <div>
        <label htmlFor="password" className="form-label">პაროლი</label>
        <input
          id="password"
          type="password"
          className="form-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
      </div>

      {error && <p className="form-error" role="alert">{error}</p>}

      <button type="submit" className="btn-primary w-full justify-center" disabled={loading}>
        {loading ? "შესვლა..." : "შესვლა →"}
      </button>
    </form>
  );
}
