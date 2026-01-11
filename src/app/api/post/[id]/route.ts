import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET single post
export async function GET(req:  NextRequest,{ params }: { params: Promise<{ id: string }> }) {
    const {id} = await params
    const post = await prisma.post.findUnique({
        where: { id: Number(id) },
    });

    if (!post) {
        return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(post);
}

// UPDATE post
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const {id} = await params
    const { title, body, category } = await req.json();
    const updatedPost = await prisma.post.update({
        where: { id: Number(id) },
        data: { title,body,category,},
    });
    return NextResponse.json(updatedPost);
}
export async function DELETE(req: NextRequest,{ params }: { params: Promise<{ id: string }> }) {
    const {id} = await params
    try {
        await prisma.post.delete({where: { id: Number(id) },});
        return NextResponse.json({ message: "Post deleted" });
    } catch (err) {
        return NextResponse.json({ message: "Error deleting post" }, { status: 500 });
    }
}
