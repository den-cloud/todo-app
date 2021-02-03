import { ADD_TODO, REMOVE_TODO, SHOW_TODO } from "../types";

const handlers = {
    [ADD_TODO]: (state, {payload})=> ({...state, todos: [...state.todos, payload]}),
    [SHOW_TODO]: (state, {payload}) => ({...state, notes: payload}),
    [REMOVE_TODO]: (state, {payload}) => ({...state, notes: state.notes.filter(todo => todo.id !== payload)}),
    DEFAULT: state=> state
}

export const firebaseReduser = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action);
}