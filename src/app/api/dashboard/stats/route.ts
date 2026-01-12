
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // === Dashboard ===
    const postCount = await prisma.post.count();
    const unreadMessages = await prisma.contact.count({
      where: { isRead: false },
    });

    const latestPosts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        category: true,
      },
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    // === Analytics ===
    const publishedPosts = await prisma.post.count({
      where: { status: "published" },
    });

    const draftPosts = await prisma.post.count({
      where: { status: "draft" },
    });

    const totalUsers = await prisma.user.count();

    const postsByCategoryRaw = await prisma.post.groupBy({
      by: ["category"],
      where: { category: { not: null } },
      _count: { id: true },
    });

    const postsByCategory: Record<string, number> = {};
    postsByCategoryRaw.forEach((item) => {
      postsByCategory[item.category!] = item._count.id;
    });

    return NextResponse.json({
      // Dashboard
      postCount,
      unreadMessages,
      latestPosts,

      // Analytics
      publishedPosts,
      draftPosts,
      totalUsers,
      postsByCategory,
    });
  } catch (error) {
    console.error("Dashboard Stats API Error:", error);
    return NextResponse.json(
      { error: "Failed to load dashboard stats" },
      { status: 500 }
    );
  }
}
