import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  invoices: [
    {
      currency: "₹",
      currentDate: "",
      invoiceNumber: 1,
      dateOfIssue: "2018-10-12",
      billTo: "Akshay Dhingra",
      billToEmail: "",
      billToAddress: "",
      billFrom: "Shreya Dhingra",
      billFromEmail: "",
      billFromAddress: "",
      notes: "",
      total: "500.00",
      subTotal: "0.00",
      taxRate: "",
      taxAmmount: "0.00",
      discountRate: "",
      discountAmmount: "0.00",
      items: [
        {
          id: 0,
          name: "",
          description: "",
          price: "1.00",
          quantity: 1,
        },
      ],
    },
  ],
};

export const InvoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    addInvoice: (state, action) => {
      state.invoices = [action.payload, ...state.invoices];
    },
    editInvoice: (state, action) => {
      state.invoices = state.invoices.map(invoice => invoice.invoiceNumber === action.payload.invoiceNumber ? action.payload : invoice)
    },
    deleteInvoice: (state, action) => {
      state.invoices = state.invoices.filter(invoice => invoice.invoiceNumber !== action.payload)
    }
  },
});

export const { addInvoice, editInvoice, deleteInvoice } = InvoiceSlice.actions;
export default InvoiceSlice.reducer;
