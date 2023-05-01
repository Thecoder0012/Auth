import { Link } from "react-router-dom";
import styles from '../styles/Homepage.module.css'
export const Navbar = () => {
  return (
    <div className={styles.container}>
      <ul>
        <li> <Link to="/homepage">Home</Link> </li>
        <li> <Link to="/login">Logout</Link> </li>
      </ul>
    </div>
  );
};
