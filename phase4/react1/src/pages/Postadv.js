
import React from "react";
import { NavLink } from "react-router-dom";
import Header1 from "../components/header1";



class Postadv extends React.Component{
    render(){
        return  (
          
            <div><Header1 />
            <main class="main">
                <div class="container">
                <form action="">
                    <label for="advname">Advertisement Name</label>
                    <input type="text" id="advname" name="advertisementname" placeholder="advertisement name" />
        
                    <label for="advdesc">Advertisement Description</label>
                    <input type="text" id="advdesc" name="advertisementdescription" placeholder="advertisement description" />

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
export default Postadv;