import { Link } from "react-router-dom";
import { IoMdAddCircleOutline } from "react-icons/io";
import styles from "./Homepage.module.css";
import DisplayInvoices from "../components/DisplayInvoices";

const Homepage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
      <nav>some</nav>
      <Link to="/add-invoice" className={styles["add-button"]}><IoMdAddCircleOutline />Add Invoice</Link>
      </div>
      <div>
        <DisplayInvoices type="table" />
      </div>
    </div>
  );
};
export default Homepage;
