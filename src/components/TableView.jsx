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
    props.deleteInvoice(invoice.invoiceNumber);
  };

  return (
    <>
      <tr>
        <td>#{invoice.invoiceNumber}</td>
        <td>{invoice.dateOfIssue}</td>
        <td>{invoice.billFrom}</td>
        <td>{invoice.billTo}</td>
        <td>{invoice.items.length}</td>
        <td>{invoice.total}</td>
        <td className={styles.actions}>
            <button onClick={viewInvoiceHandler}>
              <FaEye />
            </button>
            <Link to={`/edit-invoice/${invoice.invoiceNumber}`}>sample</Link>
            <button>
              <FaEdit />
            </button>
            <button onClick={deleteInvoiceHandler}>
              <MdDelete /> 
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
