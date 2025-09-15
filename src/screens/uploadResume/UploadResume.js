import { useContext, useEffect, useState } from "react";
import "./UploadResume.css";
import { ResumeContext } from "../../context/ResumeContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";
import dashboard from "../../assets/images/Dashboard.png";

function UploadResume() {
  const [loading, setLoading] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedJD, setSelectedJD] = useState("");
  const [customJD, setCustomJD] = useState("");

  const { setResumeFile, setAnalysis } = useContext(ResumeContext);
  const navigate = useNavigate();

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (
      !file ||
      ![
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(file.type)
    ) {
      alert("Please upload a valid PDF or DOCX file");
      return;
    }
    setSelectedFile(file);
  };

  const handleOpenModal = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select a resume file first!");
      return;
    }
    setShowModal(true);
  };

  const handleUpload = async () => {
    if (!selectedJD && !customJD.trim()) {
      alert("Please select or enter a job description.");
      return;
    }

    setLoading(true);
    const jobDescription = customJD.trim() || selectedJD;

    setResumeFile(selectedFile);

    const formData = new FormData();
    formData.append("resume", selectedFile);
    formData.append("jobDescription", jobDescription);

    try {
      const res = await axios.post(`${BASE_URL}/resume`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setAnalysis(res.data);
      navigate("/result");
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed. Please try again.");
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  return (
    <div className="uploadResume-container">
      <div className="uploadResume-wrapper">
        <div className={`uploadResume-left ${animate ? "animated" : ""}`}>
          <div className="uploadResume-left-container">
          <p className="uploadResume-tag">RESUME CHECKER</p>
          <h1 className="uploadResume-heading">
            Is your resume <br /> good enough?
          </h1>
          <p className="uploadResume-subtext">
            A free and fast AI resume checker doing 16 crucial checks to ensure
            your resume is ready to perform and get you interview callbacks.
          </p>

          <form className="uploadResume-box" onSubmit={handleOpenModal}>
            <p className="uploadResume-text">
              Drop your resume here or choose a file.
              <br />
              <span>PDF & DOCX only. Max 2MB file size.</span>
            </p>
            <input
              type="file"
              name="resume"
              accept=".pdf,.docx"
              onChange={handleFileChange}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Extracting..." : "Upload Your Resume"}
            </button>
            <p className="uploadResume-privacy">🔒 Privacy guaranteed</p>
          </form>
        </div>
        </div>
        <div className={`uploadResume-right ${animate ? "animated" : ""}`}>
          <div className="image-border">

          <img src={dashboard} alt="Resume Preview" />
          </div>
        </div>
      </div>

      {/* MODAL */}
    {showModal && (
  <div className="modal-overlay">
    <div className="modal">
      <h2>Select Job Description</h2>

      <div className="jd-options">
        {[
         {
            title: "Frontend Developer",
            jd: "We are seeking a highly skilled Frontend Developer with expertise in React.js, HTML5, CSS3, and modern JavaScript (ES6+). The ideal candidate should have experience building responsive, cross-browser compatible, and high-performance web applications. Strong knowledge of UI/UX principles, state management (Redux/Context API), RESTful APIs integration, and version control (Git) is required. Familiarity with modern build tools (Webpack, Vite), testing frameworks (Jest, React Testing Library), and agile development practices will be a strong advantage."
          },
          {
            title: "Spring Boot Developer",
            jd: "We are hiring a Spring Boot Developer with solid expertise in Java, Spring Framework, RESTful APIs, and microservices architecture. The candidate should have experience in building scalable and secure backend systems, integrating databases (MySQL/PostgreSQL), and implementing authentication/authorization mechanisms. Proficiency in cloud platforms (AWS, Azure, or GCP), CI/CD pipelines, Docker/Kubernetes, and performance optimization is preferred. Strong problem-solving skills, understanding of design patterns, and ability to work in agile teams are essential."
          },
          {
            title: "Python Developer",
            jd: "Looking for an experienced Python Developer with proficiency in Django and Flask frameworks for backend development. The candidate should have expertise in REST API design, data processing, ORM (SQLAlchemy/Django ORM), and relational databases (PostgreSQL/MySQL). Hands-on experience with asynchronous programming, Celery, Redis, and message brokers is a plus. Familiarity with cloud platforms (AWS/GCP), Docker, unit testing (PyTest/Unittest), and scalable application design will be highly valued. Strong debugging, problem-solving, and collaboration skills are expected."
          },
          {
            title: "Full Stack Developer",
            jd: "We are hiring a Full Stack Developer proficient in React.js, Node.js, Express, and MySQL/MongoDB to design, develop, and deploy robust end-to-end solutions. The ideal candidate should have strong experience in building RESTful APIs, implementing authentication/authorization (JWT/OAuth), and designing scalable microservices. Knowledge of cloud platforms (AWS, Azure, GCP), CI/CD pipelines, containerization (Docker/Kubernetes), and unit/integration testing is highly desirable. A solid understanding of software engineering best practices, performance optimization, and agile methodologies is required."
          },
          {
            title: "React + Node.js Developer",
            jd: "We are looking for a talented React + Node.js Developer to develop scalable, high-performance web applications. The candidate must have strong hands-on experience with React.js, Hooks, Redux/Context API, and Node.js with Express.js. Proficiency in working with MongoDB/MySQL, designing RESTful APIs, and implementing secure authentication/authorization is required. Familiarity with modern frontend build tools (Webpack, Vite), backend optimization techniques, cloud services (AWS, GCP, Azure), and containerization (Docker/Kubernetes) is a strong advantage. Strong debugging, collaboration, and problem-solving skills are essential."
          }
        ].map((option) => (
          <label key={option.title} className="jd-option">
            <input
              type="radio"
              name="jobDescription"
              value={option.jd}
              checked={selectedJD === option.jd}
              onChange={(e) => {
                setSelectedJD(e.target.value);
                setCustomJD(""); // clear textarea if predefined is chosen
              }}
            />
            <strong>{option.title}</strong>
            {/* <p className="jd-preview">{option.jd}</p> */}
          </label>
        ))}
      </div>

      <p style={{ marginTop: "1rem", fontWeight: "500" }}>Or enter your own JD:</p>
      <textarea
        placeholder="Paste your custom job description here..."
        value={customJD}
        onChange={(e) => {
          setCustomJD(e.target.value);
          setSelectedJD(""); // clear predefined if custom entered
        }}
        rows="5"
      />

      <div className="modal-actions">
        <button onClick={() => setShowModal(false)}>Cancel</button>
        <button onClick={handleUpload} disabled={loading}>
          {loading ? "Uploading..." : "Confirm & Upload"}
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default UploadResume;
