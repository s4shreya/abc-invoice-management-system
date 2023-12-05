import { createSlice } from "@reduxjs/toolkit";
import {
  createInvoice,
  getInvoices,
  deleteInvoice,
  editInvoice,
} from "../actions/invoices";

const initialState = {
  invoices: [],
};

export const InvoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createInvoice.fulfilled, (state, action) => {})
      .addCase(getInvoices.fulfilled, (state, action) => {
        const invoicesList = [];
        for (let key in action.payload) {
          invoicesList.push({
            id: key,
            data: action.payload[key],
          });
        }
        state.invoices = invoicesList;
      })
      .addCase(deleteInvoice.fulfilled, (state, action) => {
        state.invoices = state.invoices.filter(
          (invoice) => invoice.id !== action.payload
        );
      })
      .addCase(editInvoice.fulfilled, (state, action) => {
        state.invoices = state.invoices.map((invoice) =>
          invoice.id === action.payload.id ? action.payload : invoice
        );
        console.log(
          `in slice length is ${state.invoices.length} jdfj ${JSON.stringify(
            state.invoices
          )}`
        );
      });
  },
});

export default InvoiceSlice.reducer;
