import { useState } from "react";

import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import styles from "./TableView.module.css";
import InvoiceModal from "./InvoiceModal";
import { Link } from "react-router-dom";

const TableView = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const invoice = props.invoice;

  const viewInvoiceHandler = () => setIsModalOpen(true);
  const deleteInvoiceHandler = () => {
    if (window.confirm("Are you sure you want to delete this invoice?"))
      props.deleteInvoice(props.id);
  };

  return (
    <>
      <tr>
        <td>#{invoice.invoiceNumber}</td>
        <td>{invoice.dateOfIssue}</td>
        <td>{invoice.billFrom}</td>
        <td>{invoice.billTo}</td>
        <td>{invoice.items === undefined ? 0 : invoice.items.length}</td>
        <td>{invoice.total}</td>
        <td className={styles.actions}>
            <button onClick={viewInvoiceHandler}>
              <FaEye />
            </button>
            <button>
          
          <Link to={`/edit-invoice/${props.id}`}><FaEdit /></Link>
        </button>
        <button onClick={deleteInvoiceHandler}>
          <MdDelete /> <br />
        </button>
        </td>
      </tr>

      {isModalOpen && (
        <InvoiceModal
          showModal={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          info={invoice}
          items={invoice.items}
          currency={invoice.currency}
          subTotal={invoice.subTotal}
          taxAmmount={invoice.taxAmmount}
          discountAmmount={invoice.discountAmmount}
          total={invoice.total}
        />
      )}
    </>
  );
};
export default TableView;
