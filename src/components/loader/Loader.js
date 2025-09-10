import React from "react";
import "./Loader.css";

function Loader({ message = "Loading, please wait..." }) {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
}

export default Loader;
