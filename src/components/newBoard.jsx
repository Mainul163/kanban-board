import React, { useState, useEffect, CSSProperties } from "react";
import HashLoader from "react-spinners/HashLoader";
import Column from "./newColumn";
import axios from "axios";

const NewBoard = () => {
  const [pending, setPending] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [order, setOrder] = useState(["pending", "inProgress", "done"]);
  const [inputText, setInputText] = useState("");
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#36d7b7");
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  const onHandleDrop = (e, cardHeader) => {
    e.preventDefault();
    e.stopPropagation();
    let data = JSON.parse(e.dataTransfer.getData("text"));

    if (data.previousParent !== cardHeader) {
      //Prevent cards from being duplicated in a column

      if (data.previousParent === "inProgress") {
        axios
          .delete(`https://obscure-sierra-89518.herokuapp.com/kanbanboard/inprogress/${data?.id}`)
          .then((res) => res.data)
          .catch((error) => console.log(error));
        setInProgress(inProgress.filter((item) => item.id !== data.id));
      } else if (data.previousParent === "pending") {
        axios
          .delete(`https://obscure-sierra-89518.herokuapp.com/kanbanboard/${data?.id}`)
          .then((res) => res.data)
          .catch((error) => console.log(error));
        setPending(pending.filter((item) => item.id !== data.id));
      } else if (data.previousParent === "done") {
        axios
          .delete(`https://obscure-sierra-89518.herokuapp.com/done/${data?.id}`)
          .then((res) => res.data)
          .catch((error) => console.log(error));
        setCompleted(completed.filter((item) => item.id !== data.id));
      }

      if (cardHeader === "pending") {
        axios
          .post("https://obscure-sierra-89518.herokuapp.com/kanbanboard", data)
          .then((res) => res.data)
          .catch((error) => console.log(error));
        setPending(pending.concat(data));
      } else if (cardHeader === "inProgress") {
        axios
          .post("https://obscure-sierra-89518.herokuapp.com/kanbanboard/inprogress", data)
          .then((res) => res.data)
          .catch((error) => console.log(error));
        setInProgress(inProgress.concat(data));
      } else if (cardHeader === "done") {
        axios
          .post("https://obscure-sierra-89518.herokuapp.com/kanbanboard/done", data)
          .then((res) => res.data)
          .catch((error) => console.log(error));
        setCompleted(completed.concat(data));
      }
    }
  };

  const onNavClick = (event, card, parentCategory) => {};

  const submission = async (e) => {
    e.preventDefault();

  
    let maxNumber = 45563000;
    let randomNumber = Math.floor(Math.random() * maxNumber + 1);

    const task = { id: randomNumber + 1, title: inputText };

    if (task.title === "") {
      alert("please fill up the input field");
    } else {
      const taskInput = task;
      await axios
        .post("https://obscure-sierra-89518.herokuapp.com/kanbanboard", taskInput)
        .then((res) => res.data)
        .catch((error) => console.log(error));
    }
    setInputText("");
  };
  const onCardBlur = (event, card, parent) => {
    // console.log("event, card, parent==>", event, card, parent);
  };

  useEffect(() => {
    const readData = async () => {
      const pendingData = await axios
        .get("https://obscure-sierra-89518.herokuapp.com/kanbanboard")
        .then((res) => res.data)
        .catch((error) => console.log(error));
      const inprogressData = await axios
        .get("https://obscure-sierra-89518.herokuapp.com/kanbanboard/inprogress")
        .then((res) => res.data)
        .catch((error) => console.log(error));

      const done = await axios
        .get("https://obscure-sierra-89518.herokuapp.com/kanbanboard/done")
        .then((res) => res.data)
        .catch((error) => console.log(error));

      setPending(pendingData);
      setInProgress(inprogressData);
      setCompleted(done);
    };
    readData();
  }, [inputText]);
  console.log(pending.length,inProgress,completed);
  return (
    <div style={{ marginTop: "40px" }}>
      <div style={{ textAlign: "center" }}>
        <form onSubmit={submission}>
          <input
            type="text"
            value={inputText}
            placeholder={"Enter task..."}
            onChange={(event) => setInputText(event.target.value)}
            autoFocus
            style={{ padding: "10px 20px" }}
          />

          <button
            type="submit"
            style={{ padding: "10px 20px", marginLeft: "10px" }}
          >
            Add
          </button>
        </form>
      </div>
      {
        pending.length === 0 && inProgress.length === 0 && completed.length === 0 ? 
     <div style={{marginTop:"180px"}}> <HashLoader color={color} loading={loading} cssOverride={override} size={150} /> <br /> <h1 style={{textAlign:"center",color:"#36d7b7"}}>Loading....</h1></div>:<>
      
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
      
      
      </>
      }
    
    </div>
  );
};

export default NewBoard;
