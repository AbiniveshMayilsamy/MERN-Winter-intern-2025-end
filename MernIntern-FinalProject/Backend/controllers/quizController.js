const quizzes = [];
const results = [];

exports.createQuiz = (req, res) => {
  const { title, className, timeLimit, questions } = req.body;

  const quiz = {
    id: Date.now().toString(),
    title,
    className,
    timeLimit,
    questions,
    createdAt: new Date()
  };

  quizzes.push(quiz);
  res.status(201).json({ message: "Quiz created successfully", quiz });
};

exports.getQuizzes = (req, res) => {
  res.status(200).json(quizzes);
};

exports.getQuizById = (req, res) => {
  const quiz = quizzes.find(q => q.id === req.params.id);
  
  if (!quiz) {
    return res.status(404).json({ message: "Quiz not found" });
  }

  res.status(200).json(quiz);
};

exports.submitQuiz = (req, res) => {
  const { userId, quizId, answers } = req.body;
  const quiz = quizzes.find(q => q.id === quizId);

  if (!quiz) {
    return res.status(404).json({ message: "Quiz not found" });
  }

  let score = 0;
  answers.forEach((answer, index) => {
    if (quiz.questions[index] && quiz.questions[index].answer === answer) {
      score++;
    }
  });

  const result = {
    id: Date.now().toString(),
    userId,
    quizId,
    score,
    totalQuestions: quiz.questions.length,
    answers,
    completedAt: new Date()
  };

  results.push(result);
  res.status(201).json({ message: "Quiz submitted successfully", result });
};

exports.getResults = (req, res) => {
  res.status(200).json(results);
};
