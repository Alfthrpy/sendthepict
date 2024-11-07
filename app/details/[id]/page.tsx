import DetailsComponent from "@/components/details";
import "./details.css";

// Ini adalah Server Component, jadi kita bisa langsung menggunakan fetch di sini.
export default async function Details({ params }: { params: { id: string } }) {
    const { id } = params;

    // Fetch data menggunakan id dari parameter URL
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/details/${id}`);
    
    // Pastikan respons dari API valid
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    // Mengirimkan data ke komponen DetailsComponent
    return (
        <DetailsComponent
            recipient={data?.recipient || "John Doe"}
            message={data?.message || "Hope you enjoy this meme!"}
            urlImage={data?.urlImage || "https://res.cloudinary.com/dvgaex1ox/image/upload/v1730799878/cz67ee0lmmqlecga3ebv.png"}
            createdAt={new Date(data?.createdAt || Date.now())}
        />
    );
}
