import React, { Component, Fragment } from "react";
import connect from "unstated-connect";
import AppContainer from "../containers/AppContainer";
class Bookmark extends Component {
  state = {
    editing: false,
    href: this.props.bookmark.itemData
  };
  handleChange = e => {
    this.setState({
      href: e.target.value
    });
  };
  renderBookmark() {
    return (
      <Fragment>
        <a href={this.state.href} target="_blank">
          {this.state.href}
        </a>
        <button
          onClick={() => {
            this.setState({
              editing: true
            });
          }}
        >
          Edit
        </button>
      </Fragment>
    );
  }

  renderBookmarkEdit() {
    const [AppContainer] = this.props.containers;
    return (
      <Fragment>
        <button
          onClick={() => {
            AppContainer.editListItem(
              "bookmarks",
              this.props.bookmark.id,
              this.state.href
            );
            this.setState({
              editing: false
            });
          }}
        >
          Save
        </button>
        <button
          onClick={() => {
            this.setState({
              editing: false
            });
          }}
        >
          Cancel
        </button>
        <input
          className="inline"
          type="text"
          onChange={this.handleChange}
          value={this.state.href}
        />
      </Fragment>
    );
  }
  render() {
    const [AppContainer] = this.props.containers;
    return (
      <div>
        {this.state.editing ? this.renderBookmarkEdit() : this.renderBookmark()}
        <button
          onClick={() => {
            AppContainer.removeListItem("bookmarks", this.props.bookmark.id);
          }}
        >
          X
        </button>
      </div>
    );
  }
}

export default connect([AppContainer])(Bookmark);
