// src/context/UserContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};
//it is prectice purpuses
export const loginStatus = () => {
    return useContext(UserContext);
  };
  
// Provider component
export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(localStorage.getItem("Userid"));
  const [loginStatus, setLoginStatus] = useState(sessionStorage.getItem("LoginStatus"));
  const [usertypeInstru, setUsertypeInstructor] = useState(sessionStorage.getItem("UsertypeInstru"));
  const [usertype, setUsertypeStudent] = useState(sessionStorage.getItem("UsertypeStudent"));

  console.log("user ststus",loginStatus);

 console.log("usertype student in auth",usertype);
 
 const he =localStorage.getItem("Usertype")
  console.log("usertype in auth",he);
  const logout2 = () => { 
    sessionStorage.removeItem('Usertype');
    sessionStorage.removeItem('UsertypeIn');
    sessionStorage.removeItem('UsertypeStudent');
    sessionStorage.removeItem('UsertypeInstru');


    setUserId(null);
    setLoginStatus(null);
    setUsertypeStudent(null);
    setUsertypeInstructor(null);
  };

  useEffect(() => {
    // Sync the values with sessionStorage and localStorage
    if (userId) {
      localStorage.setItem("Userid", userId);
    }
    if (loginStatus) {
      sessionStorage.setItem("LoginStatus", loginStatus);
    }
    
    if (usertypeInstru){
      sessionStorage.setItem("UsertypeIn", usertypeInstru);
   }
   
    if (usertype){
      sessionStorage.setItem("Usertype", usertype);
    }
  }, [userId, loginStatus, usertypeInstru, usertype,logout2]);

  console.log("2user type is==",usertypeInstru);
  console.log("2usertype student in auth==",usertype);
  const updateUser = (id, status) => {
    setUserId(id);
    setLoginStatus(status);
  };


  
  return (
    <UserContext.Provider value={{ userId, loginStatus, updateUser, logout2, setUsertypeStudent, setUsertypeInstructor, usertype, usertypeInstru }}>
      {children}
    </UserContext.Provider>
  );
};
