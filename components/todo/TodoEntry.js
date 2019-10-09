import React, { Component, Fragment } from "react";
import connect from "unstated-connect";
import AppContainer from "../../containers/AppContainer";
class TodoEntry extends Component {
  state = {
    editable: false,
    text: this.props.entry.itemData.text,
    isDone: this.props.entry.itemData.isDone,
    todo: this.props.todo
  };
  handleChange = e => {
    const target = e.target;
    const name = target.name;
    let value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({
      [name]: value
    });
  };

  setIsDone(isDone) {
    const [AppContainer] = this.props.containers;
    const todo = this.state.todo;
    todo.itemData.isDone = isDone;
    AppContainer.editListItem("todo", todo.id, todo.itemData);
  }

  renderTodo() {
    return (
      <Fragment>
        <p className="inline">{this.props.todo.itemData.text}</p>
        <button
          onClick={() => {
            this.setState({
              editable: true
            });
          }}
        >
          Edit
        </button>
      </Fragment>
    );
  }

  renderTodoEdit() {
    const [AppContainer] = this.props.containers;
    return (
      <Fragment>
        <button
          onClick={() => {
            console.log({
              ...this.props.todo.itemData,
              text: this.state.text,
              isDone: this.state.isDone
            });
            console.log();
            AppContainer.editListItem("todo", this.props.todo.id, {
              ...this.props.todo.itemData,
              text: this.state.text,
              isDone: this.state.isDone
            });
            this.setState({
              editable: false
            });
          }}
        >
          Save
        </button>
        <input
          className="inline"
          type="text"
          name="text"
          onChange={this.handleChange}
          value={this.state.text}
        />
      </Fragment>
    );
  }
  render() {
    const [AppContainer] = this.props.containers;
    return (
      <div id={`todo-entry-${this.props.todo.id}`}>
        <input
          onChange={e => {
            console.log(e.target.checked);
            this.setIsDone(e.target.checked);
            this.handleChange(e);
          }}
          name="isDone"
          className="inline"
          type="checkbox"
          checked={this.state.isDone}
        />
        {this.state.editable ? this.renderTodoEdit() : this.renderTodo()}
        <button
          id={`todo-entry-delete-${this.props.todo.id}`}
          onClick={() => {
            AppContainer.removeListItem("todo", this.props.todo.id);
          }}
        >
          X
        </button>
      </div>
    );
  }
}

export default connect([AppContainer])(TodoEntry);
