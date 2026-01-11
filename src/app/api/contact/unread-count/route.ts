import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const count = await prisma.contact.count({
        where: { isRead: false },
        });

        return NextResponse.json({ count });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ count: 0 }, { status: 500 });
    }
}
