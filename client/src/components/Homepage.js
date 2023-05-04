import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "./Navbar";
import { useNavigate } from "react-router-dom";
import styles from '../styles/Homepage.module.css';
export const Homepage = () => {

    const [login, setLoginStatus] = useState("");
    const navigate = useNavigate();

     async function getData() {
       const response = await axios.get("http://localhost:8080/login", {
         withCredentials: true,
       });
       if (response.data.authenticated === true) {
         setLoginStatus(response.data.user.email);
       }else{
        navigate("/login");
       }
     }

     useEffect(() => {
       getData();
     }, []);

  return (
    <div>
      <Navbar />

      <div className={styles.loggedIn}>
        <h1>Hello {login}</h1>
      </div>
    </div>
  );
};