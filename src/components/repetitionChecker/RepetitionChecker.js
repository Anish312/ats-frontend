import React from "react";
import { Link } from "react-router-dom";
import "./RepetitionChecker.css";

const RepetitionResult = ({ repeatedWords, synonyms }) => {
  const entries = Object.entries(repeatedWords);

  if (entries.length === 0) {
    return (
      <div className="rr-container">
        <h2 className="rr-success-title">✅ No major repetitions found!</h2>
        <p className="rr-success-text">Your resume looks good with varied vocabulary 🎉</p>
      </div>
    );
  }

  return (
    <div className="rr-wrapper">
      {/* Header */}
      <div className="rr-header">
        <h3 className="rr-header-title">🔁 REPETITION</h3>
        <p className="rr-header-subtitle">
          Using the same words over and over again in your resume can be perceived as poor language
          understanding. Instead, use synonyms and active verbs that increase the impact of your achievements.
        </p>
      </div>

      {/* Issues */}
      {entries.map(([word, count], index) => (
        <div key={word} className="rr-issue-box">
          <div className="rr-issue-header">
            <div className="rr-counter">{index + 1}</div>
            <h4 className="rr-issue-title">
              Oh no! We found "{word}" repeated {count} times
            </h4>
          </div>

          <div className="rr-synonyms">
            <span className="rr-tag rr-tag-danger">
              {count} times: {word}
            </span>
            <span className="rr-synonyms-label">try replacing with</span>
            {synonyms[word]?.length ? (
              synonyms[word].map((syn) => (
                <span key={syn} className="rr-tag rr-tag-synonym">
                  {syn}
                </span>
              ))
            ) : (
              <span className="rr-no-synonyms">No synonyms found</span>
            )}
          </div>
        </div>
      ))}

      {/* CTA */}
      <div className="rr-cta">
        <h4 className="rr-cta-title">Job-Winning Resume In Minutes</h4>
        <button className="rr-cta-btn">Create an  Resume</button>
      </div>

      {/* FAQ */}
      <div className="rr-faq">
        <h5 className="rr-faq-title">FAQs</h5>
        <details>
          <summary className="rr-faq-question">Is repetition necessarily a bad thing?</summary>
          <p className="rr-faq-answer">
            It’s normal to repeat yourself throughout your resume, but over-repeating is something you want to avoid.
            It makes a resume less compelling and creates the impression of a low vocabulary level.
            Try using synonyms when you repeat words frequently.
          </p>
        </details>
      </div>
    </div>
  );
};

export default RepetitionResult;
