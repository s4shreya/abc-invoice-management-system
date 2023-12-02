import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import RootLayout from "./routes/RootLayout";
import Homepage from "./routes/Homepage";
import "./index.css";

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
        element: <App />,
      },
    ]
  }
]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={routes}></RouterProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
