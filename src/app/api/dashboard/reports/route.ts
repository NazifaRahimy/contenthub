import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
    try {
        // Total posts
        const totalPosts = await prisma.post.count();
        // Published / Draft (مطابق schema)
        const publishedPosts = await prisma.post.count({where: { status: "published" },});
        const draftPosts = await prisma.post.count({where: { status: "draft" },});
        // Active users
        const activeUsers = await prisma.user.count({ where: { posts: { some: {} }, },});
        // Posts by Author (authorId ممکن است null باشد)
        const postsByAuthorRaw = await prisma.post.groupBy({
            by: ["authorId"],
            where: {
                authorId: { not: null },
            },
             _count: { id: true },
        });

        const postsByAuthor = await Promise.all(
        postsByAuthorRaw.map(async (item) => {
            const user = await prisma.user.findUnique({where: { id: item.authorId! },select: { name: true },});
            return {
                name: user?.name ?? "Unknown",
                count: item._count.id,
            };
        })
        );
        // Posts by Category (category nullable)
        const postsByCategoryRaw = await prisma.post.groupBy({
            by: ["category"],
            where: {
            category: { not: null },
            },
            _count: { id: true },
        });
        const postsByCategory: Record<string, number> = {};
        postsByCategoryRaw.forEach((item) => {
            postsByCategory[item.category!] = item._count.id;
        });
        return NextResponse.json({
            totalPosts,
            publishedPosts,
            draftPosts,
            activeUsers,
            postsByAuthor,
            postsByCategory,
        });
        } catch (error) {
            console.error("REPORTS API ERROR:", error);
            return NextResponse.json(
                { error: "Reports API failed" },
                { status: 500 }
            );
       }
    }
