// import { prisma } from "@/lib/prisma";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(req : Request){
    try {
        const {...data} = await req.json();
        
        const response = await prisma.message.create({
            data : {...data},
        })
        return NextResponse.json(response,{status:201});

    } catch (error) {
        console.log(error);
        return NextResponse.json(error,{status:500})        
    }
}