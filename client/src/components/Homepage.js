import React, { useEffect, useState } from "react";
import axios from "axios";
export const Homepage = () => {

    const [login, setLoginStatus] = useState("");

     async function getData() {
       const response = await axios.get("http://localhost:8080/login", {
         withCredentials: true,
       });

       if (response.data.authenticated === true) {
         setLoginStatus(response.data.user.email);
       }
     }

     useEffect(() => {
       getData();
     }, []);
  return (
    <div>
      <h1>Hello {login}</h1>
    </div>
  );
};
