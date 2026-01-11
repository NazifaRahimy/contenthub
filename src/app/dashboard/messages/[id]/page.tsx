import { notFound } from "next/navigation";

import DeleteButton from "@/components/DeleteMessageButton";
interface Props {
    params: { id: string };
}

export default async function MessageDetailPage({ params }: Props) {
    const { id } = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/contact/${id}`,{ cache: "no-store" } );
    const message  = await res.json()
    if (!message) notFound();

  // علامت‌گذاری به‌عنوان خوانده‌شده
    if (!message.isRead) {
        await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/contact/${id}`, { method: "PATCH" });
    }
    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="bg-white border rounded-lg shadow p-6 space-y-5">
                <h1 className="text-2xl font-bold">{message.name}</h1>
                <p className="whitespace-pre-line">{message.message}</p>
                <div className=" text-sm space-y-3">
                    <div><p><strong>Email: </strong> {message.email}</p> </div>
                    <div><p><strong>Phone : </strong>{message.phone || "ندارد"}</p></div>
                    <div><p><strong>Date: </strong>{new Date(message.createdAt).toLocaleString("fa-IR")}</p></div>
                </div>
                {/* دکمه حذف */}
                <DeleteButton id={message.id} />
            </div>
        </div>
    );
}
