import React, { useState } from 'react';
import Header1 from "../components/header1";
import {NavLink, Navigate} from "react-router-dom";
import axios from 'axios';



const Schooladmin = () =>{
  const [login, setLogin] = useState(true);

  const checkLogin = () => {
    axios
        .get('http://localhost/serverCheckID.php',{ withCredentials: true })
        .then((res) => {
        console.log(res)
        if (res['data']==="NOTLOGIN"){
            setLogin(false);
        }
        else{
            console.log(res.data);
        }
        })
        .catch((err) => {
        console.log(err);
        });
    };
        return(
          <div>
            {checkLogin()}
            {login===false && (<Navigate to="/login" replace={true} />)}
          <main class="main">
          <Header1 />
          <section class = "sub-header">
          <h4>School Admin</h4>
          <table class="buttons">
            <tr>
              <td>
              <NavLink to ="/managestudentschool"><a className="button">Manage Users </a></NavLink>
              </td>
              <td>  
              <NavLink to ="/clubs"><a class="button">Manage Clubs </a></NavLink>
              </td>
              <td>  
              <a href="http://localhost/serverReports.php" className="button">view reports</a>
              </td>
              <td>  
              <a href="https://chatstudent.herokuapp.com/" className="button">Chat</a>
              </td>
            </tr>
          </table>
          </section>
        </main>
        </div>
  
        );
      } 


export default Schooladmin;
