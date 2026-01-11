// "use client";
// import { signOut } from "next-auth/react";
// import { useRouter } from "next/navigation";

// export default function Topbar() {
//   const router = useRouter();

//   const handleLogout = async () => {
//     await signOut({ redirect: false }); // اول جلوی redirect خود NextAuth را می‌گیریم
//     router.push("/"); // بعد کاربر را به صفحه اصلی می‌فرستیم
//   };

//   return (
//     <header className="h-16 bg-white shadow flex items-center justify-between px-6">
//       <h2 className="font-semibold">My Dashboard</h2>
//       <button
//         onClick={handleLogout}
//         type="button"
//         className="text-sm text-red-600"
//       >
//         Logout
//       </button>
//     </header>
//   );
// }
"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Topbar() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false }); // جلوی redirect خود NextAuth را می‌گیریم
    router.push("/"); // بعد کاربر را به صفحه اصلی می‌فرستیم
  };

  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-6">
        <h2 className="font-semibold">My Dashboard</h2>
       {session ? (
            <div className="flex items-center gap-4">
                <span className="text-gray-700">{session.user?.name || session.user?.email}</span>
                <button onClick={handleLogout} type="button"className="text-sm text-red-600 hover:text-red-800 transition-colors"> Logout </button>
            </div>
            ) : (
                <span className="text-gray-400">Not logged in</span>
            )
        }
    </header>
  );
}

