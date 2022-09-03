import React from "react";

const NewCard = (props) => {
  let card = { id: props.id, title: props.title };
  const handleKeyDown = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };
  const handleDragStart = (e, card, parent) => {
    card.previousParent = parent;
    e.dataTransfer.setData("text/plain", JSON.stringify(card));
  };
  return (
    <div
      className="card"
      draggable="true"
      onDragStart={(e) => handleDragStart(e, card, props.parent)}
    >
      <textarea
        draggable="false"
        ref={props.cardField} //this talks with parent to give parent access to ref
        className="card__field"
        placeholder={"Add a new title..."}
        defaultValue={props.title ? props.title : null}
        value={props.value}
        onKeyUp={handleKeyDown}
        onBlur={(event) => {
          props.onCardBlur(event, card, props.parent);
        }}
      />
    </div>
  );
};

export default NewCard;
