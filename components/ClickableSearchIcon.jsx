'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { assets } from '@/assets/assets'; // Adjust path to your assets file if needed

const ClickableSearchIcon = () => {
  const [showInput, setShowInput] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  // This function runs when the user submits the search form
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${query}`);
      setShowInput(false); // Hide the input box after searching
    }
  };

  return (
    <div className="relative">
      {/* 1. The Search Icon Button */}
      {/* When you click this, it sets `showInput` to true */}
      <button onClick={() => setShowInput(true)} aria-label="Open search">
        <Image className="w-5 h-5 cursor-pointer" src={assets.search_icon} alt="search icon" />
      </button>

      {/* 2. The Input Box Form */}
      {/* This form only appears if `showInput` is true */}
      {showInput && (
        <form 
          onSubmit={handleSearch} 
          className="absolute top-full right-0 mt-2 p-2 bg-white border border-gray-300 rounded-md shadow-lg z-10"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="px-2 py-1 border rounded-md focus:outline-none"
            autoFocus // This makes the cursor appear automatically
          />
        </form>
      )}
    </div>
  );
};

export default ClickableSearchIcon;