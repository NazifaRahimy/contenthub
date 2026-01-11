"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    // fetch(`/api/post/${id}`)
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/post/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setBody(data.body);
        setCategory(data.category || "");
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/post/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body, category }),
    });

    if (res.ok) {
      alert("Post updated successfully");
      router.push("/dashboard/post");
    } else {
      alert("Error updating post");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded">
      <h2 className="text-xl font-bold mb-4">Edit Post</h2>

      <motion.form   initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }} onSubmit={handleSubmit} className="space-y-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full border p-2 rounded h-32"
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">Category</option>
          <option value="news">News</option>
          <option value="tech">Technology</option>
          <option value="life">Lifestyle</option>
        </select>

        <button  className="w-full bg-blue-600 text-white py-2 rounded">
          Save Changes
        </button>
      </motion.form>
    </div>
  );
}