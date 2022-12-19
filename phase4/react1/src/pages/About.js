import React from "react";
import pic from "./images/marketplace_about.jpeg";
import Header from "../components/Header";

class About extends React.Component{
    render(){
        return  (
            <div>
                <Header />
            <div class="text-box">
                <section class = "sub-header">
                <h1>About Us</h1>
                <h4>Welcome to student market place</h4>
                <img class ="one" src={pic} alt="marketplace_about" height="350px" width="500px" />
                <p>This site is mainly developed for students where they can sell and buy <br />
                products along with that there are many features available such as <br />
                students can view the business in their institution and chat directly <br />
                with the business owner about products. <br />
                University offers different clubs for student as per intrest. 
                </p>
                </section>
        </div>
        </div>
        );

    }
}
export default About;
