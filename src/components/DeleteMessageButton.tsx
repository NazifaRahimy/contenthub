"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function DeleteMessageButton({ id }: { id: number }) {
    const router = useRouter();
    const deleteMessage = async () => {
        if (!confirm("آیا مطمئن هستی که این پیام حذف شود؟")) return;
        const res = await fetch(`/api/contact/${id}`, {method: "DELETE",});
        if (res.ok) {
            router.push("/dashboard/messages");
            router.refresh();
        }
    };

    return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="flex justify-end pt-4"
    >
      <motion.button
        onClick={deleteMessage}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 text-sm text-red-600 border border-red-200 px-4 py-2 rounded-lg hover:bg-red-50 transition"
      >
        🗑 حذف پیام
      </motion.button>
    </motion.div>
  );
}
