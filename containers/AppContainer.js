import { Container } from "unstated";
import store from "store";
import { getUID } from "../utilities";
import { ListItem } from "../objects/objects";

/**
 * Contains and handles all of the data for Life UI
 */
class AppContainer extends Container {
  state = {
    scratchpadData: "",
    todo: [],
    bookmarks: []
  };

  /**
   * Sets a the named list with the supplied data.
   * Use this for for initialization of lists.
   * @param {String} list - the name of the array list to set
   * @param {Array} listData - The array of list data to set
   * @returns {Array} the listData that was passed in
   */
  async setList(list, listData) {
    await this.setState({
      [list]: listData
    });
    return listData;
  }

  /**
   * Return a list by name.
   * @param {String} list - The list to return
   * @returns {Array} - The list from the state
   */
  getList(list) {
    return this.state[list];
  }

  /**
   * Updates a list with new data and stores it.
   * @param {String} list - The list to update
   * @param {Array} updatedList - The updated data array
   * @returns {Array} The modified list from state
   */
  async updateListData(list, updatedList) {
    await this.setState({
      [list]: updatedList
    });
    store.set(list, this.state[list]);
    return this.state.list;
  }

  /**
   * Adds a single list item and updates the listt
   * @param {String} list - The list to add to
   * @param {Object} itemData - The data pertinent to the item to add
   */
  async createListItem(list, itemData) {
    // const newEntry = {
    //   id: getUID(),
    //   itemData
    // };
    const newEntry = new ListItem(getUID(), itemData);
    const updatedList = this.state[list].concat(newEntry);
    await this.updateListData(list, updatedList);
    return this.state[list];
  }

  /**
   * Removes a single item from a specified list.
   * @param {String} list - The list from which to remove an entry
   * @param {String} id - the UID of the element to remove
   * @returns {Array} The modified list from state
   */
  async removeListItem(list, id) {
    const updatedList = this.state[list].filter(el => el.id !== id);
    await this.setState({ [list]: updatedList });
    await this.updateListData(list, updatedList);
    return this.state[list];
  }

  /**
   * Edits a list item by replacing it with an object with modified values.
   * @param {String} list - The list in which to edit an item
   * @param {String} id - The item to edit
   * @param {Object} itemData - The object with modified values to edit the list item
   * @returns {Object} The newly modified List from state
   */
  async editListItem(list, id, itemData) {
    const updatedList = this.state[list].map(listItem => {
      if (listItem.id === id) {
        return {
          id: listItem.id,
          itemData
        };
      }
      return listItem;
    });

    await this.setState({ [list]: updatedList });
    store.set(list, this.state[list]);
    return this.state[list];
  }

  /**
   * Saves scratchpad text to state and storage.
   * @param {String} updatedScratchpadData - New/updated scratchpad data
   * @returns {String} The scratchpad data (string)
   */
  async updateScratchpad(updatedScratchpadData) {
    await this.setState({
      scratchpadData: updatedScratchpadData
    });
    store.set("scratchpad", this.state.scratchpadData);
    return this.state.scratchpadData;
  }
}

export default new AppContainer();
