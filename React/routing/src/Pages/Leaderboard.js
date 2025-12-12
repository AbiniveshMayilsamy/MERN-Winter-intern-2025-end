import { useState } from "react";
import "../Styles/Leaderboard.css";

function Leaderboard() {
  const [selectedClass, setSelectedClass] = useState("ALL");
  const results = JSON.parse(localStorage.getItem("results")) || [];
  
  const classes = [...new Set(results.map(r => r.className).filter(Boolean))];
  
  const filteredResults = selectedClass === "ALL" 
    ? results 
    : results.filter(r => r.className === selectedClass);
  
  const leaderboard = filteredResults
    .map((r) => ({ ...r, percentage: (r.score / r.total) * 100 }))
    .sort((a, b) => b.score - a.score);

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      
      <div style={{ marginBottom: "20px" }}>
        <label style={{ marginRight: "10px" }}>Filter by Class:</label>
        <select 
          value={selectedClass} 
          onChange={(e) => setSelectedClass(e.target.value)}
          style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
        >
          <option value="ALL">All Classes</option>
          {classes.map(cls => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </select>
      </div>

      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Roll No</th>
            <th>Class</th>
            <th>Quiz</th>
            <th>Score</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((result, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{result.name}</td>
              <td>{result.rollNo}</td>
              <td>{result.className}</td>
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
