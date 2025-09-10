import React, { useContext, useEffect, useState } from "react";
import { ResumeContext } from "../../context/ResumeContext";
import axios from "axios";

function Metrics({ resume, resumeData }) {
    const { displayResume, resumeFile, analysis } = useContext(ResumeContext);
    const [sectionData , setSectionData] = useState([]);
useEffect(() => {
  const fetchResume = async () => {
    try {
      const res = await axios.post(
        "/check-sections",
        { text: resumeData.extractedText }   // ✅ wrap in object
      );
      setSectionData(res.data);

    } catch (error) {
      console.error("Error:", error);
    }
  };
  if (resumeData?.extractedText) {
    fetchResume();
  }
}, [analysis, resumeData]);


  return (
    <div className="metrics">
      <h4>CONTENT</h4>
      <ul>
        <li className="ok">ATS Parse Rate</li>
        <li className="ok">Resume Preview</li>
        <li className="ok">ESSENTIAL SECTIONS</li>
        <li className="error">CONTACT INFORMATION</li>
      </ul>

      <h4>SECTION</h4>
      <p className="score good">{sectionData.score}%</p>

      <h4>Matching Score</h4>
      <p className="score good">{resume.percentage_score}</p>

      {/* <h4>Hybrid Score</h4>
      <p className="score good">{resume.hybrid_score}</p>

      <h4>Similarity</h4>
      <p className="score good">{resume.similarity}</p> */}

      {/* <h4>Score (Raw)</h4> */}
      {/* <p className="score good">{resume.score}</p>

      <h4>Phrase Score</h4>
      <p className="score good">{resume.percentage_score_phrases}</p> */}
{/* 
      <h4>Weight Match %</h4>
      <p className="score good">{resume.weight?.match_percentage || 0}%</p> */}
    </div>
  );
}

export default Metrics;
