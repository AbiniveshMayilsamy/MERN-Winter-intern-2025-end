const Leaderboard = () => {
  const results = JSON.parse(localStorage.getItem("results")) || [];
  const leaderboard = results
    .map((r) => ({ ...r, percentage: (r.score / r.total) * 100 }))
    .sort((a, b) => b.percentage - a.percentage);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Leaderboard</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0" }}>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>Rank</th>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>User</th>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>Quiz</th>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>Score</th>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((result, idx) => (
            <tr key={idx}>
              <td style={{ padding: "10px", border: "1px solid #ccc" }}>{idx + 1}</td>
              <td style={{ padding: "10px", border: "1px solid #ccc" }}>{result.userName}</td>
              <td style={{ padding: "10px", border: "1px solid #ccc" }}>{result.quizTitle}</td>
              <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                {result.score}/{result.total}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ccc" }}>{result.percentage.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
