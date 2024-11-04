import { NextResponse } from "next/server";

export async function GET(req: Request) {
    // Data contoh
    const data = Array.from({ length: 100 }, (_, i) => ({
        recipient: `User ${i + 1}`,
        message: `Ini adalah pesan untuk User ${i + 1}.`,
        song: {
            title: `Song Title ${i + 1}`,
            albumArt: `/api/placeholder/${i + 1 % 5}/48/48`
        }
    }));

    try {
        const { searchParams } = new URL(req.url);
        const query = searchParams.get('query');

        // Jika query tidak ada, kembalikan semua data
        if (!query) {
            return NextResponse.json(data);
        }

        // Filter data berdasarkan query
        const filteredResults = data.filter(item =>
            item.recipient.toLowerCase().includes(query.toLowerCase()) ||
            item.message.toLowerCase().includes(query.toLowerCase()) ||
            item.song.title.toLowerCase().includes(query.toLowerCase())
        );

        // Jika tidak ada hasil yang ditemukan
        if (filteredResults.length === 0) {
            return NextResponse.json({ message: "No results found." }, { status: 404 });
        }

        // Kembalikan hasil yang difilter
        return NextResponse.json(filteredResults);

    } catch (error) {
        console.error(error); // Log error untuk debugging
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
