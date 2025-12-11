import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import QuizApp from "./QuizApp";
import QuizCatalog from "./Pages/QuizCatalog";
import Quiz from "./Pages/Quiz";
import Results from "./Pages/Results";
import Leaderboard from "./Pages/Leaderboard";
import Admin from "./Pages/Admin";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/quiz",
    element: <QuizApp />,
    children: [
      { path: "", element: <QuizCatalog /> },
      { path: ":id", element: <Quiz /> },
      { path: "results", element: <Results /> },
      { path: "leaderboard", element: <Leaderboard /> },
      { path: "admin", element: <Admin /> },
    ],
  },
  { path: "*", element: <h1 style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>404</h1> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
