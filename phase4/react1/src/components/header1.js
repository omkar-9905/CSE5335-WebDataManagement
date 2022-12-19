import React from "react";
import {NavLink} from "react-router-dom";
import Axios from 'axios';

class Header1 extends React.Component{
    handleSubmit = event => {
        console.log('logout button hit')
        event.preventDefault();
          Axios.defaults.withCredentials = true;
          Axios.post('http://localhost/serverLogout.php').then((resp) => {
            console.log(resp);
            if (resp["data"] === "SUCCESS"){
              this.setState({logout:"SUCCESS"});
            }
            else {
              alert("Logout Unsuccessful");
              console.log(resp);
            }
            });
        };

    render(){
        return(
        <div class = "header">
          <div class="nav-links-left">
          <ul>
             <li><NavLink to ="/" >Home</NavLink></li>
             <li><NavLink to="/about">About</NavLink></li>
             <li><NavLink to="/services">Services</NavLink></li>
             <li><NavLink to="/contact">Contact</NavLink></li>
             <li class="right"
             onClick ={this.handleSubmit}><NavLink to="/login">LogOut             
             </NavLink></li>
            </ul>
        </div>
     
      <hr/>
      </div>

        );
    }
}
export default Header1;