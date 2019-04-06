import React from "react";
import "./style.css";

function Navbar(props) {
  return (
    <div className="container-fluid fixed-top">
      <nav className="navbar navbar-expand-lg">
        <a className="navbar-brand" href="/">
          Travel Clicky Game
        </a>
        <div className={props.navbarClass}>
          {props.status}
        </div>
        <div className="scores">
          Score: {props.score} | Top Score: {props.top_score}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
