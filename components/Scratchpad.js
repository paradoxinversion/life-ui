import React, { Component } from "react";
import connect from "unstated-connect";
import store from "store";
import AppContainer from "../containers/AppContainer";
class Scratchpad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scratchpadData: ""
    };
  }
  componentDidMount() {
    const scratchpadData = store.get("scratchpad");
    if (scratchpadData) {
      this.setState({ scratchpadData });
    }
  }
  handleChange = e => {
    this.setState({
      scratchpadData: e.target.value
    });
  };
  render() {
    const [AppContainer] = this.props.containers;
    return (
      <section id="section-scratchpad">
        <h2>Scratchpad</h2>
        <textarea
          id="scratchpad"
          className="border text-area"
          value={this.state.scratchpadData}
          onBlur={() => {
            AppContainer.updateScratchpad(this.state.scratchpadData);
          }}
          onChange={this.handleChange}
        ></textarea>
      </section>
    );
  }
}

export default connect([AppContainer])(Scratchpad);
