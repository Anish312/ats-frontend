import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ContactInfo.css";
import image from "../../assets/images/chapter.png";
function ContactInfo({ resumeText }) {
  const [contactInfo, setContactInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const res = await axios.post("/contact-info", {
          text: resumeText,
        });
        console.log(res)
        setContactInfo(res.data);
      } catch (error) {
        console.error("Error fetching contact info:", error);
      } finally {
        setLoading(false);
      }
    };

    if (resumeText) fetchContactInfo();
  }, [resumeText]);

  if (loading) return <p>Checking contact information...</p>;
  if (!contactInfo) return <p>No contact information found.</p>;

  const { available, found } = contactInfo;

  return (
    <div className="contact-info-container">
      <div className="contact-info-header">📎 CONTACT INFORMATION</div>
      <div className="contact-info-card">
        <dix className="contact-info-image-container">
          <img src={image} alt="Contact Info" className="contact-info-image" />
        </dix>
        <div className="contact-info-intro">
          We’ve found the following contact information in your resume:
        </div>

        <div className="contact-item">
          <span className="status">
            {available.includes("Phone Number") ? "✔" : "❌"}
          </span>
          <strong>Phone number:</strong>
          <span className="value">
            {found.phone || "Not found"}
          </span>
        </div>

        <div className="contact-item">
          <span className="status">
            {available.includes("Email") ? "✔" : "❌"}
          </span>
          <strong>Email address:</strong>
          <span className="value">
            {found.email || "Not found"}
          </span>
        </div>

        <div className="contact-item">
          <span className="status">
            {available.includes("LinkedIn") ? "✔" : "❌"}
          </span>
          <strong>LinkedIn:</strong>
          <span className="value">
            {found.linkedin || "Not found"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ContactInfo;
