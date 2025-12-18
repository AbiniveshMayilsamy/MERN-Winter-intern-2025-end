import "../Styles/Results.css";

function Results() {
  const userName = localStorage.getItem("userName");
  const results = JSON.parse(localStorage.getItem("results")) || [];
  const userResults = results.filter((r) => r.userName === userName);

  return (
    <div className="results-container">
      <h2>My Results</h2>
      {userResults.length === 0 ? (
        <p className="results-empty">No Quiz attended!</p>
      ) : (
        <table className="results-table">
          <thead>
            <tr>
              <th>Quiz</th>
              <th>Score</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {userResults.map((result, idx) => (
              <tr key={idx}>
                <td>{result.quizTitle}</td>
                <td>
                  {result.score}/{result.total}
                </td>
                <td>{new Date(result.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Results;
