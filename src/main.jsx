import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import MyOrders from "./routes/myOrders";
import Products from "./routes/products";
import AddEditOrder from "./routes/addEditOrder";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "my-orders",
    element: <MyOrders />,
  },
  {
    path: "products",
    element: <Products />,
  },
  {
    path: "addEditOrder",
    element: <AddEditOrder />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);