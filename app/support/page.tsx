
import "./support.css"

export default function Support() {
  return (
    <>
      <div className="support-container">
        <h1 className="support-title">
          Support <span id="judul">SendThePict</span>
        </h1>

        <p className="support-text">
          SendThePict is and will always be completely free to use! However, if
          you&apos;d like to support the development and server costs, you can
          make a voluntary contribution. Any amount is deeply appreciated and
          helps keep this service running smoothly for everyone :)
        </p>

        <div className="support-buttons">
          <a href="#" className="support-button">
            Support SendThePict (Saweria)
          </a>
          <a href="#" className="support-button">
            Support SendThePict (SociaBuzz)
          </a>
          <div className="note">Accept payments from outside Indonesia</div>
        </div>
      </div>
    </>
  );
}
