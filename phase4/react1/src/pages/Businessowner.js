import React, { useState, useEffect } from 'react';
import Header1 from "../components/header1";
import axios from "axios";

import {  Navigate} from "react-router-dom";


const Businessowner = () => {
  const [login, setLogin] = useState(true);
  const [products, setProducts] = useState([]);
        useEffect(() => {
        fetchProducts();
    }, []);
    
        const fetchProducts = () => {
        axios
            .get('http://localhost/serverProducts.php',{ withCredentials: true })
            .then((res) => {
            console.log(res)
            if (res['data']==="NOTLOGIN"){
                setLogin(false);
            }
            else{
                setProducts(res.data);
            }
            })
            .catch((err) => {
            console.log(err);
            });
        };
        return  (
          <div>
            <Header1 />
            {login===false && (<Navigate to="/login" replace={true} />)}
                    <div class="bo">
		
		<h1>Business Owner</h1>
		</div>
		
		 
    <table class="buttons">
      <tr>
        <td> 
          <a href="/manageproductsbo" class="button">Manage Your Products</a>
        </td>
        <td>  
          <a href="/manageadsbo" class="button">Manage Your Ads</a>
        </td>
        <td>  
          <a href="https://chatstudent.herokuapp.com/" class="button">Chat</a>
        </td>
      </tr>
    </table>
    <div className="expclubs">
                    <h3>Your Product</h3>
                </div>

                <div className='item-container'>
                    {products.map((product) => {
                        return (
                    <div className='card' key={product.name}>
                        <img src={product.images} alt='' />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                    </div>
              )})}
	        </div>
          </div>
        );
    }
export default Businessowner;