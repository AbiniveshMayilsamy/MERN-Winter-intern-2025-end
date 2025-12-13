import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminCreateQuiz() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], correctAnswer: "" },
  ]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].correctAnswer = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], correctAnswer: "" },
    ]);
  };

  const removeQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter quiz title");
      return;
    }

    const allQuestionsValid = questions.every(
      (q) =>
        q.question.trim() && q.options.every((o) => o.trim()) && q.correctAnswer
    );

    if (!allQuestionsValid) {
      alert("Please fill all fields in all questions");
      return;
    }

    const newQuiz = {
      id: Date.now(),
      title: title,
      questions: questions,
    };

    const existingQuizzes = JSON.parse(localStorage.getItem("quizzes") || "[]");
    existingQuizzes.push(newQuiz);
    localStorage.setItem("quizzes", JSON.stringify(existingQuizzes));

    navigate("/admin/dashboard");
  };

  return (
    <div className="container">
      <h2>Create New Quiz</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Quiz Title</label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter quiz title"
          />
        </div>

        {questions.map((question, qIndex) => (
          <div
            key={qIndex}
            style={{
              marginBottom: "30px",
              padding: "15px",
              backgroundColor: "#f0f0f0",
              borderRadius: "5px",
            }}
          >
            <h4>Question {qIndex + 1}</h4>

            <div className="form-group">
              <label>Question Text</label>
              <textarea
                value={question.question}
                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                placeholder="Enter question text"
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  fontWeight: "bold",
                  marginBottom: "10px",
                  display: "block",
                }}
              >
                Options
              </label>
              {question.options.map((option, oIndex) => (
                <div key={oIndex} className="form-group">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(qIndex, oIndex, e.target.value)
                    }
                    placeholder={`Option ${oIndex + 1}`}
                  />
                </div>
              ))}
            </div>

            <div className="form-group">
              <label>Correct Answer</label>
              <select
                value={question.correctAnswer}
                onChange={(e) =>
                  handleCorrectAnswerChange(qIndex, e.target.value)
                }
              >
                <option value="">Select correct answer</option>
                {question.options.map((option, index) => (
                  <option key={index} value={option}>
                    {option || `Option ${index + 1}`}
                  </option>
                ))}
              </select>
            </div>

            {questions.length > 1 && (
              <button
                type="button"
                className="button button-danger"
                onClick={() => removeQuestion(qIndex)}
              >
                Remove Question
              </button>
            )}
          </div>
        ))}

        <button type="button" className="button" onClick={addQuestion}>
          Add Question
        </button>

        <div style={{ marginTop: "20px" }}>
          <button type="submit" className="button button-success">
            Save Quiz
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminCreateQuiz;
