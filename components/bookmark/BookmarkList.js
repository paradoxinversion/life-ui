import React, { Component } from "react";
import connect from "unstated-connect";
import store from "store";
import AppContainer from "../../containers/AppContainer";
import Bookmark from "./Bookmark";

class BookmarkList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newBookmark: ""
    };
  }

  handleChange = e => {
    this.setState({
      newBookmark: e.target.value
    });
  };

  addBookmark = e => {
    e.preventDefault();
    const [AppContainer] = this.props.containers;
    AppContainer.createListItem(this.props.id, this.state.newBookmark);
    const bookmarkInput = document.getElementById(
      `bookmark-input-${this.props.id}`
    );
    bookmarkInput.value = "";
  };
  render() {
    const [AppContainer] = this.props.containers;
    const boomarkItems = AppContainer.getList(this.props.id);
    return (
      <section id="section-bookmarks">
        <h2>{this.props.name}</h2>
        <form onSubmit={this.addBookmark}>
          <input
            id={`bookmark-input-${this.props.id}`}
            className="border"
            onChange={this.handleChange}
            type="url"
            placeholder="http://"
          />
          <input
            className="border"
            type="button"
            value="Add"
            onClick={this.addBookmark}
          />
        </form>
        {boomarkItems.map(bookmarkItem => {
          return (
            <Bookmark
              panel={this.props.id}
              key={`td-${bookmarkItem.id}`}
              bookmark={bookmarkItem}
            />
          );
        })}
      </section>
    );
  }
}

export default connect([AppContainer])(BookmarkList);
