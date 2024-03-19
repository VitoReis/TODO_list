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
/*
<BrowserRouter>
    <div>
      <nav>
        <ul>
          <li><Link to="/" /></li>
          <li><Link to='/add'/></li>
          <li><Link to='/update'/></li>
          <li><Link to='/search'/></li>
          <li><Link to='/list/done'/></li>
          <li><Link to='/list/archived'/></li>
          <li><Link to='/done'/></li>
          <li><Link to='/archived'/></li>
        </ul>
      </nav>

        <Switch>
          <Route path='/'>
            <Main />
          </Route>

          <Route path='/add'>
            <Add />
          </Route>

          <Route path='/update'>
            <Update />
          </Route>

          <Route path='/search'>
            <Search />
          </Route>

          <Route path='/list/done'>
            <Delete />
          </Route>

          <Route path='/list/archived'>
            <Delete />
          </Route>
        </Switch>
    </div>
    </BrowserRouter>*/