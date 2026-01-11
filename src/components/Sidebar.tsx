"use client";
interface SidebarProps {
  role: "ADMIN" | "AUTHOR";
}
import Link from "next/link";
import { useEffect, useState } from "react";
// { role }: SidebarProps
export default function Sidebar({ role }: SidebarProps) {
    const [unreadCount, setUnreadCount] = useState<number>(0);
    useEffect(() => {
        const fetchUnreadCount = async () => {
            try {
                const res = await fetch("/api/contact/unread-count", { cache: "no-store",});
                const data = await res.json();
                setUnreadCount(data.count);
            } catch (error) {
                console.error("Failed to fetch unread count", error);
            }
        };
        fetchUnreadCount();
    }, []);

    return (
    <aside className="w-64 bg-white shadow-md">
        <div className="h-16 p-4 font-bold text-xl border-b">📊 Dashboard</div>
        <nav className="p-4 space-y-3">
            <Link href="/dashboard" className="block hover:text-green-600"> 🏠 Home </Link>
            <Link href="/dashboard/post" className="block hover:text-green-600">📝 Posts</Link>
            <Link href="/dashboard/create_ad" className="block hover:text-green-600">   ➕ Create Post</Link>
            <Link href="/dashboard/Reports" className="block hover:text-green-600">  📄 Reports</Link>
            <Link href="/dashboard/analytics" className="block hover:text-green-600"> 📈 Analytics</Link>
            <Link href="/dashboard/messages" className="flex items-center gap-2 hover:text-green-600">
            📩 Messages
            {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 rounded-full">
                    {unreadCount}
                </span>
             )}
            </Link>
        </nav>
    </aside>
  );
}
