import "../Styles/Leaderboard.css";

function QuizLeaderboard({ scores, currentUser }) {
  const sortedScores = [...scores].sort((a, b) => b.score - a.score);

  return (
    <div className="leaderboard-container">
      <h3>Live Leaderboard</h3>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Roll No</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {sortedScores.map((entry, idx) => (
            <tr key={idx} style={{ backgroundColor: entry.rollNo === currentUser ? "#ffffcc" : "transparent" }}>
              <td>{idx + 1}</td>
              <td>{entry.name}</td>
              <td>{entry.rollNo}</td>
              <td>{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default QuizLeaderboard;
