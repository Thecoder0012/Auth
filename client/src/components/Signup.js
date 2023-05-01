import styles from '../styles/Login.module.css'
import React, { useState } from "react";
import axios from "axios";

export const Signup = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
})

  const submit = async (e) => {
    e.preventDefault();
   const response = await axios.post("http://localhost:8080/signup", {
      email: credentials.email,
      password: credentials.password,
    });

   window.location.replace('/login');
  };

  const inputChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };



  return (
    <div className="">
      <form onSubmit={submit} className={styles.container} method="POST">
        <h1>Sign up</h1>
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
        <input type="submit" id={styles.submit} value="Sign up" />
      </form>
    </div>
  );
  }
