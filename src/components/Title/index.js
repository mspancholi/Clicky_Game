import React from "react";
import "./style.css";

function Title(props) {
  return (
    <header className="myHeader">
     <h1>{props.title}</h1>
     <h2>{props.instructions}</h2>
    </header>
  );
}

export default Title;
