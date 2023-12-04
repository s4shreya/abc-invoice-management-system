import axios from "axios";

const BASE_URL =
  "https://abc-invoice-management-system-default-rtdb.firebaseio.com";

export const createInvoice = (newInvoice) =>
  axios.post(`${BASE_URL}/invoices.json`, newInvoice);

export const getInvoices = () => axios.get(`${BASE_URL}/invoices.json`);

export const deleteInvoice = (id) =>
  axios.delete(`${BASE_URL}/invoices/${id}.json`);

export const editInvoice = (id, updatedInvoice) =>
  axios.put(`${BASE_URL}/invoices/${id}.json`, updatedInvoice);
