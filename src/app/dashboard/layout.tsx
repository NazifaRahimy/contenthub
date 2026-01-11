import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";
// import Topbar from "@/components/Topbar";
import Topbar from "@/components/Topbar";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Dashboard Posts",
    template: "ContentHub  Dashboard | %s",
  },
  description: "Admin dashboard for managing posts, messages, and analytics.",
};



export default async function DashboardLayout({ children,}: { children: React.ReactNode;}) {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/login");
    if (!["ADMIN", "AUTHOR"].includes(session.user.role)) {
        redirect("/");
    }

    return (
    <div className="flex min-h-screen">
        <Sidebar role={session.user.role} />
        {/* <Sidebar /> */}
        <div className="flex-1">
            <Topbar />
            <main className="p-6">{children}</main>
        </div>
    </div>
  );
}
