// // import Link from "next/link";
// // import { prisma } from "@/lib/db";

// // export default async function DashboardPage() {
// //      const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/dashboard/stats`, {cache: "no-store",});
// //     const postCount = await prisma.post.count();
// //     const unreadMessages = await prisma.contact.count({ where: { isRead: false },});
// //     const latestPosts = await prisma.post.findMany({
// //         orderBy: { createdAt: "desc" },
// //         take: 5,
// //     });

// //     return (
// //         <div className="space-y-8">
// //             {/* 🔹 Stats */}
// //             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //                 <StatCard title="Total Posts" value={postCount} />
// //                 <StatCard title="Unread Messages" value={unreadMessages} />
// //                 <StatCard title="Categories" value="3" />
// //             </div>
// //             {/* 🔹 Latest Posts */}
// //             <div>
// //                 <h2 className="text-xl font-bold mb-4">Latest Posts</h2>
// //                 <div className="space-y-4">
// //                     {latestPosts.map((post) => (
// //                     <div key={post.id} className="border p-4 rounded flex justify-between">
// //                         <div>
// //                             <h3 className="font-semibold">{post.title}</h3>
// //                             <span className="text-sm text-gray-500">{post.category}</span>
// //                         </div>
// //                         <Link href={`/dashboard/post/${post.id}`}className="text-blue-600"> View</Link>
// //                     </div>
// //                     ))}
// //                 </div>
// //             </div>
// //             {/* 🔹 Quick Actions */}
// //             <div className="flex gap-4">
// //                 <Link  href="/dashboard/create_ad" className="px-4 py-2 bg-blue-600 text-white rounded" >  ➕ Create Post</Link>
// //                 <Link href="/dashboard/post" className="px-4 py-2 border rounded" > 📄 All Posts </Link>
// //             </div>
// //         </div>
// //      );
// // }

// // /* 🔹 Component کوچک */
// // function StatCard({ title, value }: { title: string; value: any }) {
// //     return (
// //         <div className="bg-white shadow rounded p-4">
// //             <h3 className="text-sm text-gray-500">{title}</h3>
// //             <p className="text-2xl font-bold">{value}</p>
// //         </div>
// //     );
// // }
import Link from "next/link";

type DashboardStats = {
  postCount: number;
  unreadMessages: number;
  latestPosts: {
    id: number;
    title: string;
    category: string | null;
  }[];
};

export default async function DashboardPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/dashboard/stats`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard data");
  }

  const data: DashboardStats = await res.json();

  return (
    <div className="space-y-8">
      {/* 🔹 Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Posts" value={data.postCount} />
        <StatCard title="Unread Messages" value={data.unreadMessages} />
        <StatCard title="Categories" value="3" />
      </div>

      {/* 🔹 Latest Posts */}
      <div>
        <h2 className="text-xl font-bold mb-4">Latest Posts</h2>
        <div className="space-y-4">
          {data.latestPosts.map((post) => (
            <div
              key={post.id}
              className="border p-4 rounded flex justify-between"
            >
              <div>
                <h3 className="font-semibold">{post.title}</h3>
                <span className="text-sm text-gray-500">
                  {post.category}
                </span>
              </div>
              <Link
                href={`/dashboard/post/${post.id}`}
                className="text-blue-600"
              >
                View
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 Quick Actions */}
      <div className="flex gap-4">
        <Link
          href="/dashboard/create_ad"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          ➕ Create Post
        </Link>

        <Link
          href="/dashboard/post"
          className="px-4 py-2 border rounded"
        >
          📄 All Posts
        </Link>
      </div>
    </div>
  );
}

/* 🔹 Component کوچک */
function StatCard({ title, value }: { title: string; value: any }) {
  return (
    <div className="bg-white shadow rounded p-4">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
// export default function DashboardPage() {
//   return <h1>DASHBOARD OK</h1>;
// }
