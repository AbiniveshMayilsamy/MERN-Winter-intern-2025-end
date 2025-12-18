import { Outlet } from "react-router-dom";
import QuizHeader from "./Common/QuizHeader";

function QuizApp() {
  return (
    <div>
      <QuizHeader></QuizHeader>
      <Outlet></Outlet>
    </div>
  );
}

export default QuizApp;
