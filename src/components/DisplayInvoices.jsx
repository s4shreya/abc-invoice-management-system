import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInvoices, deleteInvoice } from "../actions/invoices";

import { FaChevronCircleDown } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import CardView from "./CardView";
import TableView from "./TableView";
import styles from "./DisplayInvoices.module.css";

const DisplayInvoices = ({ type }) => {
  const [sortType, setSortType] = useState("default");
  const dispatch = useDispatch();
  let invoiceList = useSelector((state) => state.invoices.invoices);

  console.log(`in diaplay count is ${invoiceList.length} ${JSON.stringify(invoiceList[invoiceList.length - 1])}`)

  if (sortType === "increasing") {
    invoiceList = invoiceList
      .slice()
      .sort((a, b) => a.data.invoiceNumber - b.data.invoiceNumber);
  } else if (sortType === "decreasing") {
    invoiceList = invoiceList
      .slice()
      .sort((a, b) => b.data.invoiceNumber - a.data.invoiceNumber);
  }

  useEffect(() => {
    dispatch(getInvoices());
  });

  const removeInvoice = (id) => {
    dispatch(deleteInvoice(id));
  };

  const editInvoice = (id, invoice) => {
    dispatch(editInvoice(invoice));
  };

  return (
    <div className={styles.parent}>
      <div className={styles.dropdown}>
        <button className={styles.dropbtn}>
          Sort Invoices
          <FaChevronCircleDown />
        </button>
        <div className={styles["dropdown-content"]}>
          <ul>
            <li
              style={{ borderBottom: "1px solid cadetblue" }}
              onClick={() => setSortType("increasing")}
            >
              Increasing
              <FaArrowUp style={{ left: "10px" }} />
            </li>
            <li onClick={() => setSortType("decreasing")}>
              Decreasing
              <FaArrowDown />
            </li>
          </ul>
        </div>
      </div>
      <h3 className={styles.heading}>Invoices List</h3>
      {type === "table" && (
        <table className={styles.table}>
          <thead className={styles["table-heading"]}>
            <tr>
              <th>S. No.</th>
              <th>Date</th>
              <th>Bill from</th>
              <th>Bill to</th>
              <th>Total Items</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody className={styles["table-body"]}>
            {invoiceList.map((invoice) => (
              <TableView
                key={invoice.id}
                id={invoice.id}
                invoice={invoice.data}
                deleteInvoice={removeInvoice}
                editInvoice={editInvoice}
              />
            ))}
          </tbody>
        </table>
      )}
      {type === "card" && (
        <div className={styles.container}>
          {invoiceList.map((invoice) => (
            <CardView
              key={invoice.id}
              id={invoice.id}
              invoice={invoice.data}
              deleteInvoice={removeInvoice}
              editInvoice={editInvoice}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default DisplayInvoices;
