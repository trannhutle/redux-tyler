import API from "goals-todos-api"
export const ADD_TODO = "ADD_TODO";
export const REMOVE_TODO = "REMOVE_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";

// Start action creators
// Action creator means It is a object representation event.
function addTodo(todo) {
  return {
    type: ADD_TODO,
    todo
  };
}

function removeTodo(id) {
  return {
    type: REMOVE_TODO,
    id
  };
}

function toggleTodo(id) {
  return {
    type: TOGGLE_TODO,
    id
  };
}

export function handleAddTodo(name, cb) {
  return dispatch => {
    API.saveTodo(name)
      .then(todo => {
        dispatch(addTodo(todo));
        cb();
      })
      .catch(() => {
        alert("An error is occured. Try again!!!");
      });
  };
}

export function handleDeleteTodo(todo) {
  return dispatch => {
    dispatch(removeTodo(todo.id));
    return API.deleteTodo(todo.id).catch(() => {
      dispatch(addTodo(todo));
      alert("An error occured. Try again!!!");
    });
  };
}

export function handleToggleTodo(todo) {
  return dispatch => {
    dispatch(toggleTodo(todo.id));
    API.saveTodoToggle(todo.id).catch(() => {
      dispatch(toggleTodo(todo.id));
      alert("An error is occured. Try again!!!");
    });
  };
}
