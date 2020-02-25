import React, { Component } from "react";
import connect from "unstated-connect";
import AppContainer from "../containers/AppContainer";
class Scratchpad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scratchpadData: ""
    };
  }
  componentDidMount() {
    const [AppContainer] = this.props.containers;
    const scratchpadData = AppContainer.state.panels[this.props.id].content;
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
        <textarea
          id="scratchpad"
          className="border text-area"
          value={this.state.scratchpadData}
          onBlur={() => {
            AppContainer.updateScratchpad(
              this.props.id,
              this.state.scratchpadData
            );
          }}
          onChange={this.handleChange}></textarea>
      </section>
    );
  }
}

export default connect([AppContainer])(Scratchpad);
