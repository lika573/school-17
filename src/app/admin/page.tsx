import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";

export default async function AdminRootPage() {
  if (await isAuthenticated()) {
    redirect("/admin/news");
  }
  redirect("/admin/login");
}
