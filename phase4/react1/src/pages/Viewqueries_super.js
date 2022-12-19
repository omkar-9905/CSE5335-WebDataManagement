import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header1 from "../components/header1";
import {  Navigate} from "react-router-dom";

const ViewQueries_super = () => {
  const [login, setLogin] = useState(true);
  const [Query, setQuery] = useState([]);
      useEffect(() => {
        fetchQueries();
      }, []);
      const fetchQueries = () => {
      axios
          .get('http://localhost/serverGetQuery.php',{ withCredentials: true })
          .then((res) => {
          console.log(res)
          if (res['data']==="NOTLOGIN"){
              setLogin(false);
          }
          else{
            setQuery(res.data);
          }
          })
          .catch((err) => {
          console.log(err);
          });
      };

    return (
      <div><Header1 />
      {login===false && (<Navigate to="/login" replace={true} />)}
        <h1>Queries</h1>
        <table>
        <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Query</th>
            <th>PhoneNumber</th>
            <th>Email</th>
    </tr>
    {Query.map((qu) => {
          return (
          
            <tr key={qu.id}>
              <td>{qu.fname}</td>
              <td>{qu.lname}</td>
              <td>{qu.email}</td>
              <td>{qu.phoneNumber}</td>
              <td>{qu.Query}</td>
            </tr>
            );
        })}
    </table>    
    </div>
    );
  }
export default ViewQueries_super;