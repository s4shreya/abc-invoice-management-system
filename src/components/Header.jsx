import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <h1 className={styles.name}>
        <Link to="/">Invoice Management System</Link>
      </h1>
    </div>
  );
};
export default Header;
