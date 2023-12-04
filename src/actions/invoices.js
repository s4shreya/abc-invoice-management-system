import { createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../api";

// action for creating invoice
export const createInvoice = createAsyncThunk(
  "invoices/createInvoice",
  async (invoice) => {
    try {
      const { data } = await api.createInvoice(invoice);
      return data;
    } catch (error) {
      console.log(`An error occurred ${error}`);
      return error.message;
    }
  }
);

// action for fetching invoices
export const getInvoices = createAsyncThunk(
  "invoices/getInvoices",
  async () => {
    try {
      const { data } = await api.getInvoices();
      return data;
    } catch (error) {
      console.log(`Error occurred ${error}`);
      return error.message;
    }
  }
);

// action for removing invoice with the given id
export const deleteInvoice = createAsyncThunk(
  "invoices/deleteInvoice",
  async (id) => {
    try {
      await api.deleteInvoice(id);
      return id;
    } catch (error) {
      console.log(`Error occurred ${error}`);
      return error.message;
    }
  }
);
