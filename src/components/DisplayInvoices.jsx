import { useSelector } from "react-redux";

import CardView from "./CardView";
import TableView from "./TableView";

const DisplayInvoices = ({ type }) => {
  const invoiceList = useSelector((state) => state.invoices.invoices);
  console.log(`in display ${JSON.stringify(invoiceList)}`);
  return (
    <div>
      DisplayInvoices
      {invoiceList.map((invoice, index) =>
        type === "card" ? (
          <CardView key={index} invoice={invoice} />
        ) : (
          <TableView key={index} invoice={invoice} />
        )
      )}
    </div>
  );
};
export default DisplayInvoices;
