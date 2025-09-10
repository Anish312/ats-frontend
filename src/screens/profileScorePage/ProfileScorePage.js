import React, { useState } from "react";
import axios from "axios";

const ProfileScorePage = () => {
  const [url, setUrl] = useState("");
  const [formData, setFormData] = useState({
    bio: "",
    skills: "",
    headline: "",
    experience: "",
    education: false,
    certifications: false,
    hasPhoto: false,
  });
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert formData to API format
    const payload = {
      bio: formData.bio,
      skills: formData.skills.split(",").map((s) => s.trim()),
      headline: formData.headline,
      experience: formData.experience
        .split("\n")
        .map((line) => ({ title: "Job", description: line })),
      education: formData.education,
      certifications: formData.certifications,
      hasPhoto: formData.hasPhoto,
    };

    try {
      const res = await axios.post("http://localhost:3000/profile/score", payload);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Error scoring profile");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", fontFamily: "Arial" }}>
      <h2>LinkedIn Profile Scorer</h2>

      {/* Step 1: Enter LinkedIn URL */}
      <div style={{ marginBottom: "20px" }}>
        <label>LinkedIn Profile URL:</label>
        <input
          type="url"
          placeholder="https://linkedin.com/in/username"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        />
      </div>

      {/* Step 2: Enter details */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Bio:</label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            style={{ width: "100%", padding: "8px" }}
            rows={3}
          />
        </div>

        <div>
          <label>Headline:</label>
          <input
            type="text"
            value={formData.headline}
            onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div>
          <label>Skills (comma separated):</label>
          <input
            type="text"
            value={formData.skills}
            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div>
          <label>Experience (one per line):</label>
          <textarea
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            style={{ width: "100%", padding: "8px" }}
            rows={4}
          />
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              checked={formData.education}
              onChange={(e) => setFormData({ ...formData, education: e.target.checked })}
            />
            Education Added
          </label>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              checked={formData.certifications}
              onChange={(e) => setFormData({ ...formData, certifications: e.target.checked })}
            />
            Certifications Added
          </label>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              checked={formData.hasPhoto}
              onChange={(e) => setFormData({ ...formData, hasPhoto: e.target.checked })}
            />
            Profile Photo Added
          </label>
        </div>

        <button
          type="submit"
          style={{ marginTop: "10px", padding: "10px 15px", cursor: "pointer" }}
        >
          Get Score
        </button>
      </form>

      {/* Step 3: Show result */}
      {result && (
        <div style={{ marginTop: "20px", padding: "15px", border: "1px solid #ccc" }}>
          <h3>Score: {result.score}/100</h3>
          <ul>
            {result.feedback.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileScorePage;
