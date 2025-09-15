import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SectionCheck.css";
import { BASE_URL } from "../../constants/constants";

function SectionCheck({ resumeText }) {
  const [sections, setSections] = useState([]);
  const [missing, setMissing] = useState([]);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const res = await axios.post(
          `${BASE_URL}/check-sections`,
          { text: resumeText }
        );

        const availableSections = res.data.available || [];
        const missingSections = res.data.missing || [];

        setSections(availableSections);
        setMissing(missingSections);

        // Calculate score: percentage of sections found
        const total = availableSections.length + missingSections.length;
        const scorePercent = total > 0 ? Math.round((availableSections.length / total) * 100) : 0;
        setScore(scorePercent);
      } catch (error) {
        console.error("Error fetching sections:", error);
      } finally {
        setLoading(false);
      }
    };

    if (resumeText) fetchSections();
  }, [resumeText]);

  return (
    <div className="sections-container">

      <div className="essential-sections-card">
      <div className="contact-info-header">📇 ESSENTIAL SECTIONS</div>

        {loading ? (
          <p>Checking resume...</p>
        ) : (
          <>
            {/* Display score */}
            <p className="resume-score">
              Resume Score: <b>{score}%</b>
            </p>

            {/* Display available sections */}
            {sections.length > 0 && (
              <>
                <p>
                  We’ve found the following <b>essential sections</b> in your resume:
                </p>
                <div className="section-list">
                  {sections.map((section, idx) => (
                    <div key={idx} className="section-item available">
                      ✅ {section}
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Display missing sections */}
            {missing.length > 0 && (
              <>
                <p className="missing-title">
                  ⚠️ Missing essential sections in your resume: ({missing.length} issue{missing.length > 1 ? "s" : ""})
                </p>
                <div className="section-list">
                  {missing.map((section, idx) => (
                    <div key={idx} className="section-item missing">
                      ❌ {section}
                    </div>
                  ))}
                </div>
              </>
            )}

            {sections.length === 0 && missing.length === 0 && (
              <p>No essential sections found in your resume.</p>
            )}
          </>
        )}

        <div className="resume-banner">
          <p>Job-Winning Resume In Minutes</p>
          <button className="create-resume-btn">Create an Resume</button>
        </div>
      </div>
    </div>
  );
}

export default SectionCheck;
