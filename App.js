import React, { Component } from "react";
import Scratchpad from "./components/Scratchpad";
import TodoList from "./components/todo/TodoList";
import BookmarkList from "./components/BookmarkList";
import connect from "unstated-connect";
import store from "store";
import AppContainer from "./containers/AppContainer";
import "./styles/style.css";
import Settings from "./components/Settings";
import Panel from "./components/Panel";
class App extends Component {
  async componentDidMount() {
    const [AppContainer] = this.props.containers;

    AppContainer.loadUser();
    AppContainer.getPanelsFromLocalStorage();
    const todoListData = store.get("lui-panel-data-todo");

    if (todoListData) {
      const [AppContainer] = this.props.containers;
      await AppContainer.setList("todo", todoListData);
    }

    const bookmarkData = store.get("lui-panel-data-bookmarks");
    if (bookmarkData) {
      const [AppContainer] = this.props.containers;
      await AppContainer.setList("bookmarks", bookmarkData);
    }
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
                }}>
                Settings
              </button>
            </div>
            <Scratchpad />
            {Object.keys(AppContainer.state.panels).map(objectKey => {
              return (
                <div>
                  <Panel panel={AppContainer.state.panels[objectKey]} />
                </div>
              );
            })}
          </React.Fragment>
        ) : (
          <Settings />
        )}
      </div>
    );
  }
}

export default connect([AppContainer])(App);
