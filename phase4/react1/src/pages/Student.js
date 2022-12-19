import { NavLink, Navigate} from "react-router-dom";
import Header1 from "../components/header1";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from "../components/Footer";



const FeaturedProducts = () => {
    
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
    const [clubs, setClubs] = useState([]);
            useEffect(() => {
            fetchClubs();
        }, []);
            const fetchClubs = () => {
            axios
                .get('http://localhost/serverClubs.php',{ withCredentials: true })
                .then((res) => {
                console.log(res);
                if (res['data']==="NOTLOGIN"){
                    setLogin(false);
                }else{
                    setClubs(res.data);
                } 
                })
                .catch((err) => {
                console.log(err);
                });
            };
    const [adv, getAdver] = useState([]);
            useEffect(() => {
            getadv();
        }, []);
            const getadv = () => {
            axios
                .get('http://localhost/serverAdv.php',{ withCredentials: true })
                .then((res) => {
                console.log(res);
                if (res['data']==="NOTLOGIN"){
                    setLogin(false);
                }else{
                    getAdver(res.data);
                } 
                })
                .catch((err) => {
                console.log(err);
                });
            };
   
    const NavigateToContacts = (event) => {
        const data = {
            id :event.target.id
        }
        
        axios
        .post('http://localhost/serverUserCart.php',data,{ withCredentials: true })
        .then((res) => {
            console.log(res);
            if (res['data']==="NOTLOGIN"){
                setLogin(false);
            }
            else {
                alert("PRODUCT ADDED TO CART");
            } 
            })
            .catch((err) => {
            console.log(err);
            });
        };

    const AddClub = (event) => {
            const data = {
                id :event.target.id
            }
            axios
            .post('http://localhost/serverUserAddClub.php',data,{ withCredentials: true })
            .then((res) => {
                console.log(res);
                if (res['data']==="NOTLOGIN"){
                    setLogin(false);
                }
                else {
                    alert("Club Added");
                } 
                })
                .catch((err) => {
                console.log(err);
                });
            };

return (
    <div className="student-profile"> 
        {login===false && (<Navigate to="/login" replace={true} />)}
        {/* {inCart===true && (<Navigate to="/Cart" replace={true} />)} */}
            <Header1 /> 
                <div className="sthead-student">
                    <h1>Student Page</h1>
                    <NavLink className="circle"to="/studentprofile"><img  src="images/avatar.png" alt=""/></NavLink>
                </div>

                <div className="exppr">
                    <h3>Explore Products</h3>
                    <a href="/cart"><button>Go to Cart</button></a>
                    <a href="https://chatstudent.herokuapp.com/"><button>Chat</button></a>
                </div>
                

                <div className='item-container'>
                    {products.map((product) => {
                        return (
                    <div className='card' key={product.name}>
                        <img src={product.images} alt='' />
                        <h3>{product.name}</h3>
                        <p>Price:${product.price}</p>
                        <input type="submit" id={product.productID} value="Add To Cart" onClick={NavigateToContacts} />
                    </div >
                    
                    )})}
                </div>

                <div className="expclubs">
                    <h3>Explore clubs</h3>
                </div>

                <div className='item-container'>
                    {clubs.map((club) => {
                        return (
                    <div className='card' key={club.name}>
                        <img src={club.images} alt='' />
                        <h3>{club.name}</h3>
                        <p>{club.description}</p>
                        <input type="submit" id={club.id} value="Add Club" onClick={AddClub} />
                    </div>
                    )})}
                </div>

                <div className="expadv">
                    <h3>Explore Adv</h3>
                </div>

                <div className='item-container'>
                    {adv.map((ad) => {
                        return (
                    <div className='card' key={ad.name}>
                        <img src={ad.image} alt=""/>
                        <h3>{ad.companyname}</h3>
                        <p>{ad.content}</p>
                    </div>
                    )})}
                </div>
                <Footer />
                </div>
        );
    }
export default FeaturedProducts;