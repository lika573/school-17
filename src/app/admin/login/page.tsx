import { redirect } from "next/navigation";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { isAuthenticated } from "@/lib/auth";

export default async function AdminLoginPage() {
  if (await isAuthenticated()) {
    redirect("/admin/news");
  }

  return (
    <div className="container-padding flex min-h-screen items-center justify-center py-16">
      <AdminLoginForm />
    </div>
  );
}
