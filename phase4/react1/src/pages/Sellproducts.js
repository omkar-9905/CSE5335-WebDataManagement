
import React from "react";
import { NavLink } from "react-router-dom";
import Header1 from "../components/header1";



class Sellproducts extends React.Component{
    render(){
        return  (
          
            <div><Header1 />
            <main class="main">
                <div class="container">
                <form action="">
                    <label for="pname">Product Name</label>
                    <input type="text" id="pname" name="productname" placeholder="product name" />
        
                    <label for="p_price">Product price</label>
                    <input type="text" id="p_price" name="productprice" placeholder="product price" />

                    <label for="imgfile">Select a file:</label>
                    <input type="file" id="imgfile" name="imgfile" /><br /><br />
                     <input type="submit" />
                </form>
                </div>

                </main>
                </div>
            
            
                
            
        
        );
    }
}
export default Sellproducts;