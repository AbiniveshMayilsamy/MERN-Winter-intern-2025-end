import { Outlet } from "react-router-dom";
import QuizHeader from "./Common/QuizHeader";

function QuizApp() {
  return (
    <div>
      <QuizHeader />
      <Outlet />
    </div>
  );
}

export default QuizApp;
