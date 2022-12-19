import React from "react";
import Axios from 'axios';
import {NavLink,Navigate} from "react-router-dom";
// import { Redirect } from 'react-router'


 
const initialState = {
    email: "",
    pass: "",
    emailError: "",
    passwordError: "",
    login : null
  };
 
class Login extends React.Component{
    state = initialState;
    
    handleChange = event => {
        const isCheckbox = event.target.type === "checkbox";
        this.setState({
          [event.target.name]: isCheckbox
            ? event.target.checked
            : event.target.value
        });
    };
    
    validate = () => {
        let emailError = "";
        let passwordError = "";
            
        if (!this.state.email) {
            emailError = "email id required";
          }

        if (!this.state.email.includes("@")) {
          emailError = "invalid email";
        }

        if (!this.state.email.includes(".")) {
            emailError = "invalid email";
          } 

        if (!this.state.pass){
            passwordError = "password required";
        }

        if (this.state.pass.length < 8){
            passwordError = "password charachters should be more than 8";
        }

    
        if (emailError ||  passwordError) {
          this.setState({ emailError,  passwordError });
          return false;
        }
    
        return true;
      };

      handleSubmit = event => {
        event.preventDefault();
        const isValid = this.validate();


        if (isValid) {
          this.setState(initialState);
          const data = {            
            email: this.state.email,
            pass: this.state.pass
          }
          Axios.defaults.withCredentials = true;
          Axios.post('http://localhost/serverLogin.php',data, { withCredentials: true }).then((resp) => {
            console.log(resp["data"]);
            if (resp["data"]["status"] === "SUCCESS"){
              this.setState({login:resp["data"]["type"]});
            }
            else {
              alert("Password Does not match");
            }
            });
        }
      };


    render()
    { 
        return (
            <div>
            
            <section className = "sub-header-register">
            <h1>Sign In</h1>
            {this.state.login==="student" && (<Navigate to="/student" replace={true} />)}
            {this.state.login==="schooladmin" && (<Navigate to="/school" replace={true} />)}
            {this.state.login==="businessowner" && (<Navigate to="/businessowner" replace={true} />)}
            {this.state.login==="superadmin" && (<Navigate to="/super" replace={true} />)}
            <form onSubmit={this.handleSubmit}>

                <label htmlFor="email">Email</label>
                <input
                    type = "text"
                    name="email"
                    id="email"
                    placeholder="email Id"
                    value={this.state.email}
                    onChange={this.handleChange}
                />
                <div style={{ fontSize: 12, color: "red" }}>{this.state.emailError}</div>
          
                <label htmlFor="pass">Password</label>
                <input 
                    type="password" 
                    id="pass" 
                    name="pass" 
                    placeholder="password" 
                    value={this.state.pass}
                    onChange={this.handleChange}/>
                <div style={{ fontSize: 12, color: "red" }}>{this.state.passwordError}</div>

                <input type="submit" value="LogIn"/>
                
                <p className = "signup" >New User? <NavLink to ="/register">SignUp</NavLink></p> 
                <p className = "signup" >Forgot password? <a href="forgot.html">Forgot password</a></p>
            </form>
            </section>
            </div>
    );
    }
}
export default Login;
