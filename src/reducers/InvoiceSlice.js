import { createSlice } from "@reduxjs/toolkit";
import { createInvoice, getInvoices, deleteInvoice } from "../actions/invoices";

const initialState = {
  invoices: [],
};

export const InvoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    // addInvoice: (state, action) => {
    //   state.invoices = [action.payload, ...state.invoices];
    // },
    // editInvoice: (state, action) => {
    //   state.invoices = state.invoices.map((invoice) =>
    //     invoice.invoiceNumber === action.payload.invoiceNumber
    //       ? action.payload
    //       : invoice
    //   );
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createInvoice.fulfilled, (state, action) => {
        state.invoices = [action.payload, ...state.invoices];
      })
      .addCase(getInvoices.fulfilled, (state, action) => {
        for (let key in action.payload) {
          state.invoices.push({
            id: key,
            data: action.payload[key],
          });
        }
      })
      .addCase(deleteInvoice.fulfilled, (state, action) => {
        state.invoices = state.invoices.filter(
          (invoice) => invoice.id !== action.payload
        );
      });
  },
});

export const { addInvoice, editInvoice } = InvoiceSlice.actions;
export default InvoiceSlice.reducer;
