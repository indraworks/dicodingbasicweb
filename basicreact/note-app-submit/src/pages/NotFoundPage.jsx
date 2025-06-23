import React from "react";
import { Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <h2>404 ---PAGE NOT FOUND </h2>
      <p>The Page You Are Looking For Doesnt Exist</p>
      <Link to="/" className="action">
        {" "}
        <FiHome />
        Back to Home{" "}
      </Link>
    </div>
  );
};

export default NotFoundPage;
