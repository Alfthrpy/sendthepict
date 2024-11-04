"use client";
import React, { useState, useEffect } from "react";
import "./browse.css"; // Pastikan untuk membuat file CSS ini

interface Result {
  recipient: string;
  message: string;
}

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("init");
  const [results, setResults] =  useState<Result[]>([]);
  const [inputValue, setInputValue] = useState("");

  // Menentukan waktu debounce (dalam milidetik)
  const debounceTimeout = 300; // Misalnya, 300ms

  const retrieveData = async (query: string) => {
    setStatus("loading");
    const response = await fetch(`/api/details?query=${query}`);
    if (response.status === 404) {
      setStatus("not-found");
      setResults([])
    } else {
      const data = await response.json();
      setStatus("success");
      setResults(data);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputValue) {
        setQuery(inputValue);
        retrieveData(inputValue);
        console.log("Searching for:", query);
      }
    }, debounceTimeout);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); // Simpan nilai input
  };

  return (
    <div className="container-result">
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          value={inputValue}
          onChange={handleChange}
          placeholder="Search..."
        />
      </div>

      <div className="browse-container">
        {status === 'not-found' ? (<div>Not Found</div>) : status === "error" ? (<div className="error">Error</div>) : status === 'loading' ? (<div>Loading...</div>) : (<div></div>)}
      </div>

      <div className="results-container">
        {
          results.map((result, index) => (
            <div key={index} className="result-card">
              <div className="recipient">{`To: ${result.recipient}`}</div>
              <div className="message">{result.message}</div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
