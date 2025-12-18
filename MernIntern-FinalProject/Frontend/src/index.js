import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import QuizApp from "./QuizApp";
import QuizCatalog from "./Pages/QuizCatalog";
import Quiz from "./Pages/Quiz";
import QuizAuth from "./Pages/QuizAuth";
import Leaderboard from "./Pages/Leaderboard";
import Admin from "./Pages/Admin";
import Feedback from "./Pages/Feedback";
import FeedbackList from "./Pages/FeedbackList";
import Contact from "./Pages/Contact";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/quiz",
    element: <QuizApp />,
    children: [
      { path: "", element: <QuizCatalog /> },
      { path: "auth/:id", element: <QuizAuth /> },
      { path: "start/:id", element: <Quiz /> },
      { path: "leaderboard", element: <Leaderboard /> },
      { path: "admin", element: <Admin /> },
      { path: "feedback", element: <Feedback /> },
      { path: "feedbacks", element: <FeedbackList /> },
      { path: "contact", element: <Contact /> },
    ],
  },
  { path: "/contact", element: <Contact /> },
  { path: "*", element: <h1 style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>404</h1> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
