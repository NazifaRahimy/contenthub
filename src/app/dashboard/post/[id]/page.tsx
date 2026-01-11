
import Link from "next/link";
import DeleteButton from "@/components/DeleteButton";
interface Post {
  id: number;
  title: string;
  body: string;
  category: string | null;
}

interface PageProps {
  params: Promise<{  id: string;}>
}

export default async function DashboardPostPage({ params }: PageProps) {
  const {id} = await params
  const res = await fetch( `${process.env.NEXT_PUBLIC_SITE_URL}/api/post/${Number(id)}`,
    { cache: "no-store" })



  if (!res.ok) {
    return <div className="p-6">Post not found</div>;
  }

  const post: Post = await res.json();

  return (
    <div className="max-w-3xl mx-auto p-6" dir="rtl">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

      {post.category && (
        <span className="inline-block mb-4 text-sm text-blue-600 font-medium">
          {post.category}
        </span>
      )}

      <p className="text-gray-800 leading-relaxed mb-6">
        {post.body}
      </p>

      <div className="flex gap-4">
        <Link
          href={`/dashboard/post/${post.id}/edit`}
          className="px-4 py-2 hover:scale-105 transition-all hover:bg-blue-700 bg-blue-600 text-white rounded"
        >
          Edit
        </Link>
          <DeleteButton postId={post.id} />

        <Link
          href="/dashboard/post"
          className="px-4 py-2 border rounded hover:scale-105 transition-all"
        >
          Back
        </Link>
      </div>
    </div>
  );
}
