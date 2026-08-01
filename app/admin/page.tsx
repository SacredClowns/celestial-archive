import { AdminDashboard } from "@/components/admin/admin-dashboard";

export const metadata = {
  title: "Enochia Command · Admin",
  description: "CRM, newsletter, course, agents, and analytics for Enochia.io",
  robots: { index: false, follow: false }
};

export default function AdminPage() {
  return <AdminDashboard />;
}
