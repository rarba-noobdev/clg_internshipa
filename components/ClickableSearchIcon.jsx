'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { assets } from '@/assets/assets';

const ClickableSearchIcon = () => {
  const [showInput, setShowInput] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();
  const searchRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${query}`);
      setShowInput(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowInput(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={searchRef}>
      <button onClick={() => setShowInput(!showInput)} aria-label="Toggle search">
        <Image className="w-5 h-5 cursor-pointer" src={assets.search_icon} alt="search icon" />
      </button>

      {showInput && (
        <form 
          onSubmit={handleSearch} 
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 p-2 bg-white border rounded-md shadow-lg z-10 w-screen max-w-xs"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="w-full px-2 py-1 border-gray-300 rounded focus:outline-none"
            autoFocus
          />
        </form>
      )}
    </div>
  );
};

export default ClickableSearchIcon;