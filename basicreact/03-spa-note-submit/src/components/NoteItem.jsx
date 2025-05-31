import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";

export default function NoteItem({ id, title, createdAt, body }) {
  return (
    <Link to={`/notes/${id}`} className="note-item">
      <h3 className="note-item__title">{title}</h3>
      <p className="note-item__createdAt">
        {new Date(createdAt).toLocaleString()}
      </p>
      <div className="note-item__body">{body}</div>
    </Link>
  );
}
NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};
