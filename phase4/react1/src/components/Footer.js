import React from 'react';

class Footer extends React.Component{
    render(){
        return (
      <section className = "footer">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <h4>About Us</h4>
      <p>To know more about market place please visit our social media sites</p>
      <div className = "icons">
        <i className="fa fa-facebook"></i>
        <i className="fa fa-twitter"></i>
        <i className="fa fa-instagram"></i>
        <a href="http://oxg7237.uta.cloud/studet_blog/uncategorized/student-portal/"><i className="fa fa-wordpress"></i></a>
      </div>
    </section>
        );
    }
}
export default Footer;
 


