// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { authOptions } from "@/lib/auth-options";
// import { redirect } from "next/navigation";
import PostListClient from "./PostListClient";

export interface Post {
    id: number;
    title: string;
    body: string;
    category: string | null;
}

export default async function AllPostsPage() {
    // const session = await getServerSession(authOptions);
    // if (!session) { redirect("/login");}
    const res = await fetch( `${process.env.NEXT_PUBLIC_SITE_URL}/api/post`, { cache: "no-store" });
    const posts: Post[] = await res.json();
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">All Posts</h2>
            <PostListClient posts={posts} />
        </div>
    );
}
