import { useNavigate } from "react-router-dom";
import "../Styles/FeedbackList.css";

function FeedbackList() {
  const navigate = useNavigate();
  const feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];

  return (
    <div className="feedback-list-container">
      <h2>All Feedbacks</h2>
      <button onClick={() => navigate("/quiz/admin")} className="back-btn">Back to Admin</button>
      
      {feedbacks.length === 0 ? (
        <p className="no-feedback">No feedbacks submitted yet.</p>
      ) : (
        <div className="feedbacks">
          {feedbacks.map((feedback, idx) => (
            <div key={idx} className="feedback-card">
              <h3>Feedback #{idx + 1}</h3>
              <p><strong>Date:</strong> {new Date(feedback.date).toLocaleString()}</p>
              <div className="feedback-answers">
                <div><strong>Q1:</strong> {feedback.question1}</div>
                <div><strong>Q2:</strong> {feedback.question2}</div>
                <div><strong>Q3:</strong> {feedback.question3}</div>
                <div><strong>Q4:</strong> {feedback.question4}</div>
                <div><strong>Q5:</strong> {feedback.question5}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FeedbackList;
