import React, { Component } from "react";
import Scratchpad from "./components/Scratchpad";
import TodoList from "./components/todo/TodoList";
import BookmarkList from "./components/BookmarkList";
import connect from "unstated-connect";
import AppContainer from "./containers/AppContainer";
import "./styles/style.css";
import Settings from "./components/Settings";
class App extends Component {
  componentDidMount() {
    const [AppContainer] = this.props.containers;
    AppContainer.loadUser();
  }

  render() {
    const [AppContainer] = this.props.containers;
    return (
      <div id="life-ui">
        <h1>Life UI</h1>
        {AppContainer.state.user.name && (
          <p>Welcome, {AppContainer.state.user.name}</p>
        )}
        {!AppContainer.getMenuStatus() ? (
          <React.Fragment>
            <div>
              <button
                className="border"
                onClick={() => {
                  AppContainer.setMenuStatus(true);
                }}
              >
                Settings
              </button>
            </div>
            <Scratchpad />
            <TodoList />
            <BookmarkList />
          </React.Fragment>
        ) : (
          <Settings />
        )}
      </div>
    );
  }
}

export default connect([AppContainer])(App);
