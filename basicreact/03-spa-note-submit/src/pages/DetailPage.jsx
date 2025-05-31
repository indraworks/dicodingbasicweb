import React from "react";
import { useParams, useNavigate } from "react-router";
import { getNote, deleteNote, archiveNote, unarchiveNote } from "../utils/data";

export default function DetailPage() {
  const { id } = useParams();
  const note = getNote(id);
  const navigate = useNavigate();

  if (!note) return <p>Catatan tidak ditemukan!</p>;

  const onDelete = () => {
    deleteNote(id);
    navigate("/");
  };

  const onToggleArchive = () => {
    note.archived ? unarchiveNote(id) : archiveNote(id);
    navigate("/");
  };

  return (
    <div className="detail-page">
      <h2 className="detail-page__title">{note.title}</h2>
      <p className="detail-page__createdAt">
        {new Date(note.createdAt).toLocaleString()}
      </p>
      <div className="detail-page__body">{note.body}</div>
      <div className="detail-page__action">
        <button className="action" onClick={onDelete}>
          🗑
        </button>
        <button className="action" onClick={onToggleArchive}>
          {note.archived ? "↩" : "📥"}
        </button>
      </div>
    </div>
  );
}
