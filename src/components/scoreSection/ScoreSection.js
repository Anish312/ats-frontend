import React from "react";
import "./ScoreSection.css";

function ScoreSection({ resume }) {
  if (!resume) return null;

  return (
    <div className="score-section">
      <h3>📊 Resume Scores</h3>
      <div className="score-grid">
        <div className="score-card">
          <p className="score-label">Percentage Score</p>
          <p className="score-value">{resume.percentage_score}</p>
        </div>

        <div className="score-card">
          <p className="score-label">Hybrid Score</p>
          <p className="score-value">{resume.hybrid_score}</p>
        </div>

        {/* <div className="score-card">
          <p className="score-label">Similarity</p>
          <p className="score-value">{resume.similarity.toFixed(2)}</p>
        </div> */}

        <div className="score-card">
          <p className="score-label">Score (Raw)</p>
          <p className="score-value">{resume.score}</p>
        </div>

        {/* <div className="score-card">
          <p className="score-label">Phrase Score</p>
          <p className="score-value">{resume.percentage_score_phrases}</p>
        </div> */}

        <div className="score-card">
          <p className="score-label">Weight Match %</p>
          <p className="score-value">{resume.score}%</p>
        </div>
      </div>
    </div>
  );
}

export default ScoreSection;
