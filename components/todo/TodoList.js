import React, { Component } from "react";
import connect from "unstated-connect";
import store from "store";
import AppContainer from "../../containers/AppContainer";
import TodoEntry from "./TodoEntry";
import { ToDoData } from "../../objects/objects";

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newTodoText: ""
    };
  }
  componentDidMount() {
    const todoListData = store.get("todo");
    if (todoListData) {
      const [AppContainer] = this.props.containers;
      AppContainer.setList("todo", todoListData);
    }
  }

  handleChange = e => {
    this.setState({
      newTodoText: e.target.value
    });
  };

  addTodo = e => {
    e.preventDefault();
    const [AppContainer] = this.props.containers;
    const todoItem = new ToDoData(this.state.newTodoText);
    AppContainer.createListItem("todo", todoItem);
    const todoInput = document.getElementById("todo-input");
    todoInput.value = "";
  };
  render() {
    const [AppContainer] = this.props.containers;
    const todoItems = AppContainer.getList("todo");
    return (
      <section id="section-todo-list">
        <h2>Todo</h2>
        <form onSubmit={this.addTodo}>
          <input
            id="todo-input"
            className="border"
            onChange={this.handleChange}
            type="text"
          />
          <input
            id="todo-submit"
            className="border"
            type="button"
            value="Add"
            onClick={async e => await this.addTodo(e)}
          />
        </form>
        {todoItems.map(todoItem => {
          return (
            <TodoEntry
              key={`td-${todoItem.id}`}
              entry={todoItem}
              todo={todoItem}
            />
          );
        })}
      </section>
    );
  }
}

export default connect([AppContainer])(TodoList);