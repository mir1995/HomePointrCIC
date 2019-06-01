import React from "react";
import { Avatar, Button } from "antd";
import "antd/dist/antd.css";
import logo from '../../../assets/images/logo.png';


class LandingPageNavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  returnHome() {
    window.location = "/";
  }

  render() {
    return (
      <div>
        <div className="navbar">
          <img className="home-button-logo" onClick={this.returnHome} src={logo}/>
        </div>
      </div>
    );
  }
}


export default LandingPageNavBar;
