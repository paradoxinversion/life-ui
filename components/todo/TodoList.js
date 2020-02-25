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

  handleChange = e => {
    this.setState({
      newTodoText: e.target.value
    });
  };

  addTodo = e => {
    e.preventDefault();
    const [AppContainer] = this.props.containers;
    const todoItem = new ToDoData(this.state.newTodoText);
    AppContainer.createListItem(this.props.id, todoItem);
    const todoInput = document.getElementById(`todo-input-${this.props.id}`);
    todoInput.value = "";
  };

  render() {
    const [AppContainer] = this.props.containers;
    const todoItems = AppContainer.getList(this.props.id);
    return (
      <section id="section-todo-list">
        <h2>{this.props.name}</h2>
        <form onSubmit={this.addTodo}>
          <input
            id={`todo-input-${this.props.id}`}
            className="border"
            onChange={this.handleChange}
            type="text"
          />
          <input
            id={`todo-submit-${this.props.id}`}
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
              panel={this.props.id}
            />
          );
        })}
      </section>
    );
  }
}

export default connect([AppContainer])(TodoList);
