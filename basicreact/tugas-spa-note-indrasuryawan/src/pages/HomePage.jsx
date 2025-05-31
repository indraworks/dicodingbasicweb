import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import {
  archiveNote,
  deleteNote,
  getActiveNotes,
  getArchiveNotes,
} from "../utils/data";

const HomePage = ({ searchTerm, setSearchTerm }) => {
  const [activeNotes, setActiveNotes] = useState([]);

  //useEffect initla ambil data
  useEffect(() => {
    refresNotes();
  }, []);
  const refresNotes = () => {
    setActiveNotes(getActiveNotes());
  };

  //hadnle delete dgn state yg sudah update
  const handleDelete = (id) => {
    if (window.confirm("delete this note ??")) {
      deleteNote(id);
      refresNotes();
    }
  };

  //handlearchiving sama!
  const handleArchive = (id) => {
    archiveNote(id);
    refresNotes();
  };
  //filteredNotes base searachTerm title
  const filteredNotes = activeNotes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <h2>Active Notes</h2>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <NoteList
        notes={filteredNotes}
        onDelete={handleDelete}
        onArchive={handleArchive}
      />

      <div className="homepage__action">
        <Link to="/notes/new" className="action">
          <FiPlus />
        </Link>
      </div>
    </>
  );
};

export default HomePage;
