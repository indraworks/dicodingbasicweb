import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import EmptyNotes from "./EmptyNotes";
import NoteItem from "./NoteItem";

const NoteList = ({ notes, onDelete, onArchive }) => {
  //agar updates notesnya

  if (notes.length === 0) {
    return <EmptyNotes />;
  }

  return (
    <div className="note-list">
      {notes.map((note) => (
        <NoteItem
          className="note-item"
          key={note.id}
          // id={note.id}
          // title={note.title}
          // createdAt={note.createdAt}
          // body={note.body}
          {...note}
          onDelete={onDelete}
          onArchive={onArchive}
        />
      ))}
    </div>
  );
};
//proptypesnya
NoteList.PropTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default NoteList;
