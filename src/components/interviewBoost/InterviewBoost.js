import { Sparkles } from "lucide-react"; // you can swap for any icon
import "./InterviewBoost.css";

function InterviewBoost() {
  return (
    <section className="interviewBoost">
      <div className="interviewBoost-wrapper">
        {/* Left Column */}
        <div className="interviewBoost-left">
          <h2>
            Jobscan’s job search tools can <br />
            increase your interview chances by{" "}
            <span className="highlight">50%</span>
          </h2>
        </div>

        {/* Icon in center */}
        <div className="interviewBoost-icon">
          <Sparkles size={32} color="#0056d2" />
        </div>

        {/* Right Column */}
        <div className="interviewBoost-right">
          <p>
            Many job seekers don’t get enough interviews even after applying for
            dozens of jobs. Why?
          </p>
          <p>
            Companies use{" "}
            <strong>Applicant Tracking Systems (ATS)</strong> to search and
            filter resumes by keywords.
          </p>
          <p>
            The Jobscan resume scanner helps you optimize your resume keywords
            for each job listing so that your application gets found by
            recruiters.
          </p>
        </div>
      </div>
    </section>
  );
}

export default InterviewBoost;
