import React from "react";
import BookmarkList from "./BookmarkList";
import TodoList from "./todo/TodoList";
import Scratchpad from "./Scratchpad";

const panelTypes = {
  bookmarks: BookmarkList,
  "todo-list": TodoList,
  scratchpad: Scratchpad
};

function Panel(props) {
  console.log(props.panel.type);
  const PanelComponent = panelTypes[props.panel.type];
  return (
    <div>
      <p>testo</p>
      <PanelComponent id={props.panel.id} />
    </div>
  );
}

export default Panel;
