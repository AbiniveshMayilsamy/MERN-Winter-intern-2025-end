import { useState } from "react";
import "../Styles/Admin.css";

function Admin() {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([{ question: "", options: ["", "", "", ""], answer: 0 }]);

  function addQuestion() {
    setQuestions([...questions, { question: "", options: ["", "", "", ""], answer: 0 }]);
  }

  function updateQuestion(idx, field, value) {
    const newQuestions = [...questions];
    newQuestions[idx][field] = value;
    setQuestions(newQuestions);
  }

  function updateOption(qIdx, oIdx, value) {
    const newQuestions = [...questions];
    newQuestions[qIdx].options[oIdx] = value;
    setQuestions(newQuestions);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    const newQuiz = { id: quizzes.length + 1, title, questions };
    quizzes.push(newQuiz);
    localStorage.setItem("quizzes", JSON.stringify(quizzes));
    alert("Quiz created successfully!");
    setTitle("");
    setQuestions([{ question: "", options: ["", "", "", ""], answer: 0 }]);
  }

  return (
    <div className="admin-container">
      <div className="admin-content">
        <h2 className="admin-header">Create Quiz</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Quiz Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="admin-input"
          />
          {questions.map((q, qIdx) => (
            <div key={qIdx} className="question-box">
              <h4>Question {qIdx + 1}</h4>
              <input
                type="text"
                placeholder="Question"
                value={q.question}
                onChange={(e) => updateQuestion(qIdx, "question", e.target.value)}
                required
                className="admin-input"
              />
              {q.options.map((opt, oIdx) => (
                <input
                  key={oIdx}
                  type="text"
                  placeholder={`Option ${oIdx + 1}`}
                  value={opt}
                  onChange={(e) => updateOption(qIdx, oIdx, e.target.value)}
                  required
                  className="admin-input"
                />
              ))}
              <select
                value={q.answer}
                onChange={(e) => updateQuestion(qIdx, "answer", parseInt(e.target.value))}
                className="admin-input"
              >
                <option value={0}>Option 1</option>
                <option value={1}>Option 2</option>
                <option value={2}>Option 3</option>
                <option value={3}>Option 4</option>
              </select>
            </div>
          ))}
          <button type="button" onClick={addQuestion} className="add-question-btn">Add Question</button>
          <button type="submit" className="create-quiz-btn">Create Quiz</button>
        </form>
      </div>
    </div>
  );
}

export default Admin;
