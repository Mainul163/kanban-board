import React from "react";
import Card from "./newCard";

const NewColumn = (props) => {
  let cardField = React.createRef();
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const capitalizeFirstLetter = (string) => {
    return string.replace(string[0], string[0].toUpperCase());
  };
  console.log('props',props);
  return (
    <div
      className="column drag-and-drop"
      onDrop={(e) => props.onHandleDrop(e, props.name)}
      onDragOver={(e) => handleDragOver(e)}
      // onDragEnter={e => this.handleDragEnter(e)}
      // onDragLeave={e => this.handleDragLeave(e)}
    >
      <h4 className={[props.cardHeader, "column__header"].join(" ")}>
        {capitalizeFirstLetter(props.name)}
      </h4>
      {props.cards.map((card, index, arr) => {
        return (
          <Card
            parent={props.name}
            onClick={props.onNavClick}
            onCardBlur={props.onCardBlur}
            orientation={props.orientation}
            id={card.id}
            key={card.id}
            title={card.title}
            cardField={
              arr.length - 1 === index
                ? (textArea) => (cardField = textArea)
                : null
            } //set ref to child text area, pass as prop
          />
        );
      })}
    </div>
  );
};

export default NewColumn;
