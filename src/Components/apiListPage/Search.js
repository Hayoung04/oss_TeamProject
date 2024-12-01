import React, { useState } from "react";
import "./Search.css";
import SearchIcon from "../../Img/searchIcon.png";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="searchContainer">
      <div className="searchBox">
        <input
          className="searchInput"
          type="text"
          placeholder="Search for a lecture title"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <img
          className="searchIcon"
          src={SearchIcon}
          alt="searchIcon"
          onClick={handleSearch}
          role="button"
        />
      </div>
    </div>
  );
};

export default Search;
