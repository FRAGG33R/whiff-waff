import React from 'react'
import { useState, ChangeEvent } from 'react';

const userInput: React.FC = () => {
    const [search, setSearch] = useState('');
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
      };
  return (
    <div className="relative mx-auto flex items-center">
    <input
      type="text"
      placeholder="Search"
      value={search}
      onChange={handleChange}
      className="border-2 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
    />
    {search && (
      <button
        className="absolute right-0 mr-3 focus:outline-none"
        onClick={() => setSearch('')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400 hover:text-gray-600"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.6 10l6.29-6.29a1 1 0 0 0-1.42-1.42L8.88 8.59 2.59 2.29A1 1 0 0 0 1.17 3.71L7.46 10l-6.29 6.29a1 1 0 1 0 1.42 1.42l6.29-6.29 6.29 6.29a1 1 0 1 0 1.42-1.42L9.6 10z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    )}
  </div>
  )
}

export default userInput;