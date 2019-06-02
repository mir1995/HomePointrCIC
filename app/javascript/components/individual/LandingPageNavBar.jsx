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
       	 <div className="navbar">
         		 <img className="home-button-logo" onClick={this.returnHome} src={logo}/>
				 	   <ul id="horizontal-list">
								 <li><a href="/">Login/ Sign Up</a></li>                                                                                              
								 <li><a href="/">About</a></li>                                                                                                                                                      
								 <li><a href="/">Contact</a></li> 
								 <li><a href="/">FAQs</a></li>
						 </ul> 
       	 </div>
    );
  }
}


export default LandingPageNavBar;
