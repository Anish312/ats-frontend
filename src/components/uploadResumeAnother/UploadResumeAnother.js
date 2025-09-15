import { Link } from "react-router-dom";
import "./UploadResumeAnother.css";
import { UploadCloud } from "lucide-react";

function UploadResumeAnother({ scrollToUpload }) {
  return (
    <section className="upload-section">
      <div className="upload-header">
        <h1>Get your resume score now!</h1>
        <p>
          Upload your resume and you’ll get a personalized email with an actionable tasklist.
        </p>
      </div>

      <div className="upload-box">
        <UploadCloud className="upload-icon" />
        <button className="upload-btn" onClick={scrollToUpload}>
          Upload Your Resume
        </button>
        <p className="upload-text">
          Drop your resume here or choose a file. <br />
          PDF & DOCX only. Max 2MB file size.
        </p>
        <span className="privacy">🔒 Privacy guaranteed</span>
      </div>
    </section>
  );
}

export default UploadResumeAnother;
