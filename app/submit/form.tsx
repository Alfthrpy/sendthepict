'use client'
import "./submit.css"
import React from "react";

export function Form() {
  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    
  };

  return (
    <div className="form-container">
      <form id="messageForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="recipientName">Recipient Name</label>
          <input
            type="text"
            id="recipientName"
            name="recipientName"
            placeholder="Enter recipient's name"
          />
          <div className="error-message" id="nameError">
            Recipient name is required
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Write your message here"
          ></textarea>
          <div className="error-message" id="messageError">
            Message is required
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="song">Meme</label>
          <input
            type="text"
            id="song"
            name="song"
            placeholder="Search for a meme..."
          />
          <div className="error-message" id="songError">
            Meme is required
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
}
