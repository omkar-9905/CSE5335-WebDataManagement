
import Header1 from "../components/header1";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  Navigate} from "react-router-dom";

const StudentData = () => {
  const [login, setLogin] = useState(true);
  const [students, setStudent] = useState([]);
      useEffect(() => {
      fetchProducts();
  }, []);
      const fetchProducts = () => {
      axios
          .get('http://localhost/serverUserData.php',{ withCredentials: true })
          .then((res) => {
          console.log(res)
          if (res['data']==="NOTLOGIN"){
              setLogin(false);
          }
          else{
            setStudent(res.data);
          }
          })
          .catch((err) => {
          console.log(err);
          });
      };
      function refreshPage() {
        window.location.reload(true);
    }
    const removeStudent = (event) => {
      event.preventDefault();
      const data = {
        id: event.target.id
      }
      axios
          .post('http://localhost/serverUserDelete.php',data,{ withCredentials: true })
          .then((res) => {
          if (res['data']==="NOTLOGIN"){
              setLogin(false);
          }
          else if (res['data']==="SUCCESS"){
            alert("Student Removed Successfully");
            refreshPage();
          }
          })
          .catch((err) => {
          console.log(err);
          });
      };

      const updateStudent = (event) => {
        event.preventDefault();
        //console.log(React.Children.count(event.currentTarget.parentNode));
        const tr = Array.from(event.currentTarget.parentNode.children)
        const data = {
          fname : tr[0].innerText,
          lname : tr[1].innerText,
          major : tr[2].innerText,
          phoneNumber : tr[3].innerText,
          type : tr[4].innerText,
          email: tr[5].innerText
        }    
        console.log(data);
        axios
            .post('http://localhost/serverUpdateUser.php',data,{ withCredentials: true })
            .then((res) => {
            if (res['data']==="NOTLOGIN"){
                setLogin(false);
            }
            else if (res["data"] === "SUCCESS"){
              alert("Student updated Successfully");
              refreshPage();
            }
            })
            .catch((err) => {
            console.log(err);
            });
        };
  return(
    <div><Header1 />
    {login===false && (<Navigate to="/login" replace={true} />)}
    <h2>Manage Student</h2>
    <table>
    <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Major</th>
            <th>PhoneNumber</th>
            <th>Type</th>
            <th>Email</th>
            {/* <th>Password</th> */}
    </tr>
    {students.map((student) => {
          return (
          
            <tr key={student.studentID}>
              <td contenteditable='true'>{student.fname}</td>
              <td contenteditable='true'>{student.lname}</td>
              <td contenteditable='true'>{student.major}</td>
              <td contenteditable='true'>{student.phoneNumber}</td>
              <td contenteditable='true'>{student.type}</td>
              <td contenteditable='false'>{student.email}</td>
              {/* <td contenteditable='true'>{student.password}</td> */}
              <input type="submit" id={student.studentID} value="Remove" onClick={removeStudent}/>&nbsp;
              <input type="submit" value="Edit" onClick={updateStudent}/>
            </tr>
            );
        })}
    </table>    
    </div>
)}

export default StudentData;