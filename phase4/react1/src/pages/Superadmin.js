import React, { useState } from 'react';
import axios from 'axios';
import Header1 from "../components/header1";
import { Navigate} from "react-router-dom";


const Superadmin = () => {
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

        return  (
        <main className="main">
          {checkLogin()}
        {login===false && (<Navigate to="/login" replace={true} />)}
        <Header1 />
        <section className= "sub-header">
        <h4>Super Admin</h4>
        <table className="buttons">
          <tbody>
          <tr>
            <td>
              <a href="/manageschooladmin" className="button">Manage School Admin</a>
            </td>
            <td>  
              <a href="/viewqueries" className="button">view Queries</a>
            </td>
            <td>  
                <a href="http://localhost/serverReports.php" className="button">view reports</a>
            </td>
            <td>  
                <a href="https://chatstudent.herokuapp.com/" className="button">Chat</a>
            </td>
          </tr>
          </tbody>
        </table>
        </section>
        </main>
        );
    }


export default Superadmin;
