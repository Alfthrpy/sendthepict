import "./support.css";
import Image from "next/image";

export default function Support() {
  return (
    <>
      <div className="support-container">
        <h1 className="support-title">
          Support <span id="judul-2">SendThePict</span>
        </h1>
  
        <p className="support-text">
          SendThePict is and will always be completely free to use! However, if
          you&apos;d like to support the development and server costs, you can
          make a voluntary contribution. Any amount is deeply appreciated and
          helps keep this service running smoothly for everyone :)
        </p>
  
        <div className="author-info">
          <h2>Meet the Authors</h2>
          
          <div className="authors-row">
            <div className="author">
              <Image
                src="/images/IMG-20240609-WA0015 (1).jpg"
                alt="Alfathir"
                className="author-image"
                width={100}
                height={100}
                objectFit="cover"
              />
              <p className="author-name">Alfathir</p>
              <a href="https://instagram.com/alfthrpy" className="support-button" target="_blank" rel="noopener noreferrer">
                Follow on Instagram
              </a>
            </div>
  
            <div className="author">
              <Image
                src="/images/WhatsApp Image 2024-11-07 at 18.58.27_27cc80b9.jpg" // Masukkan gambar yang sesuai atau tambahkan di direktori publik
                alt="Refa Muhammad"
                className="author-image"
                width={100}
                height={100}
                objectFit="cover"
              />
              <p className="author-name">Refa Muhammad</p>
              <a href="https://www.instagram.com/refa.muhammad_/" className="support-button" target="_blank" rel="noopener noreferrer">
                Follow on Instagram
              </a>
            </div>
          </div>
        </div>
  
        <p className="credits-text">
          This website is inspired by <a href="https://sendthesong.xyz" target="_blank" rel="noopener noreferrer">sendthesong.xyz</a>.
        </p>
      </div>
    </>
  );
}
