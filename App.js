import React, { Component } from "react";
import Scratchpad from "./components/Scratchpad";
import TodoList from "./components/todo/TodoList";
import "./styles/style.css";
import BookmarkList from "./components/BookmarkList";
class App extends Component {
  render() {
    return (
      <div id="life-ui">
        <h1>Life UI</h1>
        <Scratchpad />
        <TodoList />
        <BookmarkList />
      </div>
    );
  }
}

export default App;
