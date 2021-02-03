import React, { useContext, useState } from "react";
import Context from "../context/context";

let AddTodo = () => {
  let [newTodo, setNewTodo] = useState('');
  const {addTodo} = useContext(Context); 
  return(
    <div className="add-todo-block">
      <div className="add-todo"><input type="text" placeholder="new todo" 
        value={newTodo}
        onChange={(event) => {setNewTodo(event.target.value);}}
        onKeyDown={(key) => {
          if (key.keyCode === 13) {
            addTodo(newTodo);
            setNewTodo('');
          }
        }}
        />
      </div><div className="add-todo-btn"><button onClick={(event) => {addTodo(newTodo); setNewTodo('');}}>add</button></div>
    </div>
  );
}

export default AddTodo;

