import { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "./Navbar";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Homepage.module.css";
import { API_URL } from "../urlConfig";

export const Homepage = () => {
  const [login, setLoginStatus] = useState("");
  const navigate = useNavigate();
  const WITH_CREDENTIALS = {withCredentials: true};

   const checkAuth = (response) => {
     return !response.data.authenticated
       ? navigate("/")
       : setLoginStatus(response.data.user.email);
   }

  useEffect(() => {
    async function getData() {
      const response = await axios.get(API_URL + "/login", WITH_CREDENTIALS);
      checkAuth(response);
    }
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
