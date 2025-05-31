import React, { useState } from "react";
import { getArchivedNotes } from "../utils/data";
import NoteItem from "../components/NoteItem";

export default function ArchivedPage() {
  const [notes] = useState(getArchivedNotes());

  return notes.length === 0 ? (
    <div className="notes-list-empty">
      <p>Arsip kosong</p>
    </div>
  ) : (
    <div className="notes-list">
      {notes.map((note) => (
        <NoteItem key={note.id} {...note} />
      ))}
    </div>
  );
}
