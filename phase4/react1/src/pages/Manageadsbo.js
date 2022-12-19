
import React, { useState, useEffect } from 'react';
import Header1 from "../components/header1";
import axios from "axios";
import { Navigate} from "react-router-dom";
import Footer from '../components/Footer';

const ManageAdvsbo = () => {
    function refreshPage() {
        window.location.reload(true);
    }
  const [login, setLogin] = useState(true);
  const [ads, setAdv] = useState([]);
        useEffect(() => {
            fetchAdvertisement();
    }, []);
    const fetchAdvertisement = () => {
        axios
            .get('http://localhost/serverAdv.php',{ withCredentials: true })
            .then((res) => {
            console.log(res)
            if (res['data']==="NOTLOGIN"){
                setLogin(false);
            }
            else{
                setAdv(res.data);
            }
            })
            .catch((err) => {
            console.log(err);
            });
        };
    
        const [productname, setProductname] = useState('')
        const [productdesc, setProductdesc] = useState('')
        const [productimage, setProductImage] = useState('')
        const [companyname, setProductCompany] = useState('')

        const handleValueChange1 = event => {
            setProductname(event.target.value)
          };

        const handleValueChange2 = event => {
            setProductdesc(event.target.value)
          };

        const handleValueChange3 = event => {
            setProductCompany(event.target.value)
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
              image: productimage,
              company: companyname
            } 
            console.log(data);
            axios
                .post('http://localhost/serverboAddAdv.php',data,{ withCredentials: true })
                
                .then((res) => {
                if (res['data']==="NOTLOGIN"){
                    setLogin(false);
                }
                else if (res["data"] === "SUCCESS"){
                  alert("Add Added Successfully");
                  refreshPage();
                }
                console.log(res);
                })
                .catch((err) => {
                console.log(err);
                });
            };

    const rmvAdv = (event) => {
        const data = {
            id :event.target.id
        }
        console.log(data);
        axios
        .post('http://localhost/serverRmvAdv.php',data,{ withCredentials: true })
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
        advID: event.target.id,
        advName : tr[1].innerText,
        advContent : tr[2].innerText
        }    
        console.log(data);
        axios
            .post('http://localhost/serverUpdateAdv.php',data,{ withCredentials: true })
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
					<div className="youradds"><h3>Your Advertisement</h3>
		            </div>
				    <div className='item-container'>
                    {ads.map((ad) => {
                        return (
                    <div className='card' key={ad.name}>
                        <img src={ad.image} alt='' />
                        <h3 contenteditable='true'>{ad.name}</h3>
                        <p contenteditable='true'>{ad.content}</p>
                        <input type="submit" id={ad.id} value="Remove Product" onClick={rmvAdv} />
                        <input type="submit" id = {ad.id} value="Edit" onClick={updateAdv}/>
                    </div>
                )})}
                </div>

                <div class="yourproducts"><h3>Advertisement To Add</h3></div>
                <div>
                <label for="advname">Product Name</label>
                <input type="text" value1={productname} name="productname" placeholder="Product Name" onChange={handleValueChange1} />
                
                <label for="advname">Product Description</label>
                <input type="text" value2={productdesc} name="productdesc" placeholder="Product Description" onChange={handleValueChange2} />

                <label for="advname">Company Name</label>
                <input type="text" value2={companyname} name="companyname" placeholder="Company name" onChange={handleValueChange3} />

                <label for="advname">Product Image</label>
                <input type="file" name="image" value3={productimage} accept=".png,.gif,.jpg,.webp" onChange={onFileChange}/>

                <input type="submit" value="submit" onClick={addSellProduct}/>
                </div>
	   		</div>
			   <Footer />
	   </div>
        
        );
}

export default ManageAdvsbo;