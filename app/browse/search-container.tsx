'use client';
import React, { useState, useEffect } from 'react';
import './browse.css'; // Pastikan untuk membuat file CSS ini

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [inputValue, setInputValue] = useState('');
  
  // Menentukan waktu debounce (dalam milidetik)
  const debounceTimeout = 300; // Misalnya, 300ms

  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputValue) {
        setQuery(inputValue); // Perbarui state query setelah debounce
        console.log('Searching for:', inputValue);
      }
    }, debounceTimeout);

    // Membersihkan timeout jika inputValue berubah sebelum waktu debounce selesai
    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]); // Jalankan efek ini setiap kali inputValue berubah

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); // Simpan nilai input
  };

  return (
    <div className="search-container">
      <input 
        type="text" 
        className="search-input" 
        value={inputValue} 
        onChange={handleChange} 
        placeholder="Search..." 
      />
      <button 
        type="button" 
        className="search-button" 
        onClick={() => console.log('Searching for:', query)}
      >
        <svg 
          className="search-icon" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        Search
      </button>
    </div>
  );
}
