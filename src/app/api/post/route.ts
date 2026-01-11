import {  NextResponse  } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]/route";
import { authOptions } from "@/lib/auth-options";
export async function GET(){
    const posts =  await prisma.post.findMany();
    return  NextResponse.json(posts)
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const body = await request.json();
        console.log("🔥 POST /api/post HIT");
        const newPost = await prisma.post.create({
            data: {
                title: body.title,
                body: body.body,
                category: body.category,
                authorId: session.user.id, // ✅ اضافه شد
            },
        });
        return NextResponse.json(newPost, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to create post" },
            { status: 500 }
        );
    }
}