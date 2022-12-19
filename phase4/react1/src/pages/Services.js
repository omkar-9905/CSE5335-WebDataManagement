import React from "react";
import pic1 from "./images/studentclub.jpeg";
import pic2 from "./images/buysell.png";
import pic3 from "./images/business.jpeg";
import Header from "../components/Header";
import Footer from "../components/Footer";

class Services extends React.Component{
    render(){
        return (
        <div>
            <Header />
            <div class="text-box">
                <section class="sub-header">
                   <h1>Services</h1>
                   <div class="img-container"> 
                        <img class ="one" src={pic1} alt="student club" />
                        <h3>Student Clubs <br /> A place where students meet their passion.</h3>
                    </div>
                    <div class="img-container"> 
                        <img src={pic2} alt="Marketplace"/>
                        <h3>Marketplace <br /> Where you can buy or sell anything.</h3>
                    </div>
                    <div class="img-container"> 
                        <img src={pic3} alt="Business"/>
                        <h3>Business <br/> Where student meet shops.</h3>
                    </div>
                    <Footer/>
                </section>
                
            </div>
        </div>
            );
    }

}
export default Services;

