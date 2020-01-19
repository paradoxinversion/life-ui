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
    AppContainer.editListItem(this.props.panel, todo.id, todo.itemData);
  }

  renderTodo() {
    return (
      <Fragment>
        {this.props.todo.itemData.isDone ? (
          <s className="inline">{this.props.todo.itemData.text}</s>
        ) : (
          <p className="inline">{this.props.todo.itemData.text}</p>
        )}
      </Fragment>
    );
  }

  renderTodoEdit() {
    const [AppContainer] = this.props.containers;
    return (
      <Fragment>
        <button
          className="border"
          onClick={() => {
            AppContainer.editListItem(this.props.panel, this.props.todo.id, {
              ...this.props.todo.itemData,
              text: this.state.text,
              isDone: this.state.isDone
            });
            this.setState({
              editable: false
            });
          }}>
          Save
        </button>
        <input
          className="inline border"
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
      <div id={`todo-entry-${this.props.todo.id}`} className="flex">
        <input
          onChange={e => {
            this.setIsDone(e.target.checked);
            this.handleChange(e);
            if (e.target.checked) {
              AppContainer.moveListItemToEnd(
                this.props.panel,
                this.props.todo.id,
                false
              );
            } else {
              AppContainer.moveListItemToEnd(
                this.props.panel,
                this.props.todo.id,
                true
              );
            }
          }}
          name="isDone"
          className="inline size--is--2rem"
          type="checkbox"
          checked={this.state.isDone}
        />
        <div id="todo-button-container">
          <div>
            <button
              id={`todo-entry-delete-${this.props.todo.id}`}
              className="border"
              onClick={() => {
                if (window.confirm("Delete Todo Item?")) {
                  AppContainer.removeListItem(
                    this.props.panel,
                    this.props.todo.id
                  );
                }
              }}>
              &#215;
            </button>
            {!this.props.todo.itemData.isDone && (
              <React.Fragment>
                <button
                  id={`todo-entry-up-${this.props.todo.id}`}
                  className="border"
                  onClick={() => {
                    const index = AppContainer.getListItemIndex(
                      this.props.panel,
                      this.props.todo.id
                    );
                    if (index === 0) {
                      return;
                    } else {
                      AppContainer.tradeListItemPosition(
                        this.props.panel,
                        this.props.todo.id,
                        index - 1
                      );
                    }
                  }}>
                  &#8593;
                </button>
                <button
                  id={`todo-entry-down-${this.props.todo.id}`}
                  className="border"
                  onClick={() => {
                    const index = AppContainer.getListItemIndex(
                      this.props.panel,
                      this.props.todo.id
                    );
                    if (
                      index ===
                      AppContainer.getList(this.props.panel).length - 1
                    ) {
                      return;
                    } else {
                      AppContainer.tradeListItemPosition(
                        this.props.panel,
                        this.props.todo.id,
                        index + 1
                      );
                    }
                  }}>
                  &#8595;
                </button>
                <button
                  className="border"
                  onClick={() => {
                    this.setState({
                      editable: true
                    });
                  }}>
                  Edit
                </button>
              </React.Fragment>
            )}
          </div>
          {this.state.editable ? this.renderTodoEdit() : this.renderTodo()}
        </div>
      </div>
    );
  }
}

export default connect([AppContainer])(TodoEntry);
