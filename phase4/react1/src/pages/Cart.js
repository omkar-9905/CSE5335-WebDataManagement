import Header1 from "../components/header1";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  Navigate} from "react-router-dom";

const StudentCart = () => {
    const [login, setLogin] = useState(true);
    const [products, getCartProducts] = useState([]);
        useEffect(() => {
        fetchProducts();
    }, []);
        const fetchProducts = () => {
        axios
            .get('http://localhost/serverAccessCart.php',{ withCredentials: true })
            .then((res) => {
            console.log(res)
            if (res['data']==="NOTLOGIN"){
                setLogin(false);
            }
            else{
                getCartProducts(res.data);
            }
            })
            .catch((err) => {
            console.log(err);
            });
        };
        function refreshPage() {
            window.location.reload(true);
        }
  
        const rmvcartproduct = (event) => {
            const data = {
                id :event.target.id
            }
            axios
            .post('http://localhost/serverUserRemoveCart.php',data,{ withCredentials: true })
            .then((res) => {
                console.log(res);
                if (res['data']==="NOTLOGIN"){
                    setLogin(false);
                }
                else if (res['data']==="SUCCESS"){
                    alert("PRODUCT REMOVED FROM CART");
                    refreshPage();
                } 
                })
                .catch((err) => {
                console.log(err);
                });
            };

return  (
        <div className="student-profile">
        {login===false && (<Navigate to="/login" replace={true} />)}
                <Header1 />
        <div className = "sthead-student">
            <h1>Your Cart  Items</h1>
            <a href="/student"><button>Go to Student</button></a>
        <div className='item-container'>
            {products.map((product) => {
                        return (
                    <div className='card' key={product.name}>
                        <img src={product.images} alt='' />
                        <h3>{product.name}</h3>
                        <p>Price:${product.price}</p>
                        <input type="submit" id={product.productID} value="Remove product" onClick={rmvcartproduct} />
                    </div>
                )})}
        </div>
        <a href="/payment"><button>Checkout</button></a>
        </div>
        </div>
        );
    }

export default StudentCart;