import React, { useState } from 'react';

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {


  return (
    <div className='fixed w-full'>
      <input
        type="text"
        name="text"
        className="input"
        placeholder="You can search by name or by HP (e.g., '50')"
        onChange={(e)=>onSearch( Number(e.target.value) ? ">" + e.target.value : e.target.value)}
      />
    </div>
  );
};

export default Search;
