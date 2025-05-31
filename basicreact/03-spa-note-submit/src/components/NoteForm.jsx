// components/NoteForm.js
import React from "react";

export default function NoteForm({
  title,
  body,
  onTitleChange,
  onBodyChange,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit} className="add-new-page__input">
      <input
        type="text"
        className="add-new-page__input__title"
        placeholder="Judul catatan..."
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
      />
      <textarea
        className="add-new-page__input__body"
        data-placeholder="Isi catatan..."
        value={body}
        onChange={(e) => onBodyChange(e.target.value)}
      />
      <div className="add-new-page__action">
        <button className="action" type="submit">
          💾
        </button>
      </div>
    </form>
  );
}
