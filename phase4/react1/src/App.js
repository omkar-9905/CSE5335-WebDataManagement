import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import Student from "./pages/Student";
import Studentprofile from "./pages/Studentprofile";
import Clubs from "./pages/Clubs";
import Products from "./pages/Products";
import Businessowner from "./pages/Businessowner";
import Cart from "./pages/Cart";
import Manageadsbo from "./pages/Manageadsbo";
// import Chat from "./pages/Chat";
import Manageproductsbo from "./pages/Manageproductsbo";
import Superadmin from "./pages/Superadmin";
import Schooladmin from "./pages/Schooladmin";
import ManageBusinessOwnerschool from "./pages/Managebusinessowner_school";
import Managestudentsschool from "./pages/Managestudents_school"
import ManageSchoolAdminsuper from "./pages/Manageschooladmin_super";
import ManageBusinessOwnersuper from "./pages/Managebusinessowner_super";
import ViewQueriessuper from "./pages/Viewqueries_super";
import ManageStudentsuper from "./pages/Managestudents_super";
import Sellproducts from "./pages/Sellproducts";
import Postadv from "./pages/Postadv";
import Payment from "./pages/paymentspage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
           <Route exact path="/" element= {<Home />}/>
           <Route path="/about" element= {<About />}/>
           <Route path="/services" element= {<Services />}/>
           <Route path="/contact" element= {<Contact />}/>
           <Route path="/login" element= {<Login />}/>
           <Route path="/register" element= {<Register />}/>
           <Route path="/student" element= {<Student />}/>
           <Route path="/studentprofile" element= {<Studentprofile />}/>
           <Route path="/products" element= {<Products />}/>
           <Route path="/clubs" element= {<Clubs />}/>
           <Route path="/businessowner" element= {<Businessowner />}/>
           <Route path="/manageproductsbo" element= {<Manageproductsbo />}/>
           <Route path="/manageadsbo" element= {<Manageadsbo />}/>
           {/* <Route path="/chat" element= {<Chat />}/> */}
           <Route path="/Cart" element= {<Cart />}/>
           <Route path="/super" element= {<Superadmin />}/>
           <Route path="/school" element= {<Schooladmin />}/>
           <Route path="/managestudentschool" element= {<Managestudentsschool />}/>
           <Route path="/managerbusinessowner" element= {<ManageBusinessOwnerschool />}/>
           <Route path="/manageschooladmin" element= {<ManageSchoolAdminsuper />}/>
           <Route path="/managebusinessownersuper" element= {<ManageBusinessOwnersuper />}/>
           <Route path="/viewqueries" element= {<ViewQueriessuper />}/>
           <Route path="/managestudentsuper" element= {<ManageStudentsuper />}/>
           <Route path="/sellproducts" element= {<Sellproducts />}/>
           <Route path="/postadv" element= {<Postadv />}/>
           <Route path="/payment" element= {<Payment />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
