import React, { useEffect, useState } from 'react'
import { createBrowserRouter, createHashRouter, Navigate, RouterProvider } from 'react-router-dom'
import Home from './Home/Home'
import Layout from './Layout/Layout'
import Login from './Login/Login'
import Notfound from './Notfound/Notfound'
import Products from './Products/Products'
import Profile from './Profile/Profile'
import Register from './register/Register'
import jwt_decode from "jwt-decode";
import ForgetPasword from './ForgetPasword/ForgetPasword'
import ResetPassword from './ResetPassord/ResetPassword'
import ProductDetails from './ProductDetails/ProductDetails'
import CategorycontextProvider from './ShareData/CategoryContext'
import { CartContextProvider } from './ShareData/CartContext'
import CartDetails from './CartDetails/CartDetails'
import CheckOut from './CheckOut/CheckOut'
export default function App() {
  let [userData,setuserData]= useState(null);

  function saveUserData(data){
    setuserData(data);
  }
  useEffect(()=>{
    if(localStorage.getItem("token")){
      let token= localStorage.getItem("token");
      let data=jwt_decode(token);
      
      saveUserData(data);
    }
  },[])
  function ProtectedRouting(props){
    if(localStorage.getItem("token")){
      return props.children;
    }else{
      return <Navigate to='/login'/>;
    }
  }
  function logOut(){
    setuserData("null");
    localStorage.removeItem("token");
    <Navigate to='/login'/>
  }
  function ProtectedRouter2(props){
    if(localStorage.getItem("token")){
      return <Navigate to='/home' />
    }else{
      return props.children;
    }
  }
  let routers= createHashRouter([
    {
      path:"", element: <Layout logOut={logOut} userData={userData}/>, children:[
        {path:"home", element: <ProtectedRouting> <Home/> </ProtectedRouting> },
        {path:"products", element: <ProtectedRouting> <Products/> </ProtectedRouting>},
        {path:"cartdetails", element: <ProtectedRouting> <CartDetails/> </ProtectedRouting>},
        {path:"checkout/:cardId", element: <ProtectedRouting> <CheckOut/> </ProtectedRouting>},
        {path:"productDetails/:id", element: <ProtectedRouting> <ProductDetails/> </ProtectedRouting>},
        {path:"profile", element: <rotectedRouting> <Profile userData={userData} /></rotectedRouting>},
        {path:"login", element: <Login saveUserData={saveUserData}/>},
        {index:true, element: <ProtectedRouter2><Register/></ProtectedRouter2>},
        {path:"forgetpassword", element: <ForgetPasword/>},
        {path:"resetPassword", element: <ResetPassword/>},
        {path:"*", element: <Notfound/>},
      ]
    }
  ])
  return (
    <CategorycontextProvider>
      <CartContextProvider>

        <RouterProvider router={routers}/>
      </CartContextProvider>

    </CategorycontextProvider>
  )
}
