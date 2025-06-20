import React, { useEffect, useState } from "react";
import { useNotes } from "../context/NotesContext";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import EmptyNotes from "../components/EmptyNotes";

const HomePage = ({ searchTerm, setSearchTerm }) => {
  //ambil funtion2 yg akan dipakai consumer dari NotesContext
  //hanya activeNotes saja yg state dari context
  const { activeNotes, loading, deleteNote, archiveNote } = useNotes();
  const [localNotes, setLocalNotes] = useState(activeNotes || []);

  //useEffect initla ambil data
  useEffect(() => {
    //jika http sudah gak delay bisa masukan data
    if (!loading) {
      setLocalNotes(activeNotes || []); //localNotes berisi activeNotes(state) yg berisi data dari getNotes func
    }
  }, [activeNotes, loading]);

  //hadnle delete dgn state yg sudah update
  const handleDelete = async (id) => {
    if (window.confirm("delete this note ??")) {
      await deleteNote(id);
    }
  };

  //handlearchiving sama!
  const handleArchive = async (id) => {
    await archiveNote(id);
  };

  //filteredNotes base searachTerm title
  const filteredNotes = localNotes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <>
        <h2>Active Notes</h2>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {loading ? (
          <p>Loading notes...</p>
        ) : filteredNotes.length === 0 ? (
          <div className="empty-state">
            <EmptyNotes />
            <Link to="/notes/new" className="add-note-button">
              <FiPlus /> Create Your First Note
            </Link>
          </div>
        ) : (
          <NoteList
            notes={filteredNotes}
            onDelete={handleDelete}
            onArchive={handleArchive}
          />
        )}

        {/* Floating action button */}
        <div className="homepage__action">
          <Link to="/notes/new" className="action">
            <FiPlus />
          </Link>
        </div>
      </>
    </>
  );
};

export default HomePage;
