
import React, { useState, useEffect } from 'react';
import Header1 from "../components/header1";
import axios from "axios";
import { Navigate} from "react-router-dom";
import Footer from '../components/Footer';

const Manageproductsbo = () => {
    function refreshPage() {
        window.location.reload(true);
    }
  const [login, setLogin] = useState(true);
  const [products, setProduct] = useState([]);
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
                setProduct(res.data);
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
                .post('http://localhost/serverboAddProduct.php',data,headers,{ withCredentials: true })
                
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

    const rmvProduct = (event) => {
        const data = {
            id :event.target.id
        }
        console.log(data);
        axios
        .post('http://localhost/serverRmvProduct.php',data,{ withCredentials: true })
        .then((res) => {
            if (res['data']==="NOTLOGIN"){
                setLogin(false);
            }
            else if (res['data']==="SUCCESS"){
                alert("Product REMOVED");
                refreshPage();
            } 
            })
            .catch((err) => {
            console.log(err);
            });
        };

    const updateAdv = (event) => {
        event.preventDefault();
        const tr = Array.from(event.currentTarget.parentNode.children)
        const data = {
        productID: event.target.id,
        productName : tr[1].innerText,
        productPrice : tr[2].innerText.split(':')[1].split('$')[1]
        }    
        console.log(data);
        axios
            .post('http://localhost/serverUpdateProduct.php',data,{ withCredentials: true })
            .then((res) => {
            if (res['data']==="NOTLOGIN"){
                setLogin(false);
            }
            else if (res["data"] === "SUCCESS"){
            alert("Product updated Successfully");
            refreshPage();
            }
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
					<div className="yourproducts"><h3>Your Products</h3>
		            </div>
				    <div className='item-container'>
                    {products.map((product) => {
                        return (
                    <div className='card' key={product.name}>
                        <img src={product.images} alt='' />
                        <h3 contenteditable='true'>{product.name}</h3>
                        <p contenteditable='true'>Price:${product.price}</p>
                        <input type="submit" id={product.productID} value="Remove Product" onClick={rmvProduct} />
                        <input type="submit" id = {product.productID} value="Edit" onClick={updateAdv}/>
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

export default Manageproductsbo;