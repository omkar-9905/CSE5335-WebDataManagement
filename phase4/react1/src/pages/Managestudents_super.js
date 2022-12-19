import React from "react";
import Header1 from "../components/header1";



class ManageStudent_super extends React.Component{
    render()
    {
      return(
        <div><Header1 />
        <main className="main">
        <section className = "sub-header">
        <h2>Manage Student <button type="button">Add Student</button></h2>

        <table className="table1">
        <tr>
          <th style={{width:"7%"}} >Sr. No</th>
          <th style={{width:"15%"}}>Name</th>
          <th style={{width:"15%"}}>Action</th>
        </tr>
        <tr>
          <td>1</td>
          <td>Abhishek</td>
          <td><button type="button">Remove Student</button></td>
        </tr>
        <tr>
          <td>2</td>
          <td>Anichay</td>
          <td><button type="button">Remove Student</button></td>
        </tr>
        <tr>
          <td>3</td>
          <td>Benny</td>
          <td><button type="button">Remove Student</button></td>
        </tr>
        <tr>
            <td>4</td>
            <td>Theo</td>
            <td><button type="button">Remove Student</button></td>
          </tr>
        <tr>
          <td>5</td>
          <td>Kanishk</td>
          <td><button type="button">Remove Student</button></td>
        </tr>
        </table>
        </section>
        </main>
        </div>
      );   
    }
}

export default ManageStudent_super;