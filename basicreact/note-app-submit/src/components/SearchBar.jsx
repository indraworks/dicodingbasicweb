import React from "react";
import PropTypes from "prop-types";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search-bar">
      <FiSearch />
      <input
        type="text"
        placeholder="Cari catatan.."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};
//proptypes
SearchBar.PropTypes = {
  searchTerm: PropTypes.string.isRequired,
  //ini state setState berarti adalah function!
  setSearchTerm: PropTypes.func.isRequired,
};

export default SearchBar;
