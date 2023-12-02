import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import InvoiceItemRow from "./InvoiceItemRow";

const InvoiceItems = (props) => {
  let onItemizedItemEdit = props.onItemizedItemEdit;
  let currency = props.currency;
  let rowDel = props.onRowDel;
  let itemTable = props.items.map((item) => {
    return (
      <InvoiceItemRow
        onItemizedItemEdit={onItemizedItemEdit}
        item={item}
        onDelEvent={rowDel}
        key={item.id}
        currency={currency}
      />
    );
  });
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>ITEM</th>
            <th>QTY</th>
            <th>PRICE/RATE</th>
            <th className="text-center">ACTION</th>
          </tr>
        </thead>
        <tbody>{itemTable}</tbody>
      </Table>
      <Button className="fw-bold" onClick={props.onRowAdd}>
        Add Item
      </Button>
    </div>
  );
};
export default InvoiceItems;
