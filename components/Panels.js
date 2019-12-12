import React from "react";
import connect from "unstated-connect"
import AppContainer from "../containers/AppContainer";
class PanelsSettings extends React.Component {
  state = {
    panelAdd : {
      "panel-name" : "",
      "panel-type" : "scratchpad"
    }
  }

  handleChanfe = (e) => {

  }
  render() {
    const [AppContainer] = this.props.containers;
    return (
      <div>
        <h2>Panels</h2>
        {/* Add panels with this form */}
        <form>
          <label htmlFor="panel-name">Panel Name</label>
          <input type="text" name="panel-name" id="panel-name" value={this.state.panelAdd["panel-name"]}/>
          <label htmlFor="panel-type">Panel Type</label>
          <select name="panel-type" id="panel-type">
            <option value="scratchpad">Scratchpad</option>
            <option value="todo-list">Todo List</option>
            <option value="bookmarks-list">Bookmark List</option>
          </select>
          <button onClick={()=>{
            AppContainer.addPanel()
          }}>Add</button>
        </form>

        <p>Panels here</p>
      </div>
    );
  }
}

export default connect([AppContainer])(PanelsSettings);
