function createStore(reducer) {
  // The store shoudl have four parts
  //1. The state
  //2. Get the state
  //3. Listen to changes on the state
  //4. Update the state
  let state;
  let listeners = [];

  const getState = () => state;

  const subscribe = listener => {
    // Add a new listener
    listeners.push(listener);
    // Unsubscribe listners
    return () => {
      listeners = listeners.filter(l => l != listener);
    };
  };

  const dispatch = action => {
    // dispatch the reducer. we will get the brand new state after invoke the reducer
    state = reducer(state, action);
    // Trigger listeners
    listeners.forEach(listener => listener());
  };

  return {
    getState,
    subscribe,
    dispatch
  };
}

const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const ADD_GOAL = "ADD_GOAL";
const REMOVE_GOAL = "REMOVE_GOAL";

// Start action creators
function addTodoAction(todo) {
  return {
    type: ADD_TODO,
    goal
  };
}

function removeTodoAction(id) {
  return {
    type: REMOVE_TODO,
    id
  };
}

function toggleTodoAction(id) {
  return {
    type: TOGGLE_TODO,
    id
  };
}

function addGoalAction(goal) {
  return {
    type: ADD_GOAL,
    goal
  };
}
function removeGoalAction(id) {
  return {
    type: REMOVE_GOAL,
    id
  };
}
// End action creator

//Start reducer functions (pure function)
/* 
Characateristic of a Pure function:
1) They always return the same result if the same arguments are passed in
2) They depend on the arguments passed into them
3) Never produce any side effects.  
*/
function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.todo]);
    case REMOVE_TODO:
      return state.filter(todo => todo.id !== action.id);
    case TOGGLE_TODO:
      /* 
      The Object.assign(#1: to_object, #2: from_object, #3: override_attributes )
      */
      return state.map(todo =>
        todo.id !== action.id
          ? todo
          : Object.assign({}, todo, { complete: !todo.complete })
      );
    default:
      return state;
  }
}

function goals(state = [], action) {
  switch (action.type) {
    case ADD_GOAL:
      return state.concat([action.goal]);
    case REMOVE_GOAL:
      return state.filter(goal => goal.id !== action.id);
    default:
      return state;
  }
}
/* 
End reducer functions
*/

function app(state = {}, action) {
  return {
    totos: todos(state.todos, action),
    goals: goals(state.goals, action)
  };
}

const store = createStore(app);
store.subscribe(() => {
  console.log("The new state is: ", store.getState());
});

store.dispatch(
  addTodoAction({
    id: 0,
    name: "Walk the dog",
    complete: false
  })
);

store.dispatch(
  addTodoAction({
    id: 1,
    name: "Wash the car",
    complete: false
  })
);

store.dispatch(
  addTodoAction({
    id: 2,
    name: "Go to the gym",
    complete: true
  })
);

store.dispatch(removeTodoAction(1));

store.dispatch(toggleTodoAction(0));

store.dispatch(
  addGoalAction({
    id: 0,
    name: "Learn Redux"
  })
);

store.dispatch(
  addGoalAction({
    id: 1,
    name: "Lose 20 pounds"
  })
);

store.dispatch(removeGoalAction(0));
