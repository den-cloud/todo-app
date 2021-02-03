import React, { useContext } from 'react';
import TodoItem from './TodoItem/TodoItem';
import AddTodo from './AddTodo/AddTodo';
import Context from './context/context';

let TodoList = () => {
    const {todos} = useContext(Context);
    return (
    <div className="main">
      <AddTodo />
      Список задач:
      <ul>
        {   
          todos.length ?
          todos.map((todo) => {return <TodoItem todo={todo[1]} id={todo[0]} key={todo[0]}/>}) : 'No todos'
        }
      </ul>
    </div>
    );
}

export default TodoList;