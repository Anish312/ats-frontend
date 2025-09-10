import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ShowResult.css";
import { ResumeContext } from "../../context/ResumeContext";
import Sidebar from "../../components/sidebar/Sidebar";
import ResumePreview from "../../components/resumePreview/ResumePreview";
import SectionCheck from "../../components/sectionCheck/SectionCheck";
import ContactInfo from "../../components/contactInfo/ContactInfo";
import EmailInfo from "../../components/emailInfo/EmailInfo";
import ScoreSection from "../../components/scoreSection/ScoreSection";
import axios from "axios";
import GrammarInfo from "../../components/grammarInfo/GrammarInfo";
import RepetitionChecker from "../../components/repetitionChecker/RepetitionChecker";
import Loader from "../../components/loader/Loader";

function ShowResult() {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sectionData, setSectionData] = useState([]);
  const [emailInfo, setEmailInfo] = useState(null);
  const [grammarInfo, setGrammarInfo] = useState(null);
  const [atsScore, setAtsScore] = useState(null);
  const [repetitionInfo, setRepetitionInfo] = useState(null);

  const { displayResume, resumeFile, analysis } = useContext(ResumeContext);

  // ✅ Load resume first
  useEffect(() => {
    const saved = localStorage.getItem("resumeData");
    if (saved) {
      const parsed = JSON.parse(saved);
      setResume(parsed);
      setLoading(false);
    } else {
      fetchResume();
    }
  }, [id]);

  // ✅ Once resume is ready, fetch section + email info
  useEffect(() => {
    if (resume?.extractedText) {
      fetchCheckSection(resume.extractedText);
      fetchEmailInfo(resume.extractedText);
      // fetchCheckGrammar(resume.extractedText);
      // checkRepetition(resume.extractedText);
    }
  }, [resume]);

  // ✅ Calculate ATS score after data is ready
  useEffect(() => {
    if (sectionData && emailInfo && resume) {
      calculateAtsScore();
    }
  }, [sectionData, emailInfo, resume]);

  const fetchResume = async () => {
    try {
      const res = await fetch(`/resume`);
      if (!res.ok) throw new Error("Failed to fetch resume");
      const data = await res.json();
      const latestResume = data[data.length - 1];
      setResume(latestResume);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmailInfo = async (text) => {
    try {
      const res = await axios.post("/contact-info", { text });
      setEmailInfo(res.data || null);
    } catch (error) {
      console.error("Error fetching email info:", error);
    }
  };

  const fetchCheckSection = async (text) => {
    try {
      const res = await axios.post("/check-sections", { text });
      setSectionData(res.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchCheckGrammar = async (words) => {
    try {
      const res = await axios.post("/grammar/check", { words });
      setGrammarInfo(res.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const checkRepetition = async (payloadText) => {
    try {
      const res = await axios.post("/repetition/check", { text: payloadText });
      console.log(res.dat)
      setRepetitionInfo(res.data || {});
    } catch (err) {
      console.error("Error checking repetition:", err);
    } finally {
      setLoading(false);
    }
  };

  function calculateAtsScore() {
    const sectionScore = sectionData?.score ?? 100;
    const emailScore = emailInfo?.score ?? 100;
    const resumeScore = resume?.score_sum ?? 100;

    // weights (must add up to 1.0)
    const weights = { section: 0.1, email: 0.1, resume: 0.8 };

    const score =
      sectionScore * weights.section +
      emailScore * weights.email +
      resumeScore * weights.resume;

    setAtsScore(Number(score.toFixed(0)));
  }

if (loading) return <Loader message="Fetching your resume..." />;
  if (!resume) return <p>No data found</p>;

  return (
    <div className="result-dashboard">
      <Sidebar resume={resume} atsScore={atsScore} />
      <main className="content">
  <div className="content-card">
    <h3>📄 ATS Parse Rate</h3>
    <p>
      An <strong>Applicant Tracking System (ATS)</strong> is used by
      employers and recruiters to quickly scan job applications.
    </p>

    <div className="progress">
      <div
        className="progress-bar"
        style={{ width: `${atsScore ?? 0}%` }} // dynamically set width
      ></div>
    </div>

    <p className="highlight">
      ✅ We parsed {atsScore ?? 0}% of your resume successfully using an industry ATS.
    </p>
  </div>

        {resume && (
          <ResumePreview
            file={`data:${resume.mimetype};base64,${resume.pdfData}`}
          />
        )}

        {resume?.extractedText && <SectionCheck resumeText={resume.extractedText} />}
        {resume?.extractedText && <ContactInfo resumeText={resume.extractedText} />}
        {resume && <ScoreSection resume={resume} />}
        
        {/* ✅ Repetition checker now safely rendered */}
        {repetitionInfo && (
          <RepetitionChecker
            repeatedWords={repetitionInfo.repeatedWords || {}}
            synonyms={repetitionInfo.synonyms || {}}
          />
        )}

        {resume?.extractedText && <EmailInfo resumeText={resume.extractedText} />}
        {/* {resume?.extractedText && <GrammarInfo data={resume.extractedText} />} */}
      </main>
    </div>
  );
}

export default ShowResult;
