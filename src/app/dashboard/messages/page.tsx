"use client";
// جدول
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export interface ContactType {
    id: number;
    name: string;
    email: string;
    phone?: string;
    isRead: boolean;
    createdAt: string;
}
const monthNames = ["Jan","Feb","Mar","Apr","May","Jun", "Jul","Aug","Sep","Oct","Nov","Dec"];

export default function MessagesPage() {
    const [messages, setMessages] = useState<ContactType[]>([]);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch( `${process.env.NEXT_PUBLIC_SITE_URL}/api/contact`)
        .then(res => res.json())
        .then(data => {
            const sorted = data.sort(
            (a:  ContactType, b:  ContactType) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );
            setMessages(sorted);
            setLoading(false);
        });
    }, []);

    const openMessage = (id: number) => {
         // فقط NEW در UI حذف شود
        setMessages(msgs =>
            msgs.map(m => (m.id === id ? { ...m, isRead: true } : m))
        );
        router.push(`/dashboard/messages/${id}`);
    };
    if (loading) {
        return <p className="p-6 text-gray-500">در حال بارگذاری...</p>;
    }
    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">📩 Messages</h1>
            {messages.length === 0 && (  <p className="text-gray-500 mb-5">هیچ پیامی وجود ندارد.</p> )}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-left text-sm">
                            <th className="border px-3 py-2 w-12">#</th>
                            <th className="border px-3 py-2">Name</th>
                            <th className="border px-3 py-2">Email</th>
                            <th className="border px-3 py-2">Phone</th>
                            <th className="border px-3 py-2">Date</th>
                        </tr>
                    </thead>
                    <AnimatePresence>
                    <tbody>
                        {messages.map((msg, index) => {
                        const date = new Date(msg.createdAt);
                        return (
                            <motion.tr
                             key={msg.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => openMessage(msg.id)}
                            className={`cursor-pointer hover:bg-gray-50 transition ${
                                msg.isRead ? "" : "bg-blue-50 font-semibold"
                            }`}>
                            {/* nummber*/}
                            <td className="border px-3 py-2">{index + 1}</td>

                            {/* name && lastName*/}
                            <td className="border px-3 py-2">
                                <div className="flex items-center gap-2">
                                    {msg.name}
                                    {!msg.isRead && (
                                        <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full"> NEW</span>
                                    )}
                                </div>
                            </td>
                            {/* email*/}
                            <td className="border px-3 py-2 text-sm text-gray-600">{msg.email}</td>
                            {/* phone nammber*/}
                            <td className="border px-3 py-2 text-sm text-gray-700">{msg.phone || "—"}</td>
                            {/* date*/}
                            <td className="border px-3 py-2 text-sm text-gray-500">{date.getDate()} {monthNames[date.getMonth()]}</td>
                            </motion.tr>
                         );
                        })}
                    </tbody>
                    </AnimatePresence>
                </table>
            </div>
        </div>
    );
}
