import React, { useState } from "react";
import connect from "unstated-connect";
import AppContainer from "../containers/AppContainer";

function PanelsSettings(props) {
  const [AppContainer] = props.containers;
  const [formData, setFormData] = useState({ panelName: "", panelType: "" });
  return (
    <div>
      <h2>Panels</h2>
      {/* Add panels with this form */}
      <form>
        <label htmlFor="panelName">Panel Name</label>
        <input
          type="text"
          name="panelName"
          id="panelName"
          value={formData["panelName"]}
          onChange={e => {
            setFormData({
              ...formData,
              panelName: e.target.value
            });
          }}
        />
        <label htmlFor="panelType">Panel Type</label>
        <select
          name="panelType"
          id="panelType"
          onChange={e => {
            setFormData({
              ...formData,
              panelType: e.target.value
            });
          }}>
          <option value="scratchpad">Scratchpad</option>
          <option value="todo-list">Todo List</option>
          <option value="bookmarks-list">Bookmark List</option>
        </select>
        <button
          onClick={e => {
            e.preventDefault();
            AppContainer.addPanel(formData.panelName, formData.panelType);
          }}>
          Add
        </button>
      </form>

      <p>Panels here</p>
    </div>
  );
}

export default connect([AppContainer])(PanelsSettings);
