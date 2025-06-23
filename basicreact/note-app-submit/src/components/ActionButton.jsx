import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ActionButton = ({ to, onClick, icon, type }) => {
  if (to) {
    return (
      <Link to={to} className="action">
        {icon}
      </Link>
    );
  }

  return (
    <button type={type} className="action" onClick={onClick}>
      {icon}
    </button>
  );
};
//default props utk actionButton
ActionButton.defaultProps = {
  to: "",
  onClick: () => {},
  type: "button",
};

ActionButton.PropTypes = {
  to: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default ActionButton;
