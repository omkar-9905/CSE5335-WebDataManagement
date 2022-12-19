import React from "react";
import {NavLink} from "react-router-dom";

class Header extends React.Component{
    render(){
        return(
        <div class = "header">
        <nav>
        <div class="nav-links-left">
            <ul>
                <li><NavLink to ="/" >Home</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/services">Services</NavLink></li>
                <li><NavLink to="/contact">Contact</NavLink></li>
                <li className="right"><NavLink to="/login">LogIn</NavLink></li>
                <li className="right"><NavLink to="/register">SignUp</NavLink></li>
                </ul>
            </div>
        </nav>
        </div>

        );
    }
}
export default Header;