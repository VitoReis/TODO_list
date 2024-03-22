import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// ROUTES
import Main from "./Pages/Main"
import Add from "./Pages/Add"
import Update from "./Pages/Update";
import Search from "./Pages/Search";
import ListDone from "./Pages/ListDone";
import ListArchived from "./Pages/ListArchived";
import ErrorPage from "./Pages/ErrorPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Main />
      },
      {
        path: "/add",
        element: <Add />
      },
      {
        path: "/update",
        element: <Update />
      },
      {
        path: "/search",
        element: <Search />
      },
      {
        path: "/list/done",
        element: <ListDone />
      },
      {
        path: "/list/archived",
        element: <ListArchived />
      }
    ]
  }
])

root.render(
  <React.StrictMode>
    <RouterProvider router={ router } />
  </React.StrictMode>
);