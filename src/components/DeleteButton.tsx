"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface DeleteButtonProps {
    postId: number;
}

export default function DeleteButton({ postId }: DeleteButtonProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this post?");
        if (!confirmed) return;
        setLoading(true);
        try {const res = await fetch(`/api/post/${postId}`, { method: "DELETE",});
             if (!res.ok) throw new Error("Failed to delete post");
             alert("Post deleted successfully");
            router.refresh(); // رفرش داده‌ها
            router.push("/dashboard/post"); // ریدایرکت به لیست
        } catch (err) {
            alert("Error deleting post");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
    <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={loading}
        onClick={handleDelete}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50">
        {loading ? "Deleting..." : "Delete"}
    </motion.button>
  );
}
