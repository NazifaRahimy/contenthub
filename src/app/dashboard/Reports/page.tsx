// app/dashboard/reports/page.tsx

import StatCard from "@/components/StatCard";
export default async function ReportsPage() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/dashboard/reports`, { cache: "no-store",});
    const data = await res.json();
    return (
        <div className="p-6 space-y-8">
            <h1 className="text-2xl font-bold">📊 Reports</h1>
            {/* Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Total Posts" value={data.totalPosts} />
                <StatCard title="Published Posts" value={data.publishedPosts} color="text-green-600"/>
                <StatCard title="Draft Posts" value={data.draftPosts} color="text-orange-500"/>
                <StatCard title="Active Users" value={data.activeUsers} color="text-indigo-600"/>
            </div>
            {/* Posts by Author */}
            <div>
                <h2 className="text-xl font-semibold mt-6 mb-4">Posts by Author</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {data.postsByAuthor.map((author: any) => (
                        <StatCard key={author.name} title={author.name} value={author.count} />
                    ))}
                </div>
            </div>
            {/* Posts by Category */}
            <div>
                <h2 className="text-xl font-semibold mt-6 mb-4">Posts by Category</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {Object.entries(data.postsByCategory).map(([category, count]) => (
                         <StatCard key={category} title={category} value={count as number} />
                    ))}
                </div>
            </div>
        </div>
    );
}
