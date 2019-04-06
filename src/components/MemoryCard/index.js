import React from "react";
import "./style.css";

function MemoryCard(props) {
  return (
    <div className="card">
      <div className="img-container">
        <img alt={props.name} src={props.image} onClick={() => props.shuffleMemory(props)} />
      </div>
    </div>
  );
}

export default MemoryCard;
