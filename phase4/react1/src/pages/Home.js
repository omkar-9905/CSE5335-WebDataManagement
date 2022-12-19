import React from "react";
import Header from "../components/Header";
class Home extends React.Component{
    render(){
        return  (
          <div>
            <Header />
              <div className="text-box">
              <h1>Student Market Place</h1>
              <p>This market helps students to sell and buy products.</p>
        </div>
        </div>
        
        );
    }
}
export default Home;