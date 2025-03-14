import { useState } from "react";

import "./App.css";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
// import Userregistrationform from "./user folder/user registration/user registration form";
import Userloginform from "./components/auth/userlogin";

import Navbar from "./components/navbar";
import UserShop from "./pages/user/userShop";
import UserCart from "./pages/user/userCart";
// import Userhome from "./user folder/userhome/userhomepage";
// import UserPayment from "./user folder/userPayment/userPayment";
import Adminnavbar from "./components/adminnavbar";
// import AdminHome from "./pages/user/admin/adminHomme";
import Userlist from "./pages/admin/userlist";
import AdminProducts from "./pages/admin/adminProducts";
import { Toaster } from "react-hot-toast";
import AdminHome from "./pages/admin/adminHomme";
import UserRegistrationForm from "./components/auth/user registration form";
import Userhome from "./pages/user/userhomepage";
import UserPaymentAddress from "./pages/user/userPaymentaddress";
import AboutUs from "./pages/user/AboutUs";
import Contact from "./pages/user/Contact";



// import CartProvider from "./context/cartContext";

function App() {
const role=import.meta.env.VITE_roleProtectKey;
  return (
    <>
    <Toaster/>
      {/* <CartProvider> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
          
            <Route path="shop" element={<UserShop />} />
            <Route path="cart" element={<UserCart />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="contact" element={<Contact />} />
            <Route path="/" element={<Userhome />} />
            
          </Route>
          <Route path="signup" element={<UserRegistrationForm />} />
          <Route path="login" element={<Userloginform />} />
          {/* <Route path="payment" element={<UserPayment />} /> */}
          <Route path="paymentaddress" element={<UserPaymentAddress/>}/>
{role===localStorage.getItem('role')?(

          <Route path="admin" element={<Adminnavbar/>}>
             <Route index element={<AdminHome/>}/>
             <Route path="admin/users" element={<Userlist/>}/>
             <Route path="admin/products" element={<AdminProducts/>}/>
         </Route>
):(
  <Route path="/admin/*" element={<Navigate to="/" />} />
)}
        </Routes>
      </BrowserRouter>
      {/* </CartProvider> */}
    </>
  );
}

export default App;
