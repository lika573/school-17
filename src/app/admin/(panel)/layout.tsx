import { redirect } from "next/navigation";
import AdminNav from "@/components/admin/AdminNav";
import { isAuthenticated } from "@/lib/auth";

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />
      <div className="container-padding py-10">{children}</div>
    </div>
  );
}
