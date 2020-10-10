import React from "react";
import logo from "../../../assets/img/logo/catback.png";
import "../../../assets/scss/components/app-loader.scss";
class SpinnerComponent extends React.Component {
  render() {
    return (
      <div className="fallback-spinner vh-100">
        <img
          // style={{ width: "10%", margin: "-80px -50px " }}
          className="fallback-logo"
          src={logo}
          alt="logo"
        />
        <div className="loading">
          <div className="effect-1 effects"></div>
          <div className="effect-2 effects"></div>
          <div className="effect-3 effects"></div>
        </div>
      </div>
    );
  }
}

export default SpinnerComponent;
