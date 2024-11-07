import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // Data contoh
  // const data = Array.from({ length: 100 }, (_, i) => ({
  //     recipient: `User ${i + 1}`,
  //     message: `Ini adalahah pesan untuk User ${i + 1}. wakwakwakwawkkkakwkakwkkakakwkkakkwakw`,
  // }));

  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    if (!query) {
      return NextResponse.json(
        { message: "No query provided!" },
        { status: 404 }
      );
    }

    const response = await prisma.message.findMany({
      where: {
        recipient: {
          contains: query as string,
          mode: "insensitive",
        },
      },
    });

    // Jika tidak ada hasil yang ditemukan, kembalikan status 404
    if (response.length === 0) {
      return NextResponse.json(
        { message: "No results found!" },
        { status: 404 }
      );
    }

    // Kembalikan hasil yang difilter jika ada
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error(error); // Log error untuk debugging
    return NextResponse.json(
      { error: "Internal Server Error", message: error},
      { status: 500 }
    );
  }
}
