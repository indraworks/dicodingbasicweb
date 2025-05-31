import React, { useState } from "react";
import { useNavigate } from "react-router";
import { addNote } from "../utils/data";

export default function AddNotePage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    addNote({ title, body });
    navigate("/");
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
          ✔
        </button>
      </div>
    </form>
  );
}
