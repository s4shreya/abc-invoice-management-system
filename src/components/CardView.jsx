import { useState } from "react";

import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import styles from "./CardView.module.css";
import InvoiceModal from "./InvoiceModal";
import { Link } from "react-router-dom";

const CardView = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const invoice = props.invoice;

  const viewInvoiceHandler = () => setIsModalOpen(true);
  const deleteInvoiceHandler = () => {
    if (window.confirm("Are you sure you want to delete this invoice?"))
      props.deleteInvoice(props.id);
  };

  return (
    <div className={styles.container}>
      <p>#{invoice.invoiceNumber}</p>
      <p>Date: {invoice.dateOfIssue}</p>
      <p>
        Bill From:
        <br />
        {invoice.billFrom}
      </p>
      <p>
        Bill To:
        <br />
        {invoice.billTo}
      </p>
      <p>
        Total Items: {invoice.items === undefined ? 0 : invoice.items.length}
      </p>
      <p>Total Amount: {invoice.total}</p>
      <div className={styles.actions}>
        <button onClick={viewInvoiceHandler}>
          <FaEye />
          <br />
          View
        </button>
        <button>
          <FaEdit />
          <br />
          <Link to={`/edit-invoice/${props.id}`}>Edit</Link>
        </button>
        <button onClick={deleteInvoiceHandler}>
          <MdDelete /> <br />
          Delete
        </button>
      </div>
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
    </div>
  );
};
export default CardView;
