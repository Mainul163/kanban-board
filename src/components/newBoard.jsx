import React, { useState ,useEffect} from "react";

import Column from "./newColumn";
import axios from 'axios';

const NewBoard = () => {
  const [pending, setPending] = useState([
   
  ]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [order, setOrder] = useState(["pending", "inProgress", "completed"]);
  const [inputText, setInputText] = useState("");

  const onHandleDrop = (e, cardHeader) => {
    e.preventDefault();
    e.stopPropagation();
    var data = JSON.parse(e.dataTransfer.getData("text"));
    console.log("dropped", data, cardHeader,inProgress);
    if (data.previousParent !== cardHeader) {
      //Prevent cards from being duplicated in a column

      if (data.previousParent === "inProgress") {
        setInProgress(inProgress.filter((item) => item.id !== data.id));
      } else if (data.previousParent === "pending") {
        setPending(pending.filter((item) => item.id !== data.id));
      } else if (data.previousParent === "completed") {
        setCompleted(completed.filter((item) => item.id !== data.id));
      }

      if (cardHeader === "pending") {
        setPending(pending.concat(data));
      } else if (cardHeader === "inProgress") {
        setInProgress(inProgress.concat(data));
      } else if (cardHeader === "completed") {
        setCompleted(completed.concat(data));
      }
    }
  };

  const onNavClick = (event, card, parentCategory) => {};
 
  const submission = async (e) => {
    e.preventDefault();
    // let tempPending = [...pending];
    // tempPending.push({ id: tempPending.length + 1, title: inputText });
    // setPending(tempPending);
    // setInputText("");
    const task = { id: pending.length + 1, title: inputText };

    const taskInput =  task ;
    await axios
      .post("http://localhost:5000/kanbanboard", taskInput)
      .then((res) => res.data)
      .catch((error) => console.log(error));
  };
  const onCardBlur = (event, card, parent) => {
    console.log("event, card, parent==>", event, card, parent);
  };

useEffect(()=>{


  
  const readData = async () => {
    const data = await axios.get("http://localhost:5000/kanbanboard").then(res=>res.data).catch(error=>console.log(error))
    setPending(data);
  }
  readData()


},[])

  return (
    <div style={{marginTop:'40px'}}>
      <div style={{textAlign:'center'}}>
        <form onSubmit={submission}>
          <input
            type="text"
            value={inputText}
            placeholder={"Enter task..."}
            onChange={(event) => setInputText(event.target.value)}
            autoFocus
            style={{padding:"10px 20px"}}
          />
          
            <button type="submit" style={{padding:"10px 20px",marginLeft:'10px'}}>Add</button>
         
        </form>
      </div>

      <div className="board">
        <Column
          onHandleDrop={onHandleDrop}
          onNavClick={onNavClick}
          orientation={"left"}
          cards={pending}
          onClick={() => this.onClick(order[0])}
          onCardBlur={onCardBlur}
          cardHeader={"dark"}
          name={order[0]}
        ></Column>
        <Column
          onHandleDrop={onHandleDrop}
          onNavClick={onNavClick}
          cards={inProgress}
          onClick={() => this.onClick(order[1])}
          onCardBlur={onCardBlur}
          cardHeader={"dark"}
          name={order[1]}
        ></Column>
        <Column
          onHandleDrop={onHandleDrop}
          onNavClick={onNavClick}
          cards={completed}
          onClick={() => this.onClick(order[2])}
          onCardBlur={onCardBlur}
          cardHeader={"dark"}
          name={order[2]}
        ></Column>
      </div>
    </div>
  );
};

export default NewBoard;
