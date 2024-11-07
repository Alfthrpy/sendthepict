'use client'

import Image from 'next/image';
import {useRouter} from 'next/navigation';
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

    const router = useRouter()
  
    return (
      <div className="frame-container">
        <div className="frame-content">
          <div className="greeting">Hello, {recipient}</div>
          <div className="message-info">
            There’s someone sending you pict, they hope it will bring a smile to
            your face! 😊
          </div>
  
          <div className="image-frame">
          <Image
            src={urlImage}
            alt="Meme sent to you"
            className="meme-image"
            width={500} // Sesuaikan lebar gambar sesuai kebutuhan
            height={300} // Sesuaikan tinggi gambar sesuai kebutuhan
          />
            <div className="image-info">
              <div className="message">&quot;{message}&quot;</div>
            </div>
          </div>
  
          <div className="timestamp">Sent on {formattedDate}</div>
  
          <button className="send-meme-button" onClick={() => router.push('/submit')  }>Send a pict</button>
        </div>
      </div>
    );
  }
  