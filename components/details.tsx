"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface DetailsProps {
  recipient: string;
  message: string;
  urlImage: string;
  createdAt: Date;
}

export default function DetailsComponent({
  recipient,
  message,
  urlImage,
  createdAt,
}: DetailsProps) {
  // Format tanggal menjadi lebih mudah dibaca
  const formattedDate = createdAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const router = useRouter();

  return (
    <div
      key={recipient}
      className="flex justify-center items-center min-h-screen p-5 bg-gray-100"
    >
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 text-center">
        <div className="text-2xl font-semibold text-gray-800 mb-4">
          Hello, {recipient}
        </div>
        <div className="text-gray-600 mb-6">
          There’s someone sending you a picture, they hope it will bring a smile
          to your face! 😊
        </div>

        <div className="flex flex-col items-center mb-6">
          <Image
            src={urlImage}
            alt="pict"
            className="rounded-lg shadow-md mb-3"
            width={400}
            height={200}
          />
          <div
            className="text-gray-700 text-3xl lg:text-4xl italic font-medium"
            style={{ fontFamily: "Reenie Beanie" }}
          >
            &quot;{message}&quot;
          </div>
        </div>

        <div className="text-gray-500 text-sm mb-6">
          Sent on {formattedDate}
        </div>

        <button
          className="bg-gray-800 text-white py-2 px-4 rounded-full hover:bg-gray-700 transition duration-300"
          onClick={() => router.push("/submit")}
        >
          Send a pict
        </button>
      </div>
    </div>
  );
}
