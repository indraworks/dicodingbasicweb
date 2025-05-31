import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { getNote, editNote } from "../utils/data";

export default function EditNotePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    const currentNote = getNote(id);
    if (currentNote) {
      setNote(currentNote);
      setTitle(currentNote.title);
      setBody(currentNote.body);
    }
  }, [id]);

  if (!note) return <p>Catatan tidak ditemukan!</p>;

  const onSubmit = (e) => {
    e.preventDefault();
    editNote({ id, title, body });
    navigate(`/notes/${id}`);
  };

  return (
    <form onSubmit={onSubmit} className="add-new-page__input">
      <input
        type="text"
        className="add-new-page__input__title"
        placeholder="Judul catatan..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="add-new-page__input__body"
        data-placeholder="Isi catatan..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <div className="add-new-page__action">
        <button className="action" type="submit">
          💾
        </button>
      </div>
    </form>
  );
}
