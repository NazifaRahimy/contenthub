import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

// گرفتن پیام‌ها (جدیدها اول)
export async function GET() {
    const messages = await prisma.contact.findMany({
        orderBy: { createdAt: "desc" },
        // where: { isRead: false },
    });
    return NextResponse.json(messages);
}

export async function POST (request: Request){
    try{
        const contact = await request.json()
        const newContact = await  prisma.contact.create({
            data:{
                name: contact.name,
                email: contact.email,
                message: contact.message,
                phone: contact.phone,
            }
        })
        return NextResponse.json(newContact,  { status: 201 })
    }catch(error){

        console.log(error)
        return NextResponse.json({error: "Failed to create contact" }, {status: 500})
    }

}