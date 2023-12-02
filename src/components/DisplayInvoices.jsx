import { useDispatch, useSelector } from "react-redux";
import { deleteInvoice, editInvoice } from "../reducers/InvoiceSlice";

import CardView from "./CardView";
import TableView from "./TableView";
import styles from './DisplayInvoices.module.css';

const DisplayInvoices = ({ type }) => {
  const dispatch = useDispatch();
  const invoiceList = useSelector((state) => state.invoices.invoices);
  const removeInvoice = (id) => {
    dispatch(deleteInvoice(id));
  };

  const editInvoice = (invoice) => {
    dispatch(editInvoice(invoice));
  };

  return (
    <div className="">
      Invoices
      {type === "table" && (
        <table className={styles.table}>
          <thead className={styles["table-heading"]}>
            <tr>
              <th>Invoice No.</th>
              <th>Date</th>
              <th>Bill from</th>
              <th>Bill to</th>
              <th>Total Items</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          
    <tbody className={styles["table-body"]}>
          {invoiceList.map((invoice, index) => (
            <TableView
              key={index}
              invoice={invoice}
              deleteInvoice={removeInvoice}
              editInvoice={editInvoice}
            />
          ))}
          </tbody>
        </table>
      )}
      {type === "card" &&
        invoiceList.map((invoice, index) => (
          <CardView
            key={index}
            invoice={invoice}
            deleteInvoice={removeInvoice}
            editInvoice={editInvoice}
          />
        ))}
    </div>
  );
};
export default DisplayInvoices;
