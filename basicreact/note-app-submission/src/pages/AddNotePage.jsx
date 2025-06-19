import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiCheck } from "react-icons/fi";
import { useNotes } from "../context/NotesContext";

const AddNotePage = () => {
  //state title,body
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  const { createNotes } = useNotes();

  //const handleSubmit djalankan dari form lewat onSubmit
  //tapi ditriger dari button dimana typebutton adalah submit!

  const handleSubmit = async (e) => {
    e.preventDefault();
    // addNote({ title, body });
    const result = await createNotes({ title, body });
    if (!result.error) {
      navigate("/");
    }
  };

  return (
    <div className="add-new-page">
      <form onSubmit={handleSubmit} className="add-new-page__input">
        <input
          type="text"
          className="add-new-page__input__title"
          placeholder="Note title.."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="add-new-page__input__body"
          placeholder="write your note here .."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          data-placeholder="Write your note here"
        />
        <div className="add-new-page__action">
          <button type="submit" className="action " title="Save">
            <FiCheck />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNotePage;
