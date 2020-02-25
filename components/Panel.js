import React from "react";
import BookmarkList from "./bookmark/BookmarkList";
import TodoList from "./todo/TodoList";
import Scratchpad from "./Scratchpad";

const panelTypes = {
  "bookmarks-list": BookmarkList,
  "todo-list": TodoList,
  scratchpad: Scratchpad
};

function Panel(props) {
  const PanelComponent = panelTypes[props.panel.type];
  return (
    <div>
      <p>{props.panel.name}</p>
      <PanelComponent id={props.panel.id} name={props.panel.name} />
    </div>
  );
}

export default Panel;
