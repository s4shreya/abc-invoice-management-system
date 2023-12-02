import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import RootLayout from "./routes/RootLayout";
import Homepage from "./routes/Homepage";
import "./index.css";
import AddInvoice from "./routes/AddInvoice";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/add-invoice",
        element: <AddInvoice />,
      },
    ],
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
