"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Post } from "./page";

export default function PostListClient({ posts }: { posts: Post[] }) {
  return (
    <motion.div
      className="space-y-6"
      dir="rtl"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1 },
        },
      }}
    >
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
            {posts.map((post) => (
                <motion.div key={post.id}
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                     }}
                    whileHover={{ scale: 1.02 }}
                    className="border w-full sm:w-auto  p-4 rounded shadow hover:shadow-lg transition"
                >
                    <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                    <p className="text-gray-700 mb-2">
                        {post.body.length > 100 ? (
                        <>
                        {post.body.substring(0, 70)} <Link href={`/dashboard/post/${post.id}`}> ... </Link>
                        </>
                        ) : (
                            post.body
                        )}
                    </p>
                </motion.div>
            ))}
        </div>
    </motion.div>
  );
}
