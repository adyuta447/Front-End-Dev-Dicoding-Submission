import React from 'react';

function SearchBar({ onTyping }) {
  return (
    <div className="note__search-wrapper">
      <input type="text" placeholder="Search in here..." onChange={onTyping} />
    </div>
  );
}

export default SearchBar;
