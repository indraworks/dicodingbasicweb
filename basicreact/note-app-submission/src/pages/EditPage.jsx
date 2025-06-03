import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiCheck, FiX } from "react-icons/fi";
import { getNote, editNote } from "../utils/data";

const EditPage = () => {
  const [note, setNote] = useState(null);
  const { id } = useParams();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  //ambil awal state nilai field2 dari note dari id yg dituju
  //utk ditampilkan !
  useEffect(() => {
    const foundNote = getNote(id);
    if (foundNote) {
      setNote(foundNote);
      setTitle(foundNote.title);
      setBody(foundNote.body);
    }
  }, [id]);

  //handle !
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirm(true); //munculkan modal!
  };

  //handleCancel
  const handleCancel = () => {
    navigate(`/notes/${id}`);
  };

  //Save!

  const confirmSave = () => {
    editNote(id, title, body);
    navigate(`/notes/${id}`);
  };

  const cancelSave = () => {
    setShowConfirm(false);
  };

  if (!note) {
    return <p>Note not found!</p>;
  }

  //ini className pake atribute add page yg sudah ada
  return (
    <div className="add-new-page">
      <form onSubmit={handleSubmit} className="add-new-page__input">
        <input
          type="text"
          className="add-new-page__input__title"
          placeholder="note title ..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="add-new-page__input__body"
          placeholder="write your note here .."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          data-placeholder="Write your note here !"
        />

        <div className="add-new-page__action">
          <button
            type="button"
            className="action"
            title="Cancel"
            onClick={handleCancel}
            style={{ backgroundColor: "#ff4444" }}
          >
            <FiX />
          </button>

          <button
            type="submit"
            className="action"
            title="Save"
            style={{ backgroundColor: "#00c851" }}
          >
            <FiCheck />
          </button>
        </div>
      </form>
      {/* munculkan modal jika pilih submit! */}
      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Changes</h3>
            <p>Are you want to update this note ?</p>
            <div className="modal-actions">
              <button className="modal-button cancel" onClick={cancelSave}>
                Cancel
              </button>

              <button className="modal-button confirm" onClick={confirmSave}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditPage;
