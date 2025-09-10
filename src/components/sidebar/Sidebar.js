import React, { useEffect, useState } from "react";
import ScoreGauge from "../scoreGauge/ScoreGauge";
import Metrics from "../metrics/Metrics";
import Keywords from "../keywords/Keywords";
import axios from "axios";

function Sidebar({ resume , atsScore}) {
  const [showAllMissing, setShowAllMissing] = useState(false);
  const [showAllImportant, setShowAllImportant] = useState(false);
    const [resumeData, setResumeData] = useState(null);
  


  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await fetch(`/resume`);
        if (!res.ok) throw new Error("Failed to fetch resume");
        const data = await res.json();
        setResumeData(data[data.length - 1]);

      } catch (error) {
        console.error("Error:", error);
      } 
    };
    fetchResume();
  }, []);

  return (
    <aside className="sidebar">
      <h2>Your Score</h2>
      <ScoreGauge score={atsScore} />
      {/* <p className="issues">
        {resume.issues ? `${resume.issues} Issues` : "No Issues"}
      </p> */}
      {resumeData ? (
          <Metrics resume={resume} resumeData={resumeData}/>
      ) : null}

   
      <Keywords
        resume={resume}
        resumeData={resumeData}
        showAllMissing={showAllMissing}
        setShowAllMissing={setShowAllMissing}
        showAllImportant={showAllImportant}
        setShowAllImportant={setShowAllImportant}
      />
    </aside>
  );
}

export default Sidebar;
