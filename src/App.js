import React, { useEffect, useState } from 'react';
import './App.css';
import TodoList from './Todo/TodoList';
import Context from './Todo/context/context';
import { FirebaseState } from './Todo/context/firebase/firebaseState';
import axios from 'axios';

const url = 'https://todo-app-46d67-default-rtdb.firebaseio.com';
const userName = 'danila';

function App() {
  let [todos, setTodos] = useState([]);

  let testBd = () => {
    axios.post(`${url}/${userName}/todos.json`, {title: 'new todo 22', completed: false});
  }

  let testDelete = () => {
    axios.delete(`${url}/${userName}/todos.json`);
  }


  useEffect(()=> {
    axios.get(`${url}/${userName}/todos.json`).then(res => {
      try {
        setTodos(Object.entries(res.data));
        console.log('data upload:');
        todos.map((todo) => {console.log(todo)});
      } catch (error) {
        console.log('Отсутсвуют данные');
        console.log(todos.length);
      }
    });
  }, []);

  //Добавление todo
  let addTodo = (title) => {
    if (title) {
    let newTodo = ['', {title, completed: false}];
    let tmpTodos = todos.slice();
    axios.post(`${url}/${userName}/todos.json`, {title, completed: false}).then((res) => {
      newTodo[0] = Object.values(res.data).toString();
      tmpTodos.push(newTodo);
      setTodos(tmpTodos);
    }
    );
  } else {
      console.log('No title');
    }
  }

  //Удаление todo
  let todoRemove = (id) => {
    console.log('delete ' +  id);
    let tmpTodos = todos.slice();
    axios.delete(`${url}/${userName}/todos/${id}.json`).then(res => {
      tmpTodos = tmpTodos.filter((todo) => todo[0] !== id);
      console.log('todos without deleted ' + tmpTodos);
      setTodos(tmpTodos);
    }
    );
  }
  
  //Нажатие на todo
  let onToggle = (id) => {
    console.log(id);
    let tmpTodos = todos.slice();
    tmpTodos =  tmpTodos.filter(todo => todo[0] === id);
    tmpTodos[0][1].completed = !tmpTodos[0][1].completed;
    axios.patch(`${url}/${userName}/todos/${id}.json`, {completed: tmpTodos[0][1].completed}).then(res => {
      axios.get(`${url}/${userName}/todos.json`).then((res)=> {
        setTodos(Object.entries(res.data));
      }); 
    });
  }

  return (
    <FirebaseState>
      <Context.Provider value={{todoRemove, addTodo, todos, onToggle}}>
        <div className="todoApp">
          <div className={"left-block"}></div>
          <TodoList todos={todos} />
          <div className={"right-block"}></div>
        </div>
      </Context.Provider>
    </FirebaseState>
  );
}

export default App;
