import StatCard from "@/components/StatCard";
export default async function AnalyticsPage() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/dashboard/stats`, {cache: "no-store",});
    const data = await res.json();

    return (
    <div className="p-6 space-y-8">
        <h1 className="text-2xl font-bold">📊 Dashboard Analytics</h1>
        {/* === Summary === */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Total Posts" value={data.totalPosts} />
            <StatCard title="Published Posts" value={data.publishedPosts} color="text-green-600" />
            <StatCard title="Draft Posts" value={data.draftPosts} color="text-orange-500" />
            <StatCard title="Total Users" value={data.totalUsers} color="text-indigo-600" />
        </div>
        {/* === Category Breakdown === */}
        <div>
            <h2 className="text-xl font-semibold mb-4">📂 Posts by Category</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard title="News" value={data.byCategory.news} color="text-blue-600" />
            <StatCard title="Technology" value={data.byCategory.technology} color="text-green-600" />
            <StatCard title="Lifestyle" value={data.byCategory.life} color="text-purple-600" />
            </div>
        </div>
    </div>
  );
}
