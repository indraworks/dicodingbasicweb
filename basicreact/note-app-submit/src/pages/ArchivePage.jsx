import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import { useNotes } from "../context/NotesContext";
import EmptyNotes from "../components/EmptyNotes";

//ini archivePage mirip sama dgn homePage tapi kursus utk tampilan yg archive notes saja !

const ArchivePage = ({ searchTerm, setSearchTerm }) => {
  const { loading, deleteNote, unarchiveNote, archivedNotes } = useNotes();
  const [localNotes, setLocalNotes] = useState([]); //array kosong awalnya

  //initial syncronize note
  useEffect(() => {
    if (!loading) {
      setLocalNotes(archivedNotes || []);
    }
  }, [archivedNotes, loading]);

  //handleDelete
  const handleDelete = async (id) => {
    if (window.confirm("delete this archive note??")) {
      await deleteNote(id);
    }
  };

  //handle un-archive
  const handleUnarchive = async (id) => {
    await unarchiveNote(id);
  };

  //filteredNotes base searachTerm title
  const filteredNotes = localNotes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Archive Notes </h2>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {/* smua id ada pada notelist */}
      {loading ? (
        <p>Loading archived Notes ..</p>
      ) : filteredNotes.length === 0 ? (
        <EmptyNotes isArchive={true} />
      ) : (
        <NoteList
          notes={filteredNotes}
          onDelete={handleDelete}
          onArchive={handleUnarchive}
        />
      )}

      <div className="homepage__action">
        <Link to="/notes/new" className="action">
          <FiPlus />
        </Link>
      </div>
    </div>
  );
};

export default ArchivePage;
