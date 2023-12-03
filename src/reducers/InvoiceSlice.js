import { createSlice } from "@reduxjs/toolkit";
import { createInvoice, getInvoices } from "../actions/invoices";

const initialState = {
  invoices: [],
};

export const InvoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    addInvoice: (state, action) => {
      state.invoices = [action.payload, ...state.invoices];
    },
    editInvoice: (state, action) => {
      state.invoices = state.invoices.map((invoice) =>
        invoice.invoiceNumber === action.payload.invoiceNumber
          ? action.payload
          : invoice
      );
    },
    deleteInvoice: (state, action) => {
      state.invoices = state.invoices.filter(
        (invoice) => invoice.invoiceNumber !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createInvoice.fulfilled, (state, action) => {
        state.invoices = [action.payload, ...state.invoices];
      })
      .addCase(getInvoices.fulfilled, (state, action) => {
        state.invoices = action.payload;
      });
  },
});

export const { addInvoice, editInvoice, deleteInvoice } = InvoiceSlice.actions;
export default InvoiceSlice.reducer;
