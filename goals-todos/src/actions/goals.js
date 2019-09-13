import API from "goals-todos-api";
export const ADD_GOAL = "ADD_GOAL";
export const REMOVE_GOAL = "REMOVE_GOAL";

function removeGoal(id) {
  return {
    type: REMOVE_GOAL,
    id
  };
}
function addGoal(goal) {
  return {
    type: ADD_GOAL,
    goal
  };
}

// This function work because it is passed to middleware [thunk]
// before it hook up the reducer. For using this one we have to add [thunk]
// to the middleware in store creation
export function handleDeleteGoal(goal) {
  // Delete server and catch exception. If there is an exception
  // add the goal again
  return dispatch => {
    dispatch(removeGoal(goal.id));
    API.deleteGoal(goal.id).catch(() => {
      dispatch(addGoal(goal));
      alert("An error is occured. Try again!!!");
    });
  };
}

export function handleAddGoal(name, cb) {
  return dispatch => {
    API.saveGoal(name)
      .then(goal => {
        dispatch(addGoal(goal));
        cb();
      })
      .catch(() => {
        alert("An error is occured. Try again!!!");
      });
  };
}
