import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Home from "./Pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./Pages/About";
import Cart from "./Pages/Cart";
import Search from "./Pages/Search";

const routerVariables = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/cart",
        element: <Cart></Cart>,
      },
      {
        path: "/search",
        element: <Search></Search>,
      },
      {
        path: "*",
        element: (
          <h1
            style={{
              color: "red",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              height: "100vh",
            }}
          >
            !-- 404 -- Page Not Found --!{" "}
          </h1>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={routerVariables} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
