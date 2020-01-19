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
    bookmarks: [],
    settingsOpen: false,
    user: {
      name: null
    },
    panels: {
      // todo: {
      //   type: "todo",
      //   list: [],
      //   name: "Todo List"
      // },
      // bookmarks: { type: "bookmarks", list: [], name: "Boomark list" }
    }
  };
  async setUserName(userName) {
    const user = Object.assign({}, this.state.user);
    user.name = userName;
    await this.setState({
      user
    });
    store.set("user", this.state.user);
    return this.state.user;
  }

  async loadUser() {
    const user = store.get("user");
    if (user) {
      await this.setState({ user });
    }
    return this.state.user;
  }

  getUser() {
    return this.state.user;
  }
  /**
   * Sets whether or not the settings menu is currently open.
   * @param {*} isOpen
   */
  async setMenuStatus(isOpen) {
    await this.setState({
      settingsOpen: isOpen
    });
  }

  getMenuStatus() {
    return this.state.settingsOpen;
  }
  /**
   * Sets a the named list with the supplied data.
   * Use this for for initialization of lists.
   * @param {String} list - the name of the array list to set
   * @param {Array} listData - The array of list data to set
   * @returns {Array} the listData that was passed in
   */
  async setList(list, listData) {
    const panels = Object.assign({}, this.state.panels);
    if (!panels[list]) panels[list] = {};
    panels[list].list = listData;
    try {
      await this.setState({
        panels
      });
      return this.state.panels[list].list;
    } catch (e) {
      throw e;
    }
  }

  /**
   * Return a list by panelId.
   * @param {Int} list - The list to return
   * @returns {Array} - The list from the state
   */
  getList(panelId) {
    return this.state.panels[panelId].list;
  }
  /**
   * Updates a list with new data and stores it.
   * @param {String} list - The list to update
   * @param {Array} updatedList - The updated data array
   * @returns {Array} The modified list from state
   */
  async updateListData(list, updatedList) {
    try {
      await this.setList(list, updatedList);
      store.set(`lui-panel-data-${list}`, this.state.panels[list].list);
      return this.state.panels[list].list;
    } catch (e) {
      throw e;
    }
  }
  async updatePanelList(panel, updatedList) {
    try {
      // get this panel
      debugger;
      const panelData = this.state.panels[panel];
      // update its list w/ udpated version
      panelData.list = updatedList;
      // copy panels state to new obbj
      const panels = { ...this.state.panels, [panel]: panelData };
      // overwrite w/ updated panel
      await this.setState({ panels });
      this.storePanelData();
      return this.state.panels[panel].list;
    } catch (e) {
      throw e;
    }
  }
  /**
   * Adds a single list item to a panel and saves the panel data
   * @param {String} list - The list to add to
   * @param {Object} itemData - The data pertinent to the item to add
   */
  async createListItem(list, itemData) {
    try {
      debugger;
      const newEntry = new ListItem(getUID(), itemData);
      const updatedList = this.state.panels[list].list.concat(newEntry);
      // await this.updateListData(list, updatedList);
      await this.updatePanelList(list, updatedList);
      this.storePanelData();
      return this.state.panels[list].list;
    } catch (e) {
      throw e;
    }
  }

  getListItemIndex(list, id) {
    return this.state.panels[list].list.findIndex(el => el.id === id);
  }

  /**
   * Moves a specified list item from its index to the back
   * @param {*} list
   * @param {*} id
   */
  async moveListItemToEnd(list, id, toFront) {
    const listClone = this.state.panels[list].list.slice(0);
    const itemIndex = listClone.findIndex(el => el.id === id);
    const itemToMove = listClone[itemIndex];
    listClone.splice(itemIndex, 1);
    toFront ? listClone.unshift(itemToMove) : listClone.push(itemToMove);
    this.updatePanelList(list, listClone);
  }

  async tradeListItemPosition(list, id, newPosition) {
    if (newPosition < 0 || newPosition > this.state.panels[list].list.length) {
      console.log("New position was out of bounds");
      return;
    }
    const listClone = this.state.panels[list].list.splice(0);
    const initiatingItemIndex = listClone.findIndex(el => el.id === id);
    const initiatingItem = listClone[initiatingItemIndex];

    const tradePartner = listClone[newPosition];

    listClone[initiatingItemIndex] = tradePartner;
    listClone[newPosition] = initiatingItem;
    this.updatePanelList(list, listClone);
  }

  /**
   * Removes a single item from a specified list.
   * @param {String} list - The list from which to remove an entry
   * @param {String} id - the UID of the element to remove
   * @returns {Array} The modified list from state
   */
  async removeListItem(list, id) {
    const panels = Object.assign({}, this.state.panels);
    const updatedList = this.state.panels[list].list.filter(el => el.id !== id);
    panels[list].list = updatedList;
    console.log("check this if there are issues");
    // await this.setState({ panels});
    await this.updatePanelList(list, updatedList);
    return this.state.panels[list].list;
  }

  /**
   * Edits a list item by replacing it with an object with modified values.
   * @param {String} list - The list in which to edit an item
   * @param {String} id - The item to edit
   * @param {Object} itemData - The object with modified values to edit the list item
   * @returns {Object} The newly modified List from state
   */
  async editListItem(list, id, itemData) {
    debugger;
    const updatedList = this.state.panels[list].list.map(listItem => {
      if (listItem.id === id) {
        return {
          id: listItem.id,
          itemData
        };
      }
      return listItem;
    });
    await this.updatePanelList(list, updatedList);
    this.storePanelData();
    return this.state.panels[list].list;
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
    store.set("lui-panel-data-scratchpad", this.state.scratchpadData);
    return this.state.scratchpadData;
  }

  getStateData() {
    const data =
      "text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(this.state));
    return data;
  }

  getPanelsFromLocalStorage() {
    let panelData = {};
    store.each(function(value, key) {
      // console.log(key, "==", value);
      console.log(typeof value);
      try {
        if (typeof value == "string") panelData = JSON.parse(value);
      } catch (e) {
        console.log(e);
      }
    });
    console.log(panelData);
    this.setState({ panels: panelData });
    return panelData;
  }

  async addPanel(panelName, panelType) {
    const panel = { id: getUID(), type: panelType, list: [], name: panelName };

    const panels = Object.assign({}, this.state.panels);
    panels[panel.id] = panel;

    await this.setState({
      panels
    });
    this.storePanelData();
    return this.state.panels[panel];
  }

  storePanelData() {
    store.set(`lui-panel-data`, JSON.stringify(this.state.panels));
  }
}

// export default new AppContainer();
export default AppContainer;
