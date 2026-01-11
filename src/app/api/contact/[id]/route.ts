import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // توجه: await اینجا باید باشد

  const contact = await prisma.contact.findUnique({
    where: { id: Number(id) },
  });

  if (!contact) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(contact);
}

export async function PATCH( req: NextRequest,
  context: { params: Promise<{ id: string }> }) {
    const {id} = await context.params
    const msg = await prisma.contact.update({
         where: { id: Number(id) },
        data: { isRead: true },
    });

    return NextResponse.json(msg);
}

export async function DELETE(   req: NextRequest,
  context: { params: Promise<{ id: string }> }) {
    const {id} = await context.params
    await prisma.contact.delete({
        where: { id: Number(id) },
    });

    return NextResponse.json({ success: true });
}
