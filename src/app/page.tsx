"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "@/components/NavBar";
export interface Post {
    id: number;
    title: string;
    body: string;
    category: string | null;
    author: string | null;
}

export default function PublicAllPostsPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const [categoryFilter, setCategoryFilter] = useState("");
    // Fetch posts
    useEffect(() => {
    fetch( `${process.env.NEXT_PUBLIC_SITE_URL}/api/post`, { cache: "no-store" })
        .then((res) => res.json())
        .then((data) => {
            setPosts(data);
            setFilteredPosts(data);
        });
    }, []);

   // Apply filter
    useEffect(() => {
        if (!categoryFilter) {
            setFilteredPosts(posts);
        } else {
            setFilteredPosts(posts.filter((p) => p.category === categoryFilter));
        }
    }, [categoryFilter, posts]);
    return (
        <> 
        <Navbar/>
        <div className="p-6 max-w-4xl mx-auto" >
            <h2 className="text-2xl font-bold mb-4">All Posts</h2>
            {/* Filter */}
            <div className="mb-6">
                <label className="mr-2 font-medium">Filter by Category:</label>
                <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="border p-2 rounded">
                    <option value="">All</option>
                    <option value="news">News</option>
                    <option value="technology">Technology</option>
                    <option value="lifestyle">Lifestyle</option>
                </select>
            </div>
            <div dir="rtl" className="grid grid-cols-1  sm:grid-cols-2 gap-6">
                {filteredPosts.map((post) => (
                <div key={post.id} className="border w-full sm:w-auto p-4 rounded shadow hover:shadow-lg transition">
                    <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                    <p className="text-gray-700 mb-2">
                        {post.body.length > 100 ? (
                            <>
                            {post.body.substring(0, 70)}
                            <Link href={`/${post.id}`} className="text-blue-600 hover:underline"> ...</Link>
                            </>
                            ) : (
                                post.body
                        )}
                    </p>
                    {post.author && (<p className="text-sm text-gray-500 mt-1">Author: {post.author}</p>)}
                </div>
                ))}
            </div>
        </div></>
    );
}
