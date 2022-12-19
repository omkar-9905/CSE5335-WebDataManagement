import {  Navigate} from "react-router-dom";
import Header1 from "../components/header1";
import React, { useState, useEffect } from 'react';
import axios from 'axios';



const FeaturedProducts = () => {
    const [login, setLogin] = useState(true);
    function refreshPage() {
        window.location.reload(true);
    }
    const [clubs, setClubs] = useState([]);
            useEffect(() => {
            fetchClubs();
        }, []);
            const fetchClubs = () => {
            axios
                .get('http://localhost/serverClubs.php',{ withCredentials: true })
                .then((res) => {
                if (res['data']==="NOTLOGIN"){
                    setLogin(false);
                }
                else{
                    console.log(res);
                    setClubs(res.data);
                }
                })
                .catch((err) => {
                console.log(err);
                });
            };

    const RemoveClub = (event) => {
        const data = {
            id :event.target.id
        }
        axios
        .post('http://localhost/serverRemoveClub.php',data,{ withCredentials: true })
        .then((res) => {
            console.log(res);
            if (res['data']==="NOTLOGIN"){
                setLogin(false);
            }
            else {
                alert("Club Removed");
                refreshPage();
            } 
            })
            .catch((err) => {
            console.log(err);
            });
        };
        const updateClubs = (event) => {
            event.preventDefault();
            const tr = Array.from(event.currentTarget.parentNode.children)
            const data = {
              clubID: event.target.id,
              clubName : tr[1].innerText,
              clubDesc : tr[2].innerText
            }    
            console.log(data);
            axios
                .post('http://localhost/serverUpdateClubs.php',data,{ withCredentials: true })
                .then((res) => {
                if (res['data']==="NOTLOGIN"){
                    setLogin(false);
                }
                else if (res["data"] === "SUCCESS"){
                  alert("Club updated Successfully");
                  refreshPage();
                }
                })
                .catch((err) => {
                console.log(err);
                });
            };

            
            const [clubname, setClubname] = useState('')
            const [clubdesc, setclubdesc] = useState('')
            const [clubimage, setImage] = useState('')

            const handleValueChange1 = event => {
                setClubname(event.target.value)
              };

            const handleValueChange2 = event => {
                setclubdesc(event.target.value)
              };
        
            const  onFileChange = (e) => {
                let files = e.target.files;
                let fileReader = new FileReader();
                fileReader.readAsDataURL(files[0]);
                fileReader.onload = (event) => {
                setImage(event.target.result)
                }
            }
            const addClub = (event) => {
                event.preventDefault();
                // console.log(React.Children.count(event.currentTarget.parentNode));
                const data = {
                  name: clubname,
                  desc: clubdesc,
                  image: clubimage
                }    
                console.log(data);
                axios
                    .post('http://localhost/serverAddClubs.php',data)
                    .then((res) => {
                    if (res['data']==="NOTLOGIN"){
                        setLogin(false);
                    }
                    else if (res["data"] === "SUCCESS"){
                      alert("Club Added Successfully");
                      refreshPage();
                    }
                    console.log(res);
                    })
                    .catch((err) => {
                    console.log(err);
                    });
                };

return (
    <div className="student-profile"> 
        {login===false && (<Navigate to="/login" replace={true} />)}
            <Header1 /> 
            <div class="yourproducts">
		                <h3>Clubs</h3>
		            </div>
                <div className='item-container'>
                    {clubs.map((club) => {
                        return (
                    <div className='card' key={club.name}>
                        {/* <img src={`images/${club.image}`} alt='' /> */}
                        <img src={club.images} alt='' />
                        <h3 contentEditable='true'>{club.name}</h3>
                        <p contentEditable='true'>{club.description}</p>
                        <input type="submit" id={club.id} value="Remove Club" onClick={RemoveClub} />
                        <input type="submit" id = {club.id} value="Edit" onClick={updateClubs}/>
                        {/* <input type="file" name="upload" accept=".png,.gif,.jpg,.webp" required/>
                        <input type="submit" name="submit" value="Upload Image"></input> */}
                    </div>
                    )})}
                </div>
                <div class="yourproducts"><h3>Add Club</h3></div>
                <div>
                <label for="advname">Club Name</label>
                <input type="text" value1={clubname} name="clubname" placeholder="Club Name" onChange={handleValueChange1} />
                
                <label for="advname">Club Description</label>
                <input type="text" value2={clubdesc} name="clubdesc" placeholder="Club Description" onChange={handleValueChange2} />

                <label for="advname">Club Image</label>
                <input type="file" name="image" value3={clubimage} accept=".png,.gif,.jpg,.webp" onChange={onFileChange}/>

                <input type="submit" value="submit" onClick={addClub}/>
                </div>
                
    </div>
    
        );
    }
export default FeaturedProducts;