// import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export default async function POST(req : Request){
    try {
        const data = await req.json();
        return NextResponse.json(data);

    } catch (error) {
        return NextResponse.json(error,{status:500})        
    }
}