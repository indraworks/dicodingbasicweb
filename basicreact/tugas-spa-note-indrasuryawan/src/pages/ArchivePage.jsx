import React from "react";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import { getActiveNotes, getArchiveNotes } from "../utils/data";

const ArchivePage = ({ searchTerm, setSearchTerm }) => {
  //filter yg archive saja dari notes
  const archiveNotes = getArchiveNotes().filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div>
      <h2>Archive Notes </h2>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <NoteList notes={archiveNotes} />
      <div className="homepage__action">
        <Link to="/notes/new" className="action">
          <FiPlus />
        </Link>
      </div>
    </div>
  );
};

export default ArchivePage;
