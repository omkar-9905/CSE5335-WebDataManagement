import React from "react";
import Header1 from "../components/header1";


class ManageBusinessOwner_school extends React.Component{
    render()
    {
        return ( 
          <div><Header1 />
        <main className="main">
        <section className = "sub-header">
        <h2>Manage Business Owner <button type="button">Add Business Owner</button></h2>

        <table className="table1">
        <tbody>
        <tr>
          <th style={{width:"7%"}} >Sr. No</th>
          <th style={{width:"15%"}}>Name</th>
          <th style={{width:"15%"}}>Action</th>
        </tr>
        <tr>
          <td>1</td>
          <td>Jaykan</td>
          <td><button type="button">Remove Business Owner</button></td>
        </tr>
        <tr>
          <td>2</td>
          <td>Devarsh</td>
          <td><button type="button">Remove Busines Owner</button></td>
        </tr>
        <tr>
          <td>3</td>
          <td>Nina</td>
          <td><button type="button">Remove Business Owner</button></td>
        </tr>
        </tbody>
        </table>
        </section>
        </main>
        </div>
        );  
  }

}

export default ManageBusinessOwner_school;