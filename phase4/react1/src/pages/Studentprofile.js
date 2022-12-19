
import React, { useState, useEffect } from 'react';
import Header1 from "../components/header1";
import axios from "axios";
import { Navigate} from "react-router-dom";
import Footer from '../components/Footer';

const Studentdata = () => {
  const [login, setLogin] = useState(true);
  const [users, getUser] = useState([]);
        useEffect(() => {
        fetchUser();
    }, []);
        const fetchUser = () => {
        axios
            .get('http://localhost/serverStudentprofile.php',{ withCredentials: true })
            .then((res) => {
            console.log(res)
            if (res['data']==="NOTLOGIN"){
                setLogin(false);
            }
            else{
				console.log(res);
                getUser(res.data);
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
            .get('http://localhost/serverAccessClubs.php',{ withCredentials: true })
            .then((res) => {
            console.log(res)
            if (res['data']==="NOTLOGIN"){
                setLogin(false);
            }
            else{
                setClubs(res.data);
            }
            })
            .catch((err) => {
            console.log(err);
            });
        };

    function refreshPage() {
        window.location.reload(true);
    }
	const [products, setProducts] = useState([]);
            useEffect(() => {
            fetchProducts();
        }, []);
            const fetchProducts = () => {
            	axios
                .get('http://localhost/serverUserProducts.php',{ withCredentials: true })
                .then((res) => {
                console.log(res);
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


    const [sellproducts, setSellProducts] = useState([]);
            useEffect(() => {
            fetchSellProducts();
                        }, []);
            const fetchSellProducts = () => {
                axios
                .get('http://localhost/serverAccessSellProduct.php',{ withCredentials: true })
                .then((res) => {
                console.log(res);
                if (res['data']==="NOTLOGIN"){
                    setLogin(false);
                }
                else{
                    setSellProducts(res.data);
                }
                })
                .catch((err) => {
                console.log(err);
                });
        };

    const rmvClub = (event) => {
        const data = {
            id :event.target.id
        }
        axios
        .post('http://localhost/serverUserRmvClub.php',data,{ withCredentials: true })
        .then((res) => {
            if (res['data']==="NOTLOGIN"){
                setLogin(false);
            }
            else if (res['data']==="SUCCESS"){
                alert("CLUB REMOVED");
                refreshPage();
            } 
            })
            .catch((err) => {
            console.log(err);
            });
        };

            const [productname, setProductname] = useState('')
            const [productdesc, setProductdesc] = useState('')
            const [productimage, setProductImage] = useState('')

            const handleValueChange1 = event => {
                setProductname(event.target.value)
              };

            const handleValueChange2 = event => {
                setProductdesc(event.target.value)
              };
        
            const  onFileChange = (e) => {
                let files = e.target.files;
                let fileReader = new FileReader();
                fileReader.readAsDataURL(files[0]);
                fileReader.onload = (event) => {
                setProductImage(event.target.result)
                }
            }
            const addSellProduct = (event) => {
                event.preventDefault();
                // console.log(React.Children.count(event.currentTarget.parentNode));
                const data = {
                  name: productname,
                  price: productdesc,
                  image: productimage
                } 

                const headers = {
                    'Access-Control-Allow-Origin': '*',
                    'withCredentials': true
                }
                console.log(data);
                axios
                    .post('http://localhost/serverUserSellProduct.php',data,headers)
                    
                    .then((res) => {
                    if (res['data']==="NOTLOGIN"){
                        setLogin(false);
                    }
                    else if (res["data"] === "SUCCESS"){
                      alert("Product Added Successfully");
                      refreshPage();
                    }
                    console.log(res);
                    })
                    .catch((err) => {
                    console.log(err);
                    });
                };



    return  (
        <div>
			{login===false && (<Navigate to="/login" replace={true} />)}
				<Header1 />
                    <div className="sthead-student">
		            <h1>Profile</h1>
		        <img className="circle" src="images/avatar.png" alt="" />
				{users.map((user) => {
                        return (
		            <div className="info">
		                <p> NAME: {user.fname}</p>
		                <p> EMAIL: {user.email}</p>
		                <p> MAJOR: {user.major}</p>
		            </div>
				)})}
		            
		            <div className="yourclubs">
		                <h3>Your Clubs</h3>
		            </div>
				<div className='item-container'>
                {clubs.map((club) => {
                        return (
                    <div className='card' key={club.name}>
                        <img src={club.images} alt='' />
                        <h3>{club.name}</h3>
                        <p>{club.description}</p>
                        <input type="submit" id={club.id} value="Remove Club" onClick={rmvClub} />
                    </div>
                )})}
                </div>

					<div class="yourproducts">
		                <h3>Your Products</h3>
		            </div>
				<div className='item-container'>
                {products.map((product) => {
                        return (
                    <div className='card' key={product.name}>
                        <img src={product.images} alt='' />
                    </div>
                )})}
                </div>

                <div class="yourproducts">
		                <h3>Sell Products</h3>
		            </div>
                
                <div className='item-container'>
                {sellproducts.map((product) => {
                        return (
                    <div className='card' key={product.name}>
                         <img src={product.image} alt='' />
                        <h3>{product.name}</h3>
                        <p>${product.price}</p>

                    </div>
                )})}



                </div>
                <div class="yourproducts"><h3>Product To Sell</h3></div>
                <div>
                <label for="advname">Product Name</label>
                <input type="text" value1={productname} name="productname" placeholder="Product Name" onChange={handleValueChange1} />
                
                <label for="advname">Product Price</label>
                <input type="text" value2={productdesc} name="productdesc" placeholder="Product Description" onChange={handleValueChange2} />

                <label for="advname">Product Image</label>
                <input type="file" name="image" value3={productimage} accept=".png,.gif,.jpg,.webp" onChange={onFileChange}/>

                <input type="submit" value="submit" onClick={addSellProduct}/>
                </div>
	   		</div>
			   <Footer />
	   </div>
        
        );
}

export default Studentdata;