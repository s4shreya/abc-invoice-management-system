import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import styles from "./CardView.module.css";

const CardView = ({ invoice }) => {
  console.log(JSON.stringify(invoice));
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
      <p>Total Items: {invoice.items.length}</p>
      <p>Total Amount: {invoice.total}</p>
      <div className={styles.actions}>
        <button>
          <FaEye />
          <br />
          View
        </button>
        <button>
          <FaEdit />
          <br />
          Edit
        </button>
        <button>
          <MdDelete /> <br />
          Delete
        </button>
      </div>
    </div>
  );
};
export default CardView;
