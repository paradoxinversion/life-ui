import React from "react";
import connect from "unstated-connect";
import AppContainer from "../containers/AppContainer";
import PanelsSettings from "./Panels";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleInput = this.handleInput.bind(this);
  }
  componentDidMount() {
    const [AppContainer] = this.props.containers;
    this.setState({
      ["settings-user-input"]: AppContainer.getUser().name
    });
  }

  handleInput(e) {
    const target = e.target;
    this.setState({
      [target.name]: target.value
    });
  }
  render() {
    const [AppContainer] = this.props.containers;
    return (
      <div>
        <h1>Settings</h1>
        <button
          className="border"
          onClick={e => {
            e.preventDefault();
            AppContainer.setMenuStatus(false);
          }}>
          Exit
        </button>
        <div>
          <label htmlFor="settings-user-input">User</label>
          <input
            className="border"
            type="text"
            id="settings-user-input"
            name="settings-user-input"
            placeholder="Your Name"
            onChange={this.handleInput}
            value={this.state["settings-user-input"]}
          />
          <button
            className="border"
            onClick={() => {
              AppContainer.setUserName(this.state["settings-user-input"]);
            }}>
            Save
          </button>
        </div>
        <PanelsSettings />
        <a
          className="block"
          href={`data:${AppContainer.getStateData()}`}
          download="lifeui.json">
          Download LifeUI Data
        </a>
      </div>
    );
  }
}

export default connect([AppContainer])(Settings);
