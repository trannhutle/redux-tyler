import React from "react";
import { connect } from "react-redux";
import ConnectedTodos from "./Todos"
import ConnectedGoals from "./Goals"
import {
  handleFetchData
} from "../actions/shared"

class App extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleFetchData());
  }
  render() {
    const { loading } = this.props;
    if (loading === true) {
      return <h3>Loading</h3>;
    }
    return (
      <div>
        <ConnectedTodos />
        <ConnectedGoals />
      </div>
    );
  }
}
// Connect Render any component,
// passing component any data it needs, from the store.
export default connect(state => ({ loading: state.loading }))(App);
