import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req : Request,{ params }: { params: { id: string } }) {
    const id =  params.id;
    try {
        const response = await prisma.message.findUnique({
            where : {id}
        })

        return NextResponse.json(response,{status:200})
    } catch (error) {
        console.error(error);
        return NextResponse.json({error : "Internal Server Error"},{status:500})
    }
}
