import React from "react";
import { render } from "react-dom";
import "./style.css";

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
      onClick: props.onClick,
    };
  }

  render() {
    const { text, onClick } = this.state;

    return (
      <button className="button" onClick={onClick}>
        {" "}
        {text}{" "}
      </button>
    );
  }
}

export default Button;
