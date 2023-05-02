import { Link } from "react-router-dom";
import axios from "axios";
import styles from '../styles/Homepage.module.css'
export const Navbar = () => {

    async function logout(){
        await axios.get("http://localhost:8080/destroy", {
         withCredentials: true,
       });
    }
  return (
    <div className={styles.container}>
      <ul>
        <li> <Link to="/homepage">Home</Link> </li>
        <li> <Link onClick={logout} to="/login">Logout</Link> </li>
      </ul>
    </div>
  );
};
