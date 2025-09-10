import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      {/* <div className="footer-top">
        <div className="footer-col">
          <h4>Get started</h4>
          <a href="#">Create Resume</a>
          <a href="#">Pricing</a>
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Cookie Preferences</a>
        </div>

        <div className="footer-col">
          <h4>Resume</h4>
          <a href="#">Resume Examples</a>
          <a href="#">Resume Templates</a>
          <a href="#">Resume Builder</a>
          <a href="#">Resume Summary Generator</a>
          <a href="#">LinkedIn Resume Builder</a>
          <a href="#">Resume Formats</a>
          <a href="#">Resume Checker</a>
          <a href="#">AI Resume Review</a>
          <a href="#">Resume Skills</a>
          <a href="#">How to Write a Resume</a>
          <a href="#">Modern Resume Templates</a>
          <a href="#">Simple Resume Templates</a>
        </div>

        <div className="footer-col">
          <h4>Cover Letter</h4>
          <a href="#">Cover Letter Builder</a>
          <a href="#">Cover Letter Examples</a>
          <a href="#">Cover Letter Generator</a>
          <a href="#">Cover Letter Templates</a>
          <a href="#">Cover Letter Formats</a>
          <a href="#">How to Write a Cover Letter</a>
        </div>

        <div className="footer-col">
          <h4>Resources</h4>
          <a href="#">Blog</a>
          <a href="#">Resume Guides</a>
          <a href="#">Cover Letter Guides</a>
          <a href="#">Job Interview Guides</a>
          <a href="#">Job Interview Questions</a>
          <a href="#">Career Resources</a>
        </div>
      </div> */}

      <div className="footer-mid">
        <div className="footer-col">
          <h4>About us</h4>
          <a href="#">Company</a>
          <a href="#">Careers</a>
          <a href="#">Reviews</a>
        </div>

        <div className="footer-col">
          <h4>Contact us</h4>
          <a href="mailto:support@enhancv.com">anishgehlot25@gmail.com</a>
          <a href="#">Help</a>
        </div>

        <div className="footer-col">
          <h4>Languages</h4>
          <a href="#">English (UK)</a>
          <a href="#">French (FR)</a>
          <a href="#">German (DE)</a>
          <a href="#">Spanish (ES)</a>
          <a href="#">Swedish (SE)</a>
          <a href="#">Portuguese (BR)</a>
          <a href="#">Italian (IT)</a>
        </div>

        <div className="footer-col reviews">
          <h4>Reviews</h4>
          <div className="stars">⭐⭐⭐⭐⭐</div>
          <p>4,840 Reviews</p>
          <a href="#">Read More Reviews at Reviews.io →</a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="socials">
          <a href="#">🌐</a>
          <a href="#">✖</a>
          <a href="#">🏆</a>
        </div>
        <p>
          Made with love by people who care. <span className="logo">∞</span>{" "}
          © 2025. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
