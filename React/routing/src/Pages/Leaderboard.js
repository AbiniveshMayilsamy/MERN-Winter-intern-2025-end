import "../Styles/Leaderboard.css";

function Leaderboard() {
  const results = JSON.parse(localStorage.getItem("results")) || [];
  const leaderboard = results
    .map((r) => ({ ...r, percentage: (r.score / r.total) * 100 }))
    .sort((a, b) => b.percentage - a.percentage);

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Quiz</th>
            <th>Score</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((result, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{result.userName}</td>
              <td>{result.quizTitle}</td>
              <td>{result.score}/{result.total}</td>
              <td>{result.percentage.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
