import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdAddCircleOutline } from "react-icons/io";
import styles from "./Homepage.module.css";
import DisplayInvoices from "../components/DisplayInvoices";

const Homepage = () => {
  const [viewType, setViewType] = useState("card");
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <nav>
          <ul className={styles["menu-items"]}>
            <li>
              <button onClick={() => setViewType("card")}>Card</button>
            </li>
            <li>
              <button onClick={() => setViewType("table")}>Table</button>
            </li>
          </ul>
        </nav>
      </div>
        <Link to="/add-invoice" className={styles["add-button"]}>
          <IoMdAddCircleOutline />
          Add Invoice
        </Link>
      <div>
        <DisplayInvoices type={viewType} />
      </div>
    </div>
  );
};
export default Homepage;
