import { useState } from "react";

const Admin = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([{ question: "", options: ["", "", "", ""], answer: 0 }]);

  const addQuestion = () => {
    setQuestions([...questions, { question: "", options: ["", "", "", ""], answer: 0 }]);
  };

  const updateQuestion = (idx, field, value) => {
    const newQuestions = [...questions];
    newQuestions[idx][field] = value;
    setQuestions(newQuestions);
  };

  const updateOption = (qIdx, oIdx, value) => {
    const newQuestions = [...questions];
    newQuestions[qIdx].options[oIdx] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    const newQuiz = {
      id: quizzes.length + 1,
      title,
      questions,
    };
    quizzes.push(newQuiz);
    localStorage.setItem("quizzes", JSON.stringify(quizzes));
    alert("Quiz created successfully!");
    setTitle("");
    setQuestions([{ question: "", options: ["", "", "", ""], answer: 0 }]);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h2>Create Quiz</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
        />
        {questions.map((q, qIdx) => (
          <div key={qIdx} style={{ border: "1px solid #ccc", padding: "15px", margin: "10px 0" }}>
            <h4>Question {qIdx + 1}</h4>
            <input
              type="text"
              placeholder="Question"
              value={q.question}
              onChange={(e) => updateQuestion(qIdx, "question", e.target.value)}
              required
              style={{ width: "100%", padding: "10px", margin: "5px 0" }}
            />
            {q.options.map((opt, oIdx) => (
              <input
                key={oIdx}
                type="text"
                placeholder={`Option ${oIdx + 1}`}
                value={opt}
                onChange={(e) => updateOption(qIdx, oIdx, e.target.value)}
                required
                style={{ width: "100%", padding: "10px", margin: "5px 0" }}
              />
            ))}
            <select
              value={q.answer}
              onChange={(e) => updateQuestion(qIdx, "answer", parseInt(e.target.value))}
              style={{ width: "100%", padding: "10px", margin: "5px 0" }}
            >
              <option value={0}>Option 1</option>
              <option value={1}>Option 2</option>
              <option value={2}>Option 3</option>
              <option value={3}>Option 4</option>
            </select>
          </div>
        ))}
        <button type="button" onClick={addQuestion} style={{ padding: "10px 20px", margin: "10px 5px" }}>
          Add Question
        </button>
        <button type="submit" style={{ padding: "10px 20px", margin: "10px 5px" }}>
          Create Quiz
        </button>
      </form>
    </div>
  );
};

export default Admin;
