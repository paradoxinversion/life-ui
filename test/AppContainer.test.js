const chai = require("chai");
const assert = require("assert");
const expect = chai.expect;
const should = chai.should();
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
import AppContainer from "../containers/AppContainer";
import { describe } from "mocha";

// ! None of these account for localStorage
describe("AppContainer", function() {
  let appContainer;
  const todoData = {
    type: "todo",
    list: [
      {
        id: "1571340531236JbcIM4JF",
        itemData: { text: "test1", isDone: false }
      },
      {
        id: "1571340532589hU0T0VQo",
        itemData: { text: "test2", isDone: false }
      },
      {
        id: "1571340534452NHsVevHb",
        itemData: { text: "test3", isDone: false }
      }
    ]
  };

  const bookmarkData = {
    type: "bookmarks",
    list: [
      { id: "1571344799188lQ8n4atj", itemData: "http://example.com" },
      {
        id: "15713448516535SA0VaNu",
        itemData: "https://www.paradoxinversion.com"
      },
      { id: "15713448516535SA0FaKe", itemData: "https://www.github.com" }
    ]
  };

  const arbitraryListData = {
    type: "random",
    list: [
      { id: "1", itemData: { challenge: "fight me" } },
      { id: "two", itemData: { whoYaGonnaCall: "Ghostbusters!" } }
    ]
  };

  describe("setList()", function() {
    beforeEach(function() {
      appContainer = new AppContainer();
    });

    it("Should set a list and data to AppContainer state by name (which is also its property)", async function() {
      return (await appContainer.setList(
        "random-stuff",
        arbitraryListData
      )).should.equal(arbitraryListData);
    });
  });

  describe("getList()", function() {
    beforeEach(async function() {
      appContainer = new AppContainer();
      await appContainer.setState({
        panels: { myList: { type: "wat", list: ["yay, a list!"] } }
      });
    });

    it("Should get a list by name (which is also its property)", async function() {
      return (await appContainer.getList("myList")).should.eql([
        "yay, a list!"
      ]);
    });
  });

  describe("updateListData()", function() {
    beforeEach(async function() {
      appContainer = new AppContainer();
      await appContainer.setState({
        panels: { myList: { type: "wat", list: ["yay, a list!"] } }
      });
    });

    it("Should completely replace the contents of a list and save to localstorage", async function() {
      return (await appContainer.updateListData(
        "myList",
        arbitraryListData
      )).should.eql(arbitraryListData);
    });
  });

  describe("createListItem()", function() {
    beforeEach(async function() {
      appContainer = new AppContainer();
      await appContainer.setState({
        panels: { myList: { type: "wat", list: [] } }
      });
    });

    it("Should add a new item to the list and return the new list with that item", async function() {
      return (await appContainer.createListItem(
        "myList",
        "another list item!"
      )).should.have.length(1);
    });
  });

  describe("getListItemIndex", function() {
    before(async function() {
      appContainer = new AppContainer();
      await appContainer.setState({ panels: { todo: todoData } });
    });

    it("Should return the array index of a list item with the given ID", function() {
      return expect(
        appContainer.getListItemIndex("todo", "1571340534452NHsVevHb")
      ).to.eql(2);
    });
  });

  describe("moveListItemToEnd", () => {
    beforeEach(async function() {
      appContainer = new AppContainer();
      await appContainer.setState({ panels: { todo: todoData } });
    });
    context("toFront is true", function() {
      it("moves a list item to the front of the array", async function() {
        await appContainer.moveListItemToEnd(
          "todo",
          "1571340534452NHsVevHb",
          true
        );
        return expect(appContainer.state.panels.todo.list[0].id).to.eql(
          "1571340534452NHsVevHb"
        );
      });
    });
    context("toFront is false", function() {
      it("moves a list item to the back of the array", async function() {
        await appContainer.moveListItemToEnd(
          "todo",
          "1571340531236JbcIM4JF",
          false
        );
        return expect(appContainer.state.panels.todo.list[2].id).to.eql(
          "1571340531236JbcIM4JF"
        );
      });
    });
  });

  describe("tradeListItemPosition()", function() {
    beforeEach(async function() {
      appContainer = new AppContainer();
      await appContainer.setState({ panels: { todo: todoData } });
    });

    it("should trade a list item with another", async function() {
      const itemToMoveA = appContainer.state.panels.todo.list[0];
      await appContainer.tradeListItemPosition("todo", itemToMoveA.id, 1);
      return expect(appContainer.state.panels.todo.list[1]).to.eql(itemToMoveA);
    });
  });

  describe("removeListItem()", function() {
    beforeEach(async function() {
      appContainer = new AppContainer();
      // await appContainer.setState({ todo: todoData });
      await appContainer.setState({ panels: { todo: todoData } });
    });

    it("should remove a single list item by id", async function() {
      return false;
    });
  });

  describe("setUserName()", function() {
    it("Should change the name field of the user object", async function() {
      return (await appContainer.setUserName("jedai")).should.eql({
        name: "jedai"
      });
    });
  });
});
