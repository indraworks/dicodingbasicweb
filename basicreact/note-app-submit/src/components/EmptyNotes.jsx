import React from "react";
import PropTypes from "prop-types";

const EmptyNotes = ({ isArchive }) => {
  return (
    <div className="note-list-empty">
      <p>{isArchive ? "Arsip Kosong!" : "tidak ada catatan"}</p>
    </div>
  );
};

//EmptyNotes ada 2 default,bool dan  props = false
EmptyNotes.PropTypes = {
  isArchive: PropTypes.bool,
};
//defaultnya  false
EmptyNotes.defaultPropTypes = {
  isArchive: false,
};
export default EmptyNotes;
