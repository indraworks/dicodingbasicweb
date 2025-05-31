// components/NoteList.js
import React from "react";
import NoteItem from "./NoteItem";

export default function NoteList({ notes, onDelete, onArchiveToggle }) {
  if (!notes.length) return <p>Tidak ada catatan</p>;
  return (
    <div className="note-list">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onDelete={onDelete}
          onArchiveToggle={onArchiveToggle}
        />
      ))}
    </div>
  );
}
