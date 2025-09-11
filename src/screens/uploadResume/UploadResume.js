import { useContext, useEffect, useState } from "react";
import "./UploadResume.css";
import { ResumeContext } from "../../context/ResumeContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";

function UploadResume() {
  const [loading, setLoading] = useState(false);
  const [animate, setAnimate] = useState(false);
  const { setResumeFile, setAnalysis } = useContext(ResumeContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger animation after component mounts
    setAnimate(true);
  }, []);

const handleUpload = async (e) => {
  e.preventDefault();
  setLoading(true);

  const selectedFile = e.target.resume.files[0];
  if (
    !selectedFile ||
    ![
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ].includes(selectedFile.type)
  ) {
    alert("Please upload a valid PDF or DOCX file");
    setLoading(false);
    return;
  }

  setResumeFile(selectedFile);

  const jobDescription =
    "We are seeking a highly skilled and motivated Full Stack Developer with strong expertise in React.js, Node.js, MySQL, Vue.js, and Nest.js to join our engineering team...";

  const formData = new FormData();
  formData.append("resume", selectedFile);
  formData.append("jobDescription", jobDescription);

  try {
    // Replace with your backend URL
    const res = await axios.post(`${BASE_URL}/resume`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // Axios response is in res.data
    setAnalysis(res.data);
    navigate("/result");
  } catch (err) {
    console.error("Upload failed", err);
    alert("Upload failed. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="uploadResume-container">
      <div className="uploadResume-wrapper">
        <div className={`uploadResume-left ${animate ? "animated" : ""}`}>
          <p className="uploadResume-tag">RESUME CHECKER</p>
          <h1 className="uploadResume-heading">
            Is your resume <br /> good enough?
          </h1>
          <p className="uploadResume-subtext">
            A free and fast AI resume checker doing 16 crucial checks to ensure
            your resume is ready to perform and get you interview callbacks.
          </p>

          <form className="uploadResume-box" onSubmit={handleUpload}>
            <p className="uploadResume-text">
              Drop your resume here or choose a file.
              <br />
              <span>PDF & DOCX only. Max 2MB file size.</span>
            </p>
            <input type="file" name="resume" accept=".pdf,.docx" required />
            <button type="submit" disabled={loading}>
              {loading ? "Extracting..." : "Upload Your Resume"}
            </button>
            <p className="uploadResume-privacy">🔒 Privacy guaranteed</p>
          </form>
        </div>

        <div className={`uploadResume-right ${animate ? "animated" : ""}`}>
          <img src="/resume-preview.png" alt="Resume Preview" />
        </div>
      </div>
    </div>
  );
}

export default UploadResume;
