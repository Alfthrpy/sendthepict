import './index.css'

export default function Home() {



  return (
    <>
    
    <div className="main-content">
        <div className="container">
            <h1 className="title">a bunch of the untold words, sent <br></br> through the meme</h1>
            <p className="subtitle">Express your untold message through the meme</p>
            <div className="buttons">
                <a href="submit.html" className="button primary-button">
                    Tell Your Story
                    <span className="arrow">→</span>
                </a>
                <a href="#" className="button secondary-button">
                    Support SendTheMeme
                    <span className="arrow">→</span>
                </a>
            </div>
        </div>
    </div>
    <section className="cards-section">
        <div className="card">
            <h2 className="card-title">Share Your Message</h2>
            <p className="card-description">Choose a meme and write a heartfelt message to someone special.</p>
            <a href="submit.html" className="card-button">
                Create Message
                <span className="arrow">→</span>
            </a>
        </div>

        <div className="card">
            <h2 className="card-title">Browse Messages</h2>
            <p className="card-description">Find messages that were written for you. Search by your name to discover
                heartfelt dedications.</p>
            <a href="#" className="card-button card-button-outline">
                Start Browsing
                <span className="arrow">→</span>
            </a>
        </div>

        <div className="card">
            <h2 className="card-title">Detail Messages</h2>
            <p className="card-description">You can click on any message card to read the full story and listen to the
                chosen meme!</p>
        </div>
    </section>
    </>
    
  );
}
