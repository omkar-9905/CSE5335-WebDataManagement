import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Navigate} from "react-router-dom";

const Checkout = () => {
    const [login, setLogin] = useState(true);
    const [cartPage, redirectTocart] = useState(false);
    const [total, getTotal] = useState([]);
            useEffect(() => {
            fetchTotal();
        }, []);
            const fetchTotal = () => {
            axios
                .get('http://localhost/serverTotalPrice.php',{ withCredentials: true })
                .then((res) => {
                console.log(res)
                if (res['data']==="NOTLOGIN"){
                    setLogin(false);
                }
                else{
                    getTotal(res.data);
                }
                })
                .catch((err) => {
                console.log(err);
                });
            };

            function refreshPage() {
                window.location.reload(true);
            }

        const rmvcartproduct = () => {

            axios
            .get('http://localhost/serverUserCheckout.php',{ withCredentials: true })
            .then((res) => {
                console.log(res);
                if (res['data']==="NOTLOGIN"){
                    setLogin(false);
                }
                else if (res['data']==="SUCCESS"){
                    alert("Payment Successfull"); 
                    redirectTocart(true);

                } 
                })
                .catch((err) => {
                console.log(err);
                });
            };

    
        return(
        <div>
        <div className = "sub-header-register">
        {login===false && (<Navigate to="/login" replace={true} />)}
        {cartPage===true && (<Navigate to="/cart" replace={true} />)}
            <h1>Payment</h1>
                    <label htmlFor="fname">First Name</label>
                    <input
                        type = "text"
                        name="fname"
                        id="fname"
                        placeholder="first name"
                        
                    />
        
                    <label htmlFor="lname">Last Name</label>
                    <input
                        type = "text"
                        name="lname"
                        id="lname"
                        placeholder="last name"
                        
                    />
                    
                    
                    <label htmlFor="cardnumber">Card Number</label>
                    <input
                        type = "text"
                        name="cardnumber"
                        id="cardnumber"
                        placeholder="Enter your card number"
                        
                    />
                    <div style={{ fontSize: 12, color: "red" }}></div>

                    <label htmlFor="pass">CVV</label>
                    <input 
                        type="password" 
                        id="cvv" 
                        name="cvv" 
                        placeholder="CVV" 
                        />
                    <div style={{ fontSize: 12, color: "red" }}></div>
                    {total.map((to) => {
                        return (
                        <h1>Total:${to.total}</h1>
                        )})}
                    
                    <input type="submit"  value="PAY" onClick={rmvcartproduct}/>
            </div>
            </div>
            );   
    }
export default Checkout;