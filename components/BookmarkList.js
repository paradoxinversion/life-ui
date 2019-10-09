import React, { Component } from "react";
import connect from "unstated-connect";
import store from "store";
import AppContainer from "../containers/AppContainer";
import Bookmark from "./Bookmark";

class BookmarkList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newBookmark: ""
    };
  }
  componentDidMount() {
    const bookmarkData = store.get("bookmarks");
    if (bookmarkData) {
      const [AppContainer] = this.props.containers;
      AppContainer.setList("bookmarks", bookmarkData);
    }
  }

  handleChange = e => {
    this.setState({
      newBookmark: e.target.value
    });
  };

  addBookmark = e => {
    e.preventDefault();
    const [AppContainer] = this.props.containers;
    AppContainer.createListItem("bookmarks", this.state.newBookmark);
    const bookmarkInput = document.getElementById("bookmark-input");
    bookmarkInput.value = "";
  };
  render() {
    const [AppContainer] = this.props.containers;
    const boomarkItems = AppContainer.getList("bookmarks");
    return (
      <section id="section-bookmarks">
        <h2>Bookmarks</h2>
        <form onSubmit={this.addBookmark}>
          <input
            id="bookmark-input"
            onChange={this.handleChange}
            type="url"
            placeholder="http://"
          />
          <input type="button" value="Add" onClick={this.addBookmark} />
        </form>
        {boomarkItems.map(bookmarkItem => {
          return (
            <Bookmark key={`td-${bookmarkItem.id}`} bookmark={bookmarkItem} />
          );
        })}
      </section>
    );
  }
}

export default connect([AppContainer])(BookmarkList);
