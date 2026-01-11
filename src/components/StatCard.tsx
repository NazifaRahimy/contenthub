// // components/StatCard.tsx
// "use client";

// interface StatCardProps {
//   title: string;
//   value: number;
//   color?: string; // رنگ متن value
// }

// export default function StatCard({ title, value, color = "text-black" }: StatCardProps) {
//   return (
//     <div className="bg-white p-4 rounded shadow hover:shadow-lg transition">
//       <p className="text-gray-500 font-medium">{title}</p>
//       <p className={`text-3xl font-bold ${color}`}>{value}</p>
//     </div>
//   );
// }
"use client";

import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: number;
  color?: string;
}

export default function StatCard({
  title,
  value,
  color = "text-black",
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-4 rounded shadow hover:shadow-lg transition"
    >
      <p className="text-gray-500 font-medium">{title}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </motion.div>
  );
}
