const Results = () => {
  const userName = localStorage.getItem("userName");
  const results = JSON.parse(localStorage.getItem("results")) || [];
  const userResults = results.filter((r) => r.userName === userName);

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Results</h2>
      {userResults.length === 0 ? (
        <p>No results yet. Take a quiz to see your results!</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Quiz</th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Score</th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {userResults.map((result, idx) => (
              <tr key={idx}>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>{result.quizTitle}</td>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                  {result.score}/{result.total}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                  {new Date(result.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Results;
