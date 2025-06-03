import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FiArchive, FiTrash2 } from "react-icons/fi";

const NoteItem = ({ id, title, createdAt, body, onDelete, onArchive }) => {
  //ini adalah field perobjectbta notes per-id based!
  //tiap noteItem ada utk delete atau taruh diarchive /tidak active
  //onDelete dan onArchive adala props func dari NoteList ! yg pasing di anak component (NoteItem)!

  return (
    <div className="note-item">
      <h3 className="note-item__title">
        <Link to={`/notes/${id}`}>{title}</Link>
      </h3>
      <p className="note-item__createdAt">
        {new Date(createdAt).toLocaleString()}
      </p>
      <p className="note-item__body">{body}</p>
      {/* action utk delete atau archive  */}
      <div className="note-item__action">
        <button
          className="action"
          onClick={() => onDelete(id)}
          title="Delete"
          aria-label="Delete note"
          style={{ width: "35px", height: "35px" }}
        >
          <FiTrash2 width={15} />
        </button>

        <div style={{ marginLeft: 25 }}>
          <button
            className="action"
            onClick={() => onArchive(id)}
            title="Archive"
            style={{ width: "35px", height: "35px" }}
            aria-label="Archive note"
          >
            <FiArchive width={"20px"} />
          </button>
        </div>
      </div>
    </div>
  );
};

NoteItem.PropTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default NoteItem;
