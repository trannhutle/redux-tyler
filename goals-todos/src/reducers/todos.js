import {
    ADD_TODO,
    REMOVE_TODO,
    TOGGLE_TODO
} from "../actions/todos"

import{
    RECEIVE_DATA,
} from "../actions/shared"

// Characateristic of a Pure function:https://cdnjs.cloudflare.com/ajax/libs/redux/4.0.4/redux.min.js
// 1) They always return the same result if the same arguments are passed in
// 2) They depend on the arguments passed into them
// 3) Never produce any side effects.
export default function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.todo]);
    case REMOVE_TODO:
      return state.filter(todo => todo.id !== action.id);
    case TOGGLE_TODO:
      return state.map(todo =>
        todo.id !== action.id
          ? todo
          : Object.assign({}, todo, { complete: !todo.complete })
      );
    // The Object.assign(#1: to_object, #2: from_object, #3: override_attributes )
    case RECEIVE_DATA:
      return action.todos;
    default:
      return state;
  }
}
