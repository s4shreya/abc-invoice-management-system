import { useDispatch, useSelector } from "react-redux";
import { deleteInvoice, editInvoice } from "../reducers/InvoiceSlice";

import CardView from "./CardView";
import TableView from "./TableView";

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
    <div>
      DisplayInvoices
      {invoiceList.map((invoice, index) =>
        type === "card" ? (
          <CardView
            key={index}
            invoice={invoice}
            deleteInvoice={removeInvoice}
            editInvoice={editInvoice}
          />
        ) : (
          <TableView key={index} invoice={invoice} />
        )
      )}
    </div>
  );
};
export default DisplayInvoices;
