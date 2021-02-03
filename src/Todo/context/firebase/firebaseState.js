import axios from 'axios';
import React, { useReducer } from 'react';
import { REMOVE_TODO } from '../types';
import { FirebaseContext } from './firebaseContext';
import { firebaseReduser } from './firebaseReduser'; 

const url = 'https://todo-91b27-default-rtdb.firebaseio.com';
 
export const FirebaseState = ({children}) => {
    const initialState = {
        todos: [{id: 1, title: 'task1', completed: false}, {id: 2, title: 'task2', completed: false}]
    }
    const [state, dispatch] = useReducer(firebaseReduser, initialState)

    const showTodos = async () => {
        const res = await axios.get(`${url}/todos.json`);
        console.log(res);
    }

    const addTodo = async title => {
        const todo = {
            title
        }

        const res = await axios.post(`${url}/todos.json`, todo)
        console.log(res);
    }

    const removeTodo = async id => {
        await axios.delete(`${url}/todos/${id}.json`);
        dispatch({type: REMOVE_TODO, payload: id});
    }

    return(
        <FirebaseContext.Provider value={{showTodos, addTodo, removeTodo, todos: state.todos}}>
            {children}
        </FirebaseContext.Provider>
    );
}