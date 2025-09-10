import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EmailInfo.css";

function EmailInfo({ resumeText }) {
  const [emailInfo, setEmailInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmailInfo = async () => {
      try {
        const res = await axios.post("/contact-info", {
          text: resumeText,
        });
        setEmailInfo(res.data.found?.email || null);
      } catch (error) {
        console.error("Error fetching email info:", error);
      } finally {
        setLoading(false);
      }
    };

    if (resumeText) fetchEmailInfo();
  }, [resumeText]);

  if (loading) return <p>Checking email...</p>;

  return (
    <div className="email-info-container">
      <h3 className="email-header">📧 EMAIL ADDRESS</h3>
      <p className="email-description">
        Emails are important in today’s world. It’s one of the go-to ways for
        recruiters to get in touch with you, especially if you’re applying for a
        job that’s remote and in another country.
      </p>

      <div className="email-card">
        {emailInfo ? (
          <>
            <div className="email-status-icon">✅</div>
            <h4 className="email-status">Good job!</h4>
            <p className="email-substatus">
              Your email address seems professional.
            </p>
            <div className="email-value">{emailInfo}</div>
          </>
        ) : (
          <>
            <div className="email-status-icon">❌</div>
            <h4 className="email-status">Missing!</h4>
            <p className="email-substatus">
              We couldn’t find a valid email in your resume.
            </p>
          </>
        )}

        <div className="email-cta">
          <button className="enhancv-btn">Create an Resume</button>
        </div>
      </div>

      <div className="email-faq">
        <h4>FAQs</h4>
        <p className="faq-question">❓ What is a professional email address?</p>
        <p className="faq-answer">
          Professional email addresses consist of your first or last name or
          both. Use email addresses like: <b>john.doe@example.com</b> or{" "}
          <b>peter@example.com</b>. And not like{" "}
          <b>biker253@example.com</b> or <b>superman@example.com</b>.
        </p>
      </div>
    </div>
  );
}

export default EmailInfo;
