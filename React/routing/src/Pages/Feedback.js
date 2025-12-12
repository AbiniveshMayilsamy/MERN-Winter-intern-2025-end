import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../Styles/Feedback.css";

function Feedback() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();

  function onSubmit(data) {
    const feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
    feedbacks.push({
      ...data,
      date: new Date().toISOString()
    });
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
    alert("Feedback submitted successfully!");
    reset();
  }

  return (
    <div className="feedback-container">
      <h2>Feedback Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="feedback-form">
        <div className="feedback-field">
          <label>1. What did you like most about the quiz?</label>
          <textarea
            {...register("question1", { required: "This field is required" })}
            rows="4"
          />
          {errors.question1 && <span className="error">{errors.question1.message}</span>}
        </div>

        <div className="feedback-field">
          <label>2. What improvements would you suggest?</label>
          <textarea
            {...register("question2", { required: "This field is required" })}
            rows="4"
          />
          {errors.question2 && <span className="error">{errors.question2.message}</span>}
        </div>

        <div className="feedback-field">
          <label>3. How would you rate the difficulty level?</label>
          <textarea
            {...register("question3", { required: "This field is required" })}
            rows="4"
          />
          {errors.question3 && <span className="error">{errors.question3.message}</span>}
        </div>

        <div className="feedback-field">
          <label>4. Were the questions clear and understandable?</label>
          <textarea
            {...register("question4", { required: "This field is required" })}
            rows="4"
          />
          {errors.question4 && <span className="error">{errors.question4.message}</span>}
        </div>

        <div className="feedback-field">
          <label>5. Any additional comments or suggestions?</label>
          <textarea
            {...register("question5", { required: "This field is required" })}
            rows="4"
          />
          {errors.question5 && <span className="error">{errors.question5.message}</span>}
        </div>

        <div className="feedback-actions">
          <button type="submit" className="submit-btn">Submit Feedback</button>
          <button type="button" onClick={() => navigate("/quiz/admin")} className="cancel-btn">Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default Feedback;
