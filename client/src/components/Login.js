import styles from "../styles/Login.module.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [message,setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
   const response = await axios.post("http://localhost:8080/login", {
      email: credentials.email,
      password: credentials.password,
    },{withCredentials:true});
    response.data.id > 0 && response.data !== null ? (
      window.location.replace("/homepage")
    ) : setMessage("Wrong credentials");
    }
  

  const inputChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="">
      <form onSubmit={submit} className={styles.container} method="POST">
        <p style={{ color: "red" }}>{message}</p>
        <h1>Login</h1>
        <p>
          <input
            id="Email"
            type="text"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={inputChange}
            required
          />
        </p>
        <p>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={inputChange}
            required
          />
        </p>
        <input type="submit" id={styles.submit} value="Sign in" />
      </form>

      <div className={styles.signUpButton}>
        <p>
          <Link to="/signup">Not registered yet? Sign up here!</Link>
        </p>
      </div>
    </div>
  );

}