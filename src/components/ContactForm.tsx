"use client";

import { FormEvent, useState } from "react";
import { validateContactForm } from "@/lib/validation";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = validateContactForm(form);
    setErrors(result.errors);

    if (!result.valid) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Submission failed");

      setSuccess(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setErrors({ form: "შეტყობინების გაგზავნა ვერ მოხერხდა. სცადეთ თავიდან." });
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="glass-card-static p-8 text-center" role="status">
        <p className="gradient-text text-[20px] font-extrabold">
          ✓ შეტყობინება გაიგზავნა
        </p>
        <p className="mt-2 text-[15px] text-white/50">
          მადლობა დაუკავშირდეთ. პასუხს მალე მიიღებთ.
        </p>
        <button
          type="button"
          className="btn-accent mt-6"
          onClick={() => setSuccess(false)}
        >
          ახალი შეტყობინება
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="საკონტაქტო ფორმა">
      {errors.form && (
        <p className="form-error mb-4" role="alert">
          {errors.form}
        </p>
      )}

      <div className="grid gap-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className="form-label">
              სახელი *
            </label>
            <input
              id="contact-name"
              type="text"
              className="form-input"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              aria-invalid={!!errors.name}
            />
            {errors.name && <p className="form-error">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="contact-email" className="form-label">
              ელფოსტა *
            </label>
            <input
              id="contact-email"
              type="email"
              className="form-input"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              aria-invalid={!!errors.email}
            />
            {errors.email && <p className="form-error">{errors.email}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="contact-subject" className="form-label">
            თემა *
          </label>
          <input
            id="contact-subject"
            type="text"
            className="form-input"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            aria-invalid={!!errors.subject}
          />
          {errors.subject && <p className="form-error">{errors.subject}</p>}
        </div>

        <div>
          <label htmlFor="contact-message" className="form-label">
            შეტყობინება *
          </label>
          <textarea
            id="contact-message"
            rows={5}
            className="form-input resize-y"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            aria-invalid={!!errors.message}
          />
          {errors.message && <p className="form-error">{errors.message}</p>}
        </div>
      </div>

      <button
        type="submit"
        className="btn-accent mt-8 w-full justify-center md:w-auto"
        disabled={submitting}
      >
        {submitting ? "იგზავნება..." : "გაგზავნა →"}
      </button>
    </form>
  );
}
