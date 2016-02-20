import React from 'react';

const SearchBar = () => {
  return (
    <div className='search-bar'>
      <h3>SearchBar</h3>
      <input type="text" name="foodQuery" placeholder="What did you eat?" />
    </div>
  );
}

export default SearchBar;
