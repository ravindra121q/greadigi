// import React, { useEffect } from "react";
// import { Navigate } from "react-router-dom";

// function ProtectedRoutes({ children }) {
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     // check if token is present, if not redirect to signin
//     if (!token) {
//       window.location.replace("/login");
//     }
//   }, [token]);

//   // if token is present, return the children
//   return <>{token ? children : <Navigate to="/login" />}</>;
// }

// export default ProtectedRoutes;

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = (props) => {
  const { Component } = props;
  const navigate = useNavigate();
  const storeToken = useSelector((store) => store.token.TOKEN);
  useEffect(() => {
    let authDetails = JSON.parse(localStorage.getItem("token"));
    // console.log("token", authDetails);
    if (!storeToken) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Component />
    </div>
  );
};

export default ProtectedRoutes;

// import jwtDecode from 'jwt-decode';
// import React, { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom';

// function ProtectRoutes(props) {
//   const { Component } = props;
//   const navigate=useNavigate()

// const getToken=()=>{

//   const token =localStorage.getItem("token")
//   if (token) {

//     return (
//       <div>
//         <Component />
//       </div>
//     );

//   }else{
//     navigate("/signin")
//   }
// }

// useEffect(()=>{
// getToken()
// },[])

// }

// export default ProtectRoutes

// const decodedToken = jwtDecode(token);

//     console.log("decode",decodedToken)
//   const isAdmin = decodedToken.isAdmin;
//     if(isAdmin){
// console.log("I AM ADMIN")
//     }else{
//       console.log("I AM USER")
//     }
//
//  const uid=decodedToken.userId
//  console.log(decodedToken.isAdmin,"tyyytt")
