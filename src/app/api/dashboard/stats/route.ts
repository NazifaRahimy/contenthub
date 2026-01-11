// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/db";

// export async function GET() {
//   try {
//     const totalPosts = await prisma.post.count();
//     const publishedPosts = await prisma.post.count({where: { status: "published" },});
//     const draftPosts = await prisma.post.count({ where: { status: "draft" },});
//     const newsCount = await prisma.post.count({ where: { category: "news" },});
//     const techCount = await prisma.post.count({where: { category: "technology" },});
//     const lifeCount = await prisma.post.count({where: { category: "life" },});
//     const totalUsers = await prisma.user.count(); // 👈 کاربران

//     return NextResponse.json({
//         totalPosts,
//         publishedPosts,
//         draftPosts,
//         totalUsers,
//         byCategory: {
//             news: newsCount,
//             technology: techCount,
//             life: lifeCount,
//         },
//     });
//     } catch (error) {
//         return NextResponse.json(
//             { message: "Error fetching stats" },
//             { status: 500 }
//         );
//     }
// }

import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const postCount = await prisma.post.count();
    const unreadMessages = await prisma.contact.count({
      where: { isRead: false },
    });

    const latestPosts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    const publishedPosts = await prisma.post.count({
      where: { status: "published" },
    });

    const draftPosts = await prisma.post.count({
      where: { status: "draft" },
    });

    const newsCount = await prisma.post.count({
      where: { category: "news" },
    });

    const techCount = await prisma.post.count({
      where: { category: "technology" },
    });

    const lifeCount = await prisma.post.count({
      where: { category: "life" },
    });

    const totalUsers = await prisma.user.count();

    return NextResponse.json({
      postCount,
      unreadMessages,
      latestPosts,
      totalUsers,
      byStatus: {
        published: publishedPosts,
        draft: draftPosts,
      },
      byCategory: {
        news: newsCount,
        technology: techCount,
        life: lifeCount,
      },
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
