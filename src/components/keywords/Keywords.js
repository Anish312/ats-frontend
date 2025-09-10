import React from "react";
import "./Keywords.css";
function Keywords({
  resume,
  showAllMissing,
  setShowAllMissing,
  showAllImportant,
  setShowAllImportant,
}) {
  const missingKeywordsToShow = showAllMissing
    ? resume.missingKeywords
    : resume.missingKeywords?.slice(0, 5);

  const importantKeywordsCounted =
    resume.importantKeywords?.reduce((acc, kw) => {
      acc[kw] = (acc[kw] || 0) + 1;
      return acc;
    }, {}) || {};

  const importantKeywordsArray = Object.entries(importantKeywordsCounted);
  const importantKeywordsToShow = showAllImportant
    ? importantKeywordsArray
    : importantKeywordsArray.slice(0, 5);

  return (
    <div>
      {/* Missing Keywords */}
      <h4>📌 Missing Keywords</h4>
      {missingKeywordsToShow?.length > 0 ? (
        <>
          <ul>
            {missingKeywordsToShow.map((kw, i) => (
              <li key={i}>❌ {kw}</li>
            ))}
          </ul>
          {resume.missingKeywords.length > 5 && (
            <button
              className="toggle-btn"
              onClick={() => setShowAllMissing(!showAllMissing)}
            >
              {showAllMissing ? "Show Less" : "Show More"}
            </button>
          )}
        </>
      ) : (
        <p>🎉 No missing keywords</p>
      )}

      {/* Important Keywords */}
      <h4>⭐ Important Keywords</h4>
      {importantKeywordsToShow?.length > 0 ? (
        <>
          <ul>
            {importantKeywordsToShow.map(([kw, count], i) => (
              <li key={i}>
                ✅ {kw} {count > 1 ? `(${count})` : ""}
              </li>
            ))}
          </ul>
          {importantKeywordsArray.length > 5 && (
            <button
              className="toggle-btn"
              onClick={() => setShowAllImportant(!showAllImportant)}
            >
              {showAllImportant ? "Show Less" : "Show More"}
            </button>
          )}
        </>
      ) : (
        <p>⚠️ No important keywords</p>
      )}
    </div>
  );
}

export default Keywords;
