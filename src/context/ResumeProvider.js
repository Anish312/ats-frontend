// ResumeProvider.js
import React, { useState } from "react";
import { ResumeContext } from "./ResumeContext";


function ResumeProvider({ children }) {
  const [displayResume, setResume] = useState(null); // analysis result / parsed resume
  const [resumeFile, setResumeFile] = useState(null); // actual File object (PDF/DOCX)
  const [analysis, setAnalysis] = useState(null);
  const [keywords, setKeywords] = useState([]);
  const [missingKeywords, setMissingKeywords] = useState([]);

  return (
    <ResumeContext.Provider
      value={{
        displayResume,
        setResume,
        resumeFile,
        setResumeFile,
        analysis,
        setAnalysis,
        keywords,
        setKeywords,
        missingKeywords,
        setMissingKeywords,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export default ResumeProvider;
