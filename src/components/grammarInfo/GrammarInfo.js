import React from 'react';
import './GrammarInfo.css';

function GrammarInfo() {
  const data ={
    "originalText": "This is a smple text to test the GrammarService.\nIt contians multiple errors and typos.\nFor exmple, some words are mispelled intentionally.\nWe wants to see if the service detect all issues correctly.\nAlso, it should provide suggestions for correction.\nSometimes, sentences are missing punctuations like this one\nLets see how it handles complex mistakes like their, there, and they're usage.\nFinally, we hope it works accurately on long texts.",
    "issues": [
        {
            "text": "smple",
            "message": "Possible spelling mistake found.",
            "suggestions": [
                "simple",
                "sample",
                "ample",
                "smile",
                "Siple"
            ],
            "offset": 10,
            "length": 5,
            "line": 1,
            "context": "This is a smple text to test the GrammarService."
        },
        {
            "text": "GrammarService",
            "message": "Possible spelling mistake found.",
            "suggestions": [
                "Grammar Service"
            ],
            "offset": 33,
            "length": 14,
            "line": 1,
            "context": "This is a smple text to test the GrammarService."
        },
        {
            "text": "contians",
            "message": "Possible spelling mistake found.",
            "suggestions": [
                "contains"
            ],
            "offset": 52,
            "length": 8,
            "line": 2,
            "context": "It contians multiple errors and typos."
        },
        {
            "text": "exmple",
            "message": "Possible spelling mistake found.",
            "suggestions": [
                "example"
            ],
            "offset": 92,
            "length": 6,
            "line": 3,
            "context": "For exmple, some words are mispelled intentionally."
        },
        {
            "text": "mispelled",
            "message": "Possible spelling mistake found.",
            "suggestions": [
                "misspelled",
                "dispelled"
            ],
            "offset": 115,
            "length": 9,
            "line": 3,
            "context": "For exmple, some words are mispelled intentionally."
        },
        {
            "text": "wants",
            "message": "Possible agreement error — use the base form here.",
            "suggestions": [
                "want"
            ],
            "offset": 143,
            "length": 5,
            "line": 4,
            "context": "We wants to see if the service detect all issues correctly."
        },
        {
            "text": "detect",
            "message": "“Service” is a singular noun. It appears that the verb form is incorrect.",
            "suggestions": [
                "detects"
            ],
            "offset": 171,
            "length": 6,
            "line": 4,
            "context": "We wants to see if the service detect all issues correctly."
        },
        {
            "text": "Lets",
            "message": "Only proper nouns start with an uppercase character (there are exceptions for headlines).",
            "suggestions": [
                "lets"
            ],
            "offset": 312,
            "length": 4,
            "line": 7,
            "context": "Lets see how it handles complex mistakes like their, there, and they're usage."
        }
    ]
}

  // Function to highlight the misspelled word in the context
  const highlightText = (context, word) => {
    const parts = context.split(new RegExp(`(${word})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === word.toLowerCase() ? (
        <span key={index} className="highlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="grammar-info-section">
      <h2>Grammar Check Result</h2>

      <div className="issues-summary">
        <h3>
          {data.issues.length > 0
            ? `Total Issues Found: ${data.issues.length}`
            : 'No mistakes found!'}
        </h3>
      </div>

      {data.issues.length > 0 && (
        <div className="issues-list">
          <h3>Issues Details:</h3>
          {data.issues.map((issue, index) => (
            <div key={index} className="issue">
              <p className="context-text"><strong>Context:</strong> {highlightText(issue.context, issue.text)}</p>
              <p><strong>Incorrect Word:</strong> <em>"{issue.text}"</em></p>
              <p><strong>Suggestions:</strong> {issue.suggestions.join(', ')}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GrammarInfo;
