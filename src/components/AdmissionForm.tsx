"use client";

import { FormEvent, useState } from "react";
import { validateAdmissionForm } from "@/lib/validation";

const grades = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

export default function AdmissionForm() {
  const [form, setForm] = useState({
    parentName: "",
    childName: "",
    birthDate: "",
    grade: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = validateAdmissionForm(form);
    setErrors(result.errors);

    if (!result.valid) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/admission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Submission failed");

      setSuccess(true);
      setForm({ parentName: "", childName: "", birthDate: "", grade: "", phone: "", email: "" });
    } catch {
      setErrors({ form: "განაცხადის გაგზავნა ვერ მოხერხდა. სცადეთ თავიდან." });
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="glass-card-static p-8 text-center" role="status">
        <p className="gradient-text text-[20px] font-extrabold">
          ✓ განაცხადი მიღებულია
        </p>
        <p className="mt-2 text-[15px] text-white/50">
          თქვენი განაცხადი წარმატებით გაიგზავნა. დაგიკავშირდებით 3 სამუშაო დღის
          განმავლობაში.
        </p>
        <button
          type="button"
          className="btn-accent mt-6"
          onClick={() => setSuccess(false)}
        >
          ახალი განაცხადი
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="მიღების განაცხადის ფორმა"
    >
      {errors.form && (
        <p className="form-error mb-4" role="alert">
          {errors.form}
        </p>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="parentName" className="form-label">
            მშობლის სახელი *
          </label>
          <input
            id="parentName"
            type="text"
            className="form-input"
            value={form.parentName}
            onChange={(e) =>
              setForm({ ...form, parentName: e.target.value })
            }
            aria-invalid={!!errors.parentName}
            aria-describedby={
              errors.parentName ? "parentName-error" : undefined
            }
          />
          {errors.parentName && (
            <p id="parentName-error" className="form-error">
              {errors.parentName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="childName" className="form-label">
            ბავშვის სახელი *
          </label>
          <input
            id="childName"
            type="text"
            className="form-input"
            value={form.childName}
            onChange={(e) =>
              setForm({ ...form, childName: e.target.value })
            }
            aria-invalid={!!errors.childName}
            aria-describedby={
              errors.childName ? "childName-error" : undefined
            }
          />
          {errors.childName && (
            <p id="childName-error" className="form-error">
              {errors.childName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="birthDate" className="form-label">
            დაბადების თარიღი *
          </label>
          <input
            id="birthDate"
            type="date"
            className="form-input"
            value={form.birthDate}
            onChange={(e) =>
              setForm({ ...form, birthDate: e.target.value })
            }
            aria-invalid={!!errors.birthDate}
            aria-describedby={
              errors.birthDate ? "birthDate-error" : undefined
            }
          />
          {errors.birthDate && (
            <p id="birthDate-error" className="form-error">
              {errors.birthDate}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="grade" className="form-label">
            კლასი *
          </label>
          <select
            id="grade"
            className="form-input"
            value={form.grade}
            onChange={(e) => setForm({ ...form, grade: e.target.value })}
            aria-invalid={!!errors.grade}
            aria-describedby={errors.grade ? "grade-error" : undefined}
          >
            <option value="">აირჩიეთ კლასი</option>
            {grades.map((g) => (
              <option key={g} value={g}>
                {g} კლასი
              </option>
            ))}
          </select>
          {errors.grade && (
            <p id="grade-error" className="form-error">
              {errors.grade}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="form-label">
            ტელეფონი *
          </label>
          <input
            id="phone"
            type="tel"
            className="form-input"
            placeholder="+995 5XX XX XX XX"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone && (
            <p id="phone-error" className="form-error">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="form-label">
            ელფოსტა *
          </label>
          <input
            id="email"
            type="email"
            className="form-input"
            placeholder="example@email.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="form-error">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="btn-accent mt-8 w-full justify-center md:w-auto"
        disabled={submitting}
      >
        {submitting ? "იგზავნება..." : "განაცხადის გაგზავნა →"}
      </button>
    </form>
  );
}
