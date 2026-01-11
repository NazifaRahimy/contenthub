import Navbar from "@/components/NavBar";
import Link from "next/link";
interface Post {
    id: number;
    title: string;
    body: string;
    category: string | null;
}

interface PageProps {
    params: Promise<{ id: string }>;
}


export default async function DashboardPostPage({ params }: PageProps) {
    const {id} = await params
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/post/${Number(id)}`, { cache: "no-store" });
    const post: Post = await res.json();
    if (!post) {
        return <div className="p-6">Post not found</div>;
    }
    return (
    <>
    <Navbar />
    <div className="max-w-3xl mx-auto p-6 my-10" dir="rtl">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        {post.category && (<span className="inline-block mb-4 text-sm text-blue-600 font-medium">{post.category} </span>)}
        <p className="text-gray-800 leading-relaxed mb-6">{post.body}</p>
        <Link href='/' className="mx-4 bg-blue-600 px-4 rounded py-1 text-white">back</Link>
    </div>
    </>
  );
}
