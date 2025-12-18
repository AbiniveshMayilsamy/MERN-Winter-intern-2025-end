const resultSchema = {
  id: String,
  userId: String,
  quizId: String,
  score: Number,
  totalQuestions: Number,
  answers: Array,
  completedAt: Date
};

module.exports = resultSchema;
