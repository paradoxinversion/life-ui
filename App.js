import React, { Component } from "react";
import connect from "unstated-connect";
import AppContainer from "./containers/AppContainer";
import "./styles/style.css";
import Settings from "./components/Settings";
import Panel from "./components/Panel";
class App extends Component {
  async componentDidMount() {
    const [AppContainer] = this.props.containers;

    AppContainer.loadUser();
    AppContainer.getPanelsFromLocalStorage();
  }

  render() {
    const [AppContainer] = this.props.containers;
    return (
      <div id="life-ui">
        <h1 className="text-2xl font-bold text-center">Life UI</h1>
        {AppContainer.state.user.name && (
          <p>Welcome, {AppContainer.state.user.name}</p>
        )}
        {!AppContainer.getMenuStatus() ? (
          <div className="m-4 h-full">
            <div>
              <button
                className="border"
                onClick={() => {
                  AppContainer.setMenuStatus(true);
                }}>
                Settings
              </button>
            </div>
            {Object.keys(AppContainer.state.panels).map(objectKey => {
              return (
                <div>
                  <Panel panel={AppContainer.state.panels[objectKey]} />
                </div>
              );
            })}
          </div>
        ) : (
          <Settings />
        )}
      </div>
    );
  }
}

export default connect([AppContainer])(App);
