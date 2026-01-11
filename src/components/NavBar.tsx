"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
        {/* لوگو */}
        <div className="text-2xl font-bold text-blue-600">ContentHub</div>
        {/* لینک‌ها */}
        <div className="space-x-6 text-gray-700 font-medium flex items-center">
            <Link href="/about">About</Link>
            <Link href="/">Posts</Link>
            <Link href="/contact">Contact</Link>
             {/* فقط ADMIN */}
            {session?.user?.role === "ADMIN" && (
                <Link  href="/dashboard" className="font-semibold text-blue-600"> Dashboard </Link>
            )} 
            {/* حالت لاگین / لاگ‌اوت */}
            {status === "loading" ? null : session ? (
                <button onClick={() => signOut({ callbackUrl: "/" })} className="text-red-600 font-semibold hover:underline" > Logout </button>
                ) : (
                <Link href="/login" className="font-semibold"> Login </Link>
            )}
        </div>
    </nav>
  );
}
