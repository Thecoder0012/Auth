import styles from "../styles/Login.module.css";
import  { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../urlConfig";


import axios from "axios";

export const Signup = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
    const { email, password } = credentials;


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(API_URL + "/signup", {
        email: email,
        password: password,
      });
      if (response.status === 200) {
        toast.success(response.data.message);
      }
    } catch (err) {
      toast.error(err.response.data.message)
    }
  };

  const handleInputChange = (event) => {
    setCredentials(previousCredentials => ({
      ...previousCredentials,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="">
      <ToastContainer />

      <form onSubmit={handleSubmit} className={styles.container} method="POST">
        <h1>Sign up</h1>
        <p>
          <input
            id="Email"
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleInputChange}
            required
          />
        </p>
        <p>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleInputChange}
            required
          />
        </p>
        <input type="submit" id={styles.submit} value="Sign up" />
      </form>

      <div className={styles.signUpButton}>
        <p>
          <Link to="/">Sign in here if you have registered!</Link>
        </p>
      </div>
    </div>
  );
};
