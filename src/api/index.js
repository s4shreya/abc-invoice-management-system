import axios from "axios";

const BASE_URL =
  "https://abc-invoice-management-system-default-rtdb.firebaseio.com/invoices.json";

export const createInvoice = (newInvoice) => axios.post(BASE_URL, newInvoice);
export const getInvoices = () => axios.get(BASE_URL);