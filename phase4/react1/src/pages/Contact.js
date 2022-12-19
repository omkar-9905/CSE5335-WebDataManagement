import React from "react";
import Axios from 'axios'
import Header from "../components/Header";
import Footer from "../components/Footer";
const initialState = {
    fname: "",
    lname: "",
    email: "",
    phoneNumber: "",
    query: "",
    nameError: "",
    emailError: "",
    phoneNumberError: ""
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

        if (this.state.phoneNumber.length !== 10){
          phoneNumberError = "Phonenumber should have 10 numbers";
      }

        if (emailError || nameError || phoneNumberError) {
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
          const data = {
            fname: this.state.fname,
            lname: this.state.lname,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            query: this.state.query
          }
          console.log(data);
          Axios.post('http://localhost/serverQuery.php',data).then((resp) =>{
            if (resp["data"] === "SUCCESS"){
              alert("Your Request Submitted Sucessfully");
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
            <Header/>
        <div className = "sub-header-register">
            <h2>Contact</h2>
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

                    <label htmlFor="Type">email</label>
                    <input
                        type = "text"
                        name="email"
                        id="email"
                        placeholder="Enter Your Email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    <div style={{ fontSize: 12, color: "red",placeholder: "Default type is Student" }}>{this.state.emailError}</div>
                    
                    

                    <label htmlFor="Type">Query</label>
                    <input
                        type = "text"
                        name="query"
                        id="query"
                        placeholder="Enter Your Query"
                        value={this.state.query}
                        onChange={this.handleChange}
                    />
                    <input type="submit" value="Submit"/>
          
                </form>
                <Footer/>
            </div>
            </div>
            );
        
    }
}
export default Register;