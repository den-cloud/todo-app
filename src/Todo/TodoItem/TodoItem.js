import React, { useContext } from "react";
import Context from '../context/context';

let TodoItem = (props) => {
    const {todoRemove, onToggle} = useContext(Context);
    return (
        <div className={'todo-container'}>
            <label>
                <li className={"todo-li brd-" + (props.todo.completed ? 'green' : 'black')}>
                    <input type="checkbox" checked={props.todo.completed} onChange={()=> {onToggle(props.id);}}/>
                    <span className="todo-title">
                        <div className={"todo-completed " + (props.todo.completed ? 'todo-completed-true' : '')}></div>{props.todo.title}
                    </span>
                </li>
            </label>
            <span className="cls-btn" onClick={() => {todoRemove(props.id);}}> </span>  
        </div>  
          
        
    );
}

export default TodoItem;