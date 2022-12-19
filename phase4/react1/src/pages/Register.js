import React from "react";
import Axios from 'axios'
import {Navigate} from "react-router-dom";
const initialState = {
    fname: "",
    lname: "",
    type: "student",
    email: "",
    pass: "",
    major: "CSE",
    phoneNumber: "",
    verifypass: "",
    nameError: "",
    emailError: "",
    phoneNumberError: "",
    passwordError: "",
    stateError: "",
    register : false
  };
class Register extends React.Component{
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
        let nameError = "";
        let emailError = "";
        let passwordError = "";
        let phoneNumberError = "";
        if (!this.state.fname) {
          nameError = "name cannot be blank";
        }
        
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
            passwordError = "Password must be more than 8 charachater long";
        }

        if (this.state.phoneNumber.length !== 10){
          phoneNumberError = "Phonenumber should have 10 numbers";
      }

        if (this.state.pass !== this.state.verifypass){
            passwordError = "password not matched";
        }
        

        if (emailError || nameError || passwordError || phoneNumberError) {
          this.setState({ emailError, nameError, passwordError,phoneNumberError });
          return false;
        }
    
        return true;
      };

    handleSubmit = event => {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
          this.setState(initialState);
          // Axios.post('http://localhost:3001/api/insert'
          const data = {
            fname: this.state.fname,
            lname: this.state.lname,
            major: this.state.major,
            type: this.state.type,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            pass: this.state.pass
          }
          Axios.post('http://localhost/serverRegister.php',data).then((resp) =>{
            if (resp["data"] === "SUCCESS"){
              this.setState({login:true});
            }
            else {
              console.log(resp);
              alert("Failed due to error");
            }
          }); //WHEN TRUE WE NEED TO SEND DATA TO BACKEND 
        }
      };


    render(){
        return(
        <div>
        <div className = "sub-header-signup">
            <h1>Sign Up</h1>
            {this.state.login && (<Navigate to="/login" replace={true} />)}
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="fname">First Name</label>
                    <input
                        type = "text"
                        name="fname"
                        id="fname"
                        placeholder="Your first name.."
                        value={this.state.fname}
                        onChange={this.handleChange}
                    />
                    <div style={{ fontSize: 12, color: "red" }}>{this.state.nameError}</div>
                    <label htmlFor="lname">Last Name</label>
                    <input
                        type = "text"
                        name="lname"
                        id="lname"
                        placeholder="Your last name.."
                        value={this.state.lname}
                        onChange={this.handleChange}
                    />
                    
                    
                    <label htmlFor="phoneNumber">PhoneNumber</label>
                    <input
                        type = "text"
                        name="phoneNumber"
                        id="phoneNumber"
                        placeholder="Enter 10 digit phone number"
                        value={this.state.phoneNumber}
                        onChange={this.handleChange}
                    />
                    <div style={{ fontSize: 12, color: "red" }}>{this.state.phoneNumberError}</div>


                    <label htmlFor="Major">Major</label>
                    <select id="major" name="major" value={this.state.major} onChange={this.handleChange} >
                    <option value="CSE">Computer Science</option>
                    <option value="ELE">Electrical</option>
                    <option value="INF">Information Science</option>
                    <option value="EMG">Engineering Management</option>
                    <option value="NAN">None of the above</option>
                    </select>
                    
                    
                    <label htmlFor="email">Email</label>
                    <input
                        type = "text"
                        name="email"
                        id="email"
                        placeholder="email Id"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    <div style={{ fontSize: 12, color: "red",placeholder: "Default type is Student" }}>{this.state.emailError}</div>

                    <label htmlFor="Type">Type</label>
                    <select id="type" name="type" value={this.state.type} onChange={this.handleChange} >
                    <option value="student">student</option>
                    <option value="businessowner">businessowner</option>
                    <option value="schooladmin">schooladmin</option>
                    </select>
                    
                    <label htmlFor="pass">Password</label>
                    <input 
                        type="password" 
                        id="pass" 
                        name="pass" 
                        placeholder="password" 
                        value={this.state.pass}
                        onChange={this.handleChange}/>
                    <div style={{ fontSize: 12, color: "red" }}>{this.state.passwordError}</div>

                    <label htmlFor="pass">Confirm password</label>
                    <input 
                        type="password"
                        name="verifypass" 
                        placeholder="password" 
                        value={this.state.verifypass}
                        onChange={this.handleChange}/>
                    <div style={{ fontSize: 12, color: "red" }}>{this.state.passwordError}</div>

                    <input type="submit" value="SignUp"/>
          
                </form>
            </div>
            </div>
            );
        
    }
}
export default Register;