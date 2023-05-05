import { Link } from "react-router-dom";
import axios from "axios";
import styles from '../styles/Homepage.module.css'
import { API_URL } from "../urlConfig";

export const Navbar = () => {

    const WITH_CREDENTIALS = { withCredentials: true };

    async function logout(){
        await axios.get(API_URL + "/destroy", WITH_CREDENTIALS);
    }
  return (
    <div className={styles.container}>
      <ul>
        <li> <Link to="/homepage">Home</Link> </li>
        <li> <Link onClick={logout} to="/">Logout</Link> </li>
      </ul>
    </div>
  );
};
