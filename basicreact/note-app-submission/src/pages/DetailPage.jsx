import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiTrash2, FiArchive, FiEdit } from "react-icons/fi";
import { getNote, deleteNote, archiveNote, unarchiveNote } from "../utils/data";

const DetailPage = () => {
  //useParams utk ambil id dari browser
  const { id } = useParams();
  const note = getNote(id); // ambil  id dari data.js  yg diselect

  const navigate = useNavigate();

  // Proper console logging
  console.log("Current note:", JSON.stringify(note, null, 2));

  if (!note) {
    return <p>Not found the Id!</p>;
  }

  //delete
  const handleDelete = () => {
    if (window.confirm("Are you want to delete this note?")) {
      deleteNote(id);
      navigate("/", { replace: true });
    }
    alert("Note deleted successfully!");
  };

  //put archive
  const handleArchive = () => {
    archiveNote(id);
    // window.location.href("/");
    navigate("/");
  };

  //put unArchive ( back to activeNote)
  const handleUnArchive = () => {
    unarchiveNote(id);
    //window.location.href("/archive");
    navigate("/archive");
  };
  const handleEdit = () => {
    console.log(`Navigating to: /notes/edit/${id}`);
    navigate(`/notes/edit/${id}`);
  };

  return (
    <div className="detail-page">
      <Link to={note.archived ? "/archive" : "/"} className="action">
        <FiArrowLeft />
      </Link>
      <h1 className="detail-page__title">{note.title}</h1>
      <p className="detail-page__createdAt">
        {new Date(note.createdAt).toLocaleString()}
      </p>
      <p className="detail-page__body">{note.body}</p>

      <div className="detail-page__action">
        <button
          className="action"
          title="Delete"
          onClick={handleDelete}
        ></button>
        <button className="action" title="Edit" onClick={handleEdit}>
          <FiEdit />
        </button>

        {/* <Link to={`/notes/edit/${id}`} className="action" title="Edit">
          
        </Link> */}
        {note.archived ? (
          <button
            className="action"
            title="Unarchive"
            onClick={handleUnArchive}
          >
            <FiArchive />
          </button>
        ) : (
          <button className="action" title="Archive" onClick={handleArchive}>
            {" "}
            <FiArchive />
          </button>
        )}
      </div>
    </div>
  );
};

export default DetailPage;
