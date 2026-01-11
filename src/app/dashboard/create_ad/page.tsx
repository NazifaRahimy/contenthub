"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePostModal() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [category, setCategory] = useState("");
    const router = useRouter()
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch("/api/post", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            // body: JSON.stringify({ title, body, category }),

            body: JSON.stringify({ title, body, category,    authorId: "123456" }),
        });

        if (res.ok) {
            alert("successful creating post");
            setTitle("");
            setBody("");
            setCategory("");
            router.push("/dashboard/post");
        } else {
            alert("Error creating post");
        }      
    };

   return (
    <div className="flex items-center justify-center">
        <div className="bg-white p-6 rounded w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Create Post</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
            <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border p-2 rounded" required/>
            <textarea placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)} className="w-full border p-2 rounded h-32" required />
            <select value={category}onChange={(e) => setCategory(e.target.value)} className="w-full border p-2 rounded">
                 <option value="">Category</option>
                 <option value="news">News</option>
                <option value="technology">Technology</option>
                 <option value="lifestyle">Lifestyle</option>
            </select>
            <div className="flex justify-end gap-2">
            <button type="button"  className="px-4 py-2 border">Cancel </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white"> Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
