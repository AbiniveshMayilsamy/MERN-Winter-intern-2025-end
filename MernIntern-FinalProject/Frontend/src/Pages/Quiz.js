import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QuizLeaderboard from "../Components/QuizLeaderboard";
import "../Styles/Quiz.css";

function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [cloudinaryCloudName, setCloudinaryCloudName] = useState("demo");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [totalScore, setTotalScore] = useState(0);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [liveScores, setLiveScores] = useState([]);
  const timerRef = useRef(null);

  const student = JSON.parse(localStorage.getItem("currentQuizStudent"));

  useEffect(() => {
    if (!student) {
      navigate(`/quiz/auth/${id}`);
      return;
    }

    async function loadQuiz() {
      try {
        let res, data;
        if (id === "1") {
          res = await fetch("/Quiz.json");
          data = await res.json();
        } else if (id === "2") {
          res = await fetch("/quiz-2.json");
          data = await res.json();
        } else if (id === "3") {
          res = await fetch("/quiz-3.json");
          data = await res.json();
        }
        
        if (data) {
          setCloudinaryCloudName(data.cloudinary_cloud_name || "demo");
          setQuiz({
            id: parseInt(id),
            title: data.title,
            timeLimit: 30,
            questions: data.questions.map((q) => ({
              question: q.question,
              options: q.options,
              answer: q.options.indexOf(q.answer),
              imageId: q.image_id
            })),
          });
          setTimeLeft(30);
        } else {
          const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
          const found = quizzes.find((q) => q.id === parseInt(id));
          if (found) {
            setQuiz(found);
            setCloudinaryCloudName(found.cloudinary_cloud_name || "demo");
            setTimeLeft(found.timeLimit || 30);
          }
        }
      } catch (err) {
        console.log("Error:", err);
      }
    }
    loadQuiz();
  }, [id, student, navigate]);

  function handleAnswer(optionIndex) {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  }

  function handleNext() {
    if (!quiz) return;

    const isCorrect = answers[currentQuestion] === quiz.questions[currentQuestion].answer;
    const baseScore = 1000;
    const timeBonus = timeLeft * 10;
    const questionScore = isCorrect ? baseScore + timeBonus : 0;
    const newTotalScore = totalScore + questionScore;
    setTotalScore(newTotalScore);

    const currentScores = JSON.parse(localStorage.getItem(`quiz_${id}_scores`)) || [];
    const userIndex = currentScores.findIndex(s => s.rollNo === student.rollNo);
    
    if (userIndex >= 0) {
      currentScores[userIndex].score = newTotalScore;
    } else {
      currentScores.push({ 
        name: student.name, 
        rollNo: student.rollNo, 
        score: newTotalScore,
        className: student.rollNo.substring(2, student.rollNo.length - 3).toUpperCase()
      });
    }
    
    localStorage.setItem(`quiz_${id}_scores`, JSON.stringify(currentScores));
    setLiveScores(currentScores);
    setShowLeaderboard(true);

    setTimeout(() => {
      if (currentQuestion < quiz.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setTimeLeft(quiz.timeLimit || 30);
        setShowLeaderboard(false);
      } else {
        const result = {
          quizId: quiz.id,
          quizTitle: quiz.title,
          score: newTotalScore,
          total: quiz.questions.length * 1000,
          name: student.name,
          rollNo: student.rollNo,
          className: student.rollNo.substring(2, student.rollNo.length - 3).toUpperCase(),
          date: new Date().toISOString(),
        };
        const results = JSON.parse(localStorage.getItem("results")) || [];
        results.push(result);
        localStorage.setItem("results", JSON.stringify(results));
        localStorage.removeItem("currentQuizStudent");
        navigate("/quiz/leaderboard");
      }
    }, 3000);
  }

  useEffect(() => {
    if (!quiz || showLeaderboard) return;
    
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleNext();
          return quiz.timeLimit || 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [quiz, showLeaderboard, currentQuestion]);

  if (!quiz || !student) return <div className="quiz-loading">Loading...</div>;

  if (showLeaderboard) {
    return <QuizLeaderboard scores={liveScores} currentUser={student.rollNo} />;
  }

  const question = quiz.questions[currentQuestion];
  const timePercentage = (timeLeft / (quiz.timeLimit || 30)) * 100;
  const timerClass = timePercentage > 50 ? "" : timePercentage > 25 ? "warning" : "danger";
  const imageUrl = question.imageId ? `https://res.cloudinary.com/${cloudinaryCloudName}/image/upload/${question.imageId}` : null;

  return (
    <div className="quiz-container">
      <h2>{quiz.title}</h2>
      <p><strong>Student:</strong> {student.name} ({student.rollNo})</p>
      <div className="quiz-score-display">Score: {totalScore}</div>
      <p className="quiz-progress">Question {currentQuestion + 1} of {quiz.questions.length}</p>
      <div className="quiz-timer">Time: {timeLeft}s</div>
      <div className="quiz-timer-bar">
        <div className={`quiz-timer-fill ${timerClass}`} style={{ width: `${timePercentage}%` }}></div>
      </div>
      <h3 className="quiz-question">{question.question}</h3>
      {imageUrl && <img src={imageUrl} alt="Question" className="quiz-image" />}
      <div className="quiz-options">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(idx)}
            className={`quiz-option ${answers[currentQuestion] === idx ? 'selected' : ''}`}
          >
            {option}
          </button>
        ))}
      </div>
      <button onClick={handleNext} disabled={answers[currentQuestion] === undefined} className="quiz-next-btn">
        {currentQuestion < quiz.questions.length - 1 ? "Next" : "Submit"}
      </button>
    </div>
  );
}

export default Quiz;
