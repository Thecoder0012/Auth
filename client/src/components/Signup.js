import styles from "../styles/Login.module.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const Signup = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/signup", {
        email: credentials.email,
        password: credentials.password,
      });
      if (response.status === 200) {
        setMessage(response.data.message);
      }
    } catch (err) {
      setMessage(err.response.data.message);
    }
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
        <div className={styles.signUpMessage}>
          <p
            style={
              message.charAt(0) === "Y" ? { color: "green" } : { color: "red" }
            }
          >
            {message}
          </p>
        </div>
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

      <div className={styles.signUpButton}>
        <p>
          <Link to="/login">Sign in here if you have registered!</Link>
        </p>
      </div>
    </div>
  );
};
