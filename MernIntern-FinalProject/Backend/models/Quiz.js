const quizSchema = {
  id: String,
  title: String,
  className: String,
  timeLimit: Number,
  questions: Array,
  createdAt: Date
};

module.exports = quizSchema;
