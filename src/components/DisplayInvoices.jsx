import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editInvoice } from "../reducers/InvoiceSlice";
import { getInvoices, deleteInvoice } from "../actions/invoices";

import CardView from "./CardView";
import TableView from "./TableView";
import styles from "./DisplayInvoices.module.css";

const DisplayInvoices = ({ type }) => {
  const dispatch = useDispatch();
  const invoiceList = useSelector((state) => state.invoices.invoices);

  useEffect(() => {
    dispatch(getInvoices());
  }, [dispatch]);

  const removeInvoice = (id) => {
    dispatch(deleteInvoice(id));
  };

  const editInvoice = (invoice) => {
    dispatch(editInvoice(invoice));
  };

  return (
    <div className="">
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
